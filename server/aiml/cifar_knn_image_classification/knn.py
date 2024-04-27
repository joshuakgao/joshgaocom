from .distance_functions import l1_distance, l2_distance
from .cifar_parser import get_cifar_data, get_cifar_classes
import numpy as np


def knn(input_image, k=1, distance_function="l1"):
    # get distance function from string key
    if distance_function == "l1":
        distance_function = l1_distance
    elif distance_function == "l2":
        distance_function = l2_distance

    # convert pillow image to 32x32 numpy array image
    input_image = np.array(input_image)

    # parse cifar dataset
    train_x, train_y = get_cifar_data()
    classes = get_cifar_classes()

    # calculate input image distance from all other images
    distances = []
    for x, y in zip(train_x, train_y):
        distances.append((distance_function(input_image, x), x, classes[y]))

    # find k number of most similar images
    sorted_distances = sorted(distances, key=lambda x: x[0])
    knn_images = sorted_distances[:k]

    # count knn class frequencies
    class_counts = {}
    for _, _, label in knn_images:
        if label in class_counts:
            class_counts[label] += 1
        else:
            class_counts[label] = 1
    
    # assign prediction as most frequent class among knn's
    pred = max(class_counts, key=class_counts.get)
    return input_image, pred, knn_images