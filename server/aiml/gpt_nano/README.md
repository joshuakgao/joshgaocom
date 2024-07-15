# Gpt-Nano

## Getting Started

### Download Models Through Command Line

```shell
# download models
gdown --folder --id 16fKjgJsCBLIhdJXVvq25eTFlNZqmEi9-
```

### Serve to API

Import `compare_gpt_models()` to Flask App.

## Usage

```python
compare_gpt_models(query, max_length=100)
```

- The first `query` parameter is the query string you wish to provide to all three models.
- The `max_length` parameter is the max number of tokens the models should generate
