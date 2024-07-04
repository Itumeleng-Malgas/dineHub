#!/usr/bin/python3
""" Main flask app to handle DineHub API"""

from os import getenv
from flask import Flask, request, jsonify
from models import storage
from flask_cors import CORS
from api.v1.views import app_views
import cloudinary
import cloudinary.uploader
import cloudinary.api
import config

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(app_views)

# upload images
@app.route('/upload', methods=['POST'])
def upload():
    """
    Uploads a file to Cloudinary.
    Returns:
        A JSON response with the upload result or an error status code.
    """
    print("Request method:", request.method)
    print("Request content type:", request.content_type)
    print("Request files:", request.files)
    
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file_to_upload = request.files['file']
    
    if file_to_upload.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file_to_upload:
        upload_result = cloudinary.uploader.upload(file_to_upload)
        return jsonify(upload_result), 200
    
    return jsonify({"error": "No file uploaded"}), 400

@app.teardown_appcontext
def close_session(Exception):
    """
    method to close down the session by
    disconnecting from storage engine
    """
    storage.close()

@app.errorhandler(404)
def not_found(Exception):
    """Returns Not found error for a request"""
    return jsonify({"Error": "Not Found"}), Exception.code

if __name__ == "__main__":
    dine_hub_host = getenv('DINEHUB_API_HOST')
    dine_hub_port = getenv('DINEHUB_API_PORT')

    if not dine_hub_host:
        dine_hub_host = "0.0.0.0"
    if not dine_hub_port:
        dine_hub_port = 6000
    app.run(host=dine_hub_host, port=dine_hub_port, debug=True, threaded=True)
