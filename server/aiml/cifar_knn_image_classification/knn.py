from .distance_functions import l1_distance, l2_distance
from .cifar_parser import get_cifar_data, get_cifar_classes
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrow
import numpy as np
from PIL import Image
import os
import time


def resize_uploaded_image(uploaded_img):
    print(uploaded_img)
    image = Image.open(uploaded_img)
    resized_image = image.resize((32, 32))
    numpy_image = np.array(resized_image)
    return numpy_image


def knn(input_image, k=1, distance_function="l1"):
    # get distance function from string key
    if distance_function == "l1":
        distance_function = l1_distance
    elif distance_function == "l2":
        distance_function = l2_distance

    # convert pillow image to 32x32 numpy array image
    input_image = resize_uploaded_image(input_image)

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


def get_result_visualization(input_image, pred, knn_images):
    K = len(knn_images)

    # display images and their predictions
    matplotlib.use('agg')   # to avoid gui error with flask
    fig, axes = plt.subplots(2, K+2, figsize=(K * 2 + 3, 4))
    fig.set_facecolor('#f7f7f7')

    for k in range(K+2):
        for l in range(2):
            axes[l][k].set_facecolor("#f7f7f7")
            axes[l][k].axis('off')

        # for input image
        if k == 0:
            axes[0][k].set_title("Prediction: " + pred.upper(), color='red')
            axes[0][k].imshow(input_image)
        
        # for arrow
        elif k == 1:
            arrow = FancyArrow(0.5, 0.5, 0.2, 0, width=0.05, color='black')
            axes[0][1].add_patch(arrow)

        # for knn images
        else:
            axes[0][k].set_title(knn_images[k-2][2])
            axes[0][k].imshow(knn_images[k-2][1])
    
    axes[1][int((k+3)/2)].set_title("Most Similar Images")

    plt.tight_layout()  # used to prevent image overlap

    # save image and open as pillow image
    result_image_path = os.getcwd() + '/aiml/cifar_knn_image_classification/knn_result.jpeg'
    plt.savefig(result_image_path)
    result = Image.open(result_image_path)
    return result