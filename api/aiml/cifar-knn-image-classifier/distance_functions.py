import math
import numpy as np

def l1_distance(img1, img2):
    return np.sum(np.abs(img1 - img2))

def l2_distance(img1, img2):
    return np.sum(np.sqrt(np.square(img1 - img2)))
