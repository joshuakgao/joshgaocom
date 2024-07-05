from aiml.cifar_knn_image_classification.knn import knn
from aiml.gpt_nano.inference import compare_gpt_models
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
from utils.image_utils import *
import traceback 


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return jsonify({'response': "Hello! You've reached the backend of joshgao.com"})


@app.route('/image', methods=['GET'])
def read_image_test():
    try:
        image = Image.open('./cat.jpeg')
        final_image = convert_image_to_base64(image)
        return jsonify({'image': final_image}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/aiml/cifar-knn-image-classification', methods=['POST'])
def cifar_knn_image_classification():
    try:
        # get url string params
        input_image = request.files['image']
        k = str(request.args.get('k'))
        distance_function = str(request.args.get('distance_function'))

        try:
            k = int(k)
        except:
            return jsonify({'error': "Invalid value for 'k'"}), 400
        
        distance_function_options = ['l1', 'l2']
        if distance_function not in distance_function_options:
            return jsonify({'error': "Invalid value for 'distance_function'. Options include: 'l1' or 'l2'"}), 400
                    

        # handle distance_function edge cases
        if distance_function == 'None':
            distance_function = 'l1'

        # convert image to pillow jpeg image
        input_image = convert_image_to_jpeg(input_image)

        # resize pillow image
        input_image = resize_image(input_image)

        # run knn
        input_image, pred, knn_images = knn(input_image, k, distance_function)

        # convert knn image to base 64
        response_knn_image_and_labels = []
        for knn_image_data in knn_images:
            distance, image, label = knn_image_data
            image_base64 = convert_numpy_arr_image_to_base64(image)
            response_knn_image_and_labels.append({'image': image_base64, 'label': label})

        return jsonify({'knn_image_and_labels': response_knn_image_and_labels, 'prediction': pred}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/aiml/gpt-nano', methods=['GET'])
def gpt_nano():
    try:
        print("Starting")
        # get url strin params
        query = str(request.args.get('query'))
        max_length = int(request.args.get('max_length'))
        print("comparing...")
        # query gpt-nano, gpt-2, and civil-finetune models
        model_responses = compare_gpt_models(query, max_length=max_length)  # dict of responses
        print("done")
        return jsonify(model_responses), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)
