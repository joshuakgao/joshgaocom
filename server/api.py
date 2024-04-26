from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from PIL import Image
import io
import base64
from utils.image_utils import convert_image_to_base64
from aiml.cifar_knn_image_classification.knn import knn, get_result_visualization



app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return "Hello! You've reached the backend of joshgao.com"


@app.route('/aiml/cifar-knn-image-classification', methods=['POST'])
def cifar_knn_image_classification():
    authorized, error_response = validate_api_key()
    if not authorized:
        return error_response

    try:
        # get url string params
        input_image = request.files['image']
        k = str(request.args.get('k'))
        distance_function = str(request.args.get('distance_function'))

        try:
            k = int(k)
        except:
            return jsonify({"error": "Invalid value for 'k'"}), 400
        
        distance_function_options = ['l1', 'l2']
        if distance_function not in distance_function_options:
            return jsonify({"error": "Invalid value for 'distance_function'. Options include: 'l1' or 'l2'"}), 400
                    

        # handle distance_function edge cases
        if distance_function == "None":
            distance_function = "l1"

        # run knn
        input_image, pred, knn_images = knn(input_image, k, distance_function)

        # get knn visualization
        result_image = get_result_visualization(input_image, pred, knn_images)

        # convert visualization to base64
        result_image_base64 = convert_image_to_base64(result_image)

        return jsonify({"knn_result_image": result_image_base64})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def validate_api_key():
    api_key = request.headers.get('X-Api-Key')
    if not api_key:
        return False, jsonify({'error': 'Missing API key'}), 401
    return True, None

if __name__ == '__main__':
    app.run(host="0.0.0.0", ssl_context=('cert.pem', 'key.pem'))
    # app.run(host="0.0.0.0", debug=True, port='8080')
