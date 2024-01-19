from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from PIL import Image
import io
import base64


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/aiml/test', methods=['GET', 'POST'])
def test():
    # Handle the uploaded image
    uploaded_file = request.files['image']

    # Open the image using Pillow
    original_image = Image.open(uploaded_file)

    # Resize the image to 32x32
    resized_image = original_image.resize((32, 32))

    # Save or return the resized image
    # In this example, we will return the resized image as base64
    buffered = io.BytesIO()
    resized_image.save(buffered, format="JPEG")
    resized_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

    return jsonify({"resized_image": resized_base64, "test": 'hiiii'})


@app.route('/aiml/cifar-knn-image-classification', methods=['POST'])
def cifar_knn_image_classification():
    input_image = request.files['images']
    return send_file(input_image, mimetype="image/jpeg")


if __name__ == '__main__':
    app.run(debug=True)
