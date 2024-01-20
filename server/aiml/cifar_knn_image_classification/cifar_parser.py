import numpy as np
import os

def unpickle_cifar_batch(file):
    import pickle
    with open(os.getcwd() + "/aiml/cifar_knn_image_classification/" + file, 'rb') as fo:
        dict = pickle.load(fo, encoding='latin1')
    return dict


def get_cifar_batch(file):
    datadict = unpickle_cifar_batch(file)
    X = datadict['data']
    Y = datadict['labels']
    X = X.reshape(10000, 3, 32, 32).transpose(0,2,3,1).astype("uint8")
    Y = np.array(Y)
    return X, Y


def get_cifar_data():
    X, Y = get_cifar_batch('cifar-10-batches-py/data_batch_1')
    # data_batch_file_paths = ['cifar-10-batches-py/data_batch_2', 'cifar-10-batches-py/data_batch_3', 'cifar-10-batches-py/data_batch_4', 'cifar-10-batches-py/data_batch_5']
    # for path in data_batch_file_paths:
    #     x, y = get_cifar_batch(path)
    #     X = np.concatenate((X, x))
    #     Y = np.concatenate((Y, y))
    return X, Y


def get_cifar_classes():
    data = unpickle_cifar_batch('cifar-10-batches-py/batches.meta')
    return data['label_names']


if __name__ == "__main__":
    get_cifar_classes()