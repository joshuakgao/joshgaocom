from cifar_parser import get_cifar_data, get_cifar_batch, get_cifar_classes
from distance_functions import l1_distance, l2_distance
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrow
import numpy as np
import argparse


def run_knn(img, k=1, distance_function=l1_distance):
    distances = []
    for x, y in zip(train_x, train_y):
        distances.append((distance_function(img, x), x, classes[y]))

    sorted_distances = sorted(distances, key=lambda x: x[0])
    knn = sorted_distances[:k]

    class_counts = {}
    for _, _, label in knn:
        if label in class_counts:
            class_counts[label] += 1
        else:
            class_counts[label] = 1
    
    pred = max(class_counts, key=class_counts.get)
    return pred, knn


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CIFAR-10 KNN Image Classifer")
    parser.add_argument("-k", type=int, default=5, help="The number of nearest neighbors to consider")
    parser.add_argument("--distance_function", "-df", type=str, default='l1', help="Choose a distance function to use: 'l1' or 'l2'")
    args = parser.parse_args()

    # parse args
    K = args.k
    if args.distance_function == "l1":
        distance_function = l1_distance
    elif args.distance_function == "l2":
        distance_function = l2_distance

    # parse cifar dataset
    train_x, train_y = get_cifar_data()
    test_x, test_y = get_cifar_batch('cifar-10-batches-py/test_batch')
    classes = get_cifar_classes()

    # display images and their predictions
    fig, axes = plt.subplots(1, K+2, figsize=(K * 2, 7))
    fig.set_facecolor('#f7f7f7')

    i = np.random.choice(range(len(test_x)))
    img = test_x[i:i+1][0]
    pred, knn = run_knn(img, K, distance_function=distance_function)

    for k in range(K+2):
        axes[k].set_facecolor("#f7f7f7")
        axes[k].axis('off')
        if k == 0:
            axes[k].set_title("Pred:\n" + pred)
            axes[k].imshow(img)
        elif k == 1:
            arrow = FancyArrow(0.5, 0.5, 0.2, 0, width=0.05, color='black')
            axes[1].add_patch(arrow)
        else:
            axes[k].set_title(knn[k-2][2])
            axes[k].imshow(knn[k-2][1])


    plt.tight_layout()
    plt.savefig(f'knnResult')
    plt.show()

    
