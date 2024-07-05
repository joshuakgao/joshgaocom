import torch
from torch.nn import functional as F
import os
from aiml.gpt_nano.model import GPTConfig, GPT
import tiktoken
from transformers import GPT2LMHeadModel


# Global Variables
DEVICE = 'cpu'


def load_gpt_nano_model(model_path):
    model = GPT(GPTConfig(vocab_size=50304))
    model.load_state_dict(torch.load(model_path, map_location=DEVICE)['model'])
    model.eval()
    model.to(DEVICE)
    return model


def load_gpt_2_model():
    model = GPT2LMHeadModel.from_pretrained("gpt2") # 124M
    model.eval()
    model.to(DEVICE)
    return model


def query_model(model, query, max_length=100, num_return_sequences = 1):
    # prep model input
    enc = tiktoken.get_encoding('gpt2')
    tokens = enc.encode(query)
    tokens = torch.tensor(tokens, dtype=torch.long) # (8,)
    tokens = tokens.unsqueeze(0).repeat(num_return_sequences, 1) # (5, 8)
    x = tokens.to(DEVICE)

    # generate!
    while x.size(1) < max_length: # max_length=30
        # forward the model to get the logits
        with torch.no_grad():
            logits = model(x)[0] # (B, T, vocab_size)
            # take the logits at the last position
            logits = logits[:, -1, :] # (B, vocab_size)
            # get the probabilities
            probs = F.softmax(logits, dim=-1)
            # do top-k sampling of 50 (huggingface pipeline default)
            # topk_probs here becomes (5, 50), topk_indices is (5, 50)
            topk_probs, topk_indices = torch.topk(probs, 50, dim=-1)
            # select a token from the top-k probabilities
            # note: multinomial does not demand the input to sum to 1
            ix = torch.multinomial(topk_probs, 1) # (B, 1)
            # gather the corresponding indices
            xcol = torch.gather(topk_indices, -1, ix) # (B, 1)
            # append to the sequence
            x = torch.cat((x, xcol), dim=1)

    # print the generated text
    tokens = x[0, :max_length].tolist()
    decoded = enc.decode(tokens)
    return decoded


def compare_gpt_models(query, max_length=100):
    base_dir = os.path.dirname(__file__)
    gpt_nano_path = os.path.join(base_dir, 'models', 'model_19072.pt')
    civil_finetune_path = os.path.join(base_dir, 'models', 'civil_finetune_v3_model_00200.pt')
    print(gpt_nano_path)
    print(civil_finetune_path)
    
    gpt_nano_model = load_gpt_nano_model(gpt_nano_path)
    gpt_2_model = load_gpt_2_model()
    civil_finetune_model = load_gpt_nano_model(civil_finetune_path)

    query = query.strip()
    gpt_nano_response = query_model(gpt_nano_model, query, max_length=max_length)
    gpt_2_response = query_model(gpt_2_model, query, max_length=max_length)
    civil_finetune_response = query_model(civil_finetune_model, query, max_length=max_length)

    return {
        "gpt_nano": gpt_nano_response,
        "gpt_2": gpt_2_response,
        "civil_finetune": civil_finetune_response
    }


# if __name__ == "__main__":
#     response = compare_gpt_models("Once upon a time", 10)
#     print(response)
