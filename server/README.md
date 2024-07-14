# Quick Start

## Download Dependencies

```shell
pip install -r requirements.txt
```

## Setup Projects

Go through each projects readme and follow the setup instructions.

> Usually this involves downloading large assets that can't be pushed to github.

## Expose API

```shell
# in first shell:
conda activate joshgaocom
python server/flask_app.py
# in second shell:
ngrok http --domain=api.joshgao.com 8181
```
