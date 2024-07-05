# CIFAR KNN Image Classifier

## Getting Started

### Download CIFAR-10 Dataset

Go to: https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz
Unzip "cifar-10-batches-py" folder into your working directory

### Download Dependencies

```
pip install -r requirements.txt
```

### Serve to API

Import `knn()` to Flask App.

## Usage

```python
knn(input_image, k=1, distance_function"l1")
```

- `input_image` parameter is the Pillow image you provide for image classificaiton
- `k` parameter is the number of images to use from the cifar_10 dataset for knn
- `distance_function` parameter is used to distinguish from using `l1` or `l2` distance functions
