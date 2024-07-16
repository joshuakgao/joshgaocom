# Quick Start

## Download Dependencies

```shell
conda create -n jg python=3.9 -y
conda activate jg
# GET PYTORCH DOWNLOAD COMMAND WITH THIS LINK: https://pytorch.org/get-started/locally/
<RUN PYTORCH DOWNLOAD COMMAND>
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
