# Gpt-Nano

## Getting Started

### Download Models

Download both models from the following google drive:
https://drive.google.com/drive/folders/1EgImVRmw1NTImNfnl2vmXEDskEZ8V3F4?usp=drive_link

Then add models to the `models/` directory.

### Download Dependecies

```
pip install -r requirements.txt
```

### Serve to API

Import `compare_gpt_models()` to Flask App.

## Usage

```python
compare_gpt_models("Once upon a time", max_length=100)
```

- The first `query` parameter is the query string you wish to provide to all three models.
- The `max_length` parameter is the max number of tokens the models should generate
