# CIFAR KNN Image Classifier

## Getting Started

### Download CIFAR-10 Dataset

Go to: https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz
Unzip "cifar-10-batches-py" folder into your working directory

### Download Dependencies

```
pip install -r requirements.txt
```

## Usage

```
# default k=5 and default distance function is l1 distance
python knn.py

# define k=5 and use l2 distance
python knn.py -k 5 -df l2
```
