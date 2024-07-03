#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api
from config import Config
from resources.restaurant import RestaurantResource
from resources.menu import MenuResource
import cloudinary
import cloudinary.uploader
import cloudinary.api


app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)

cors=CORS(app, resources={r"/*": {"origins": "*"}})

import config

@app.route('/upload', methods=['POST'])
def upload():
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
# Endpoint to get a specific restaurant by ID
api.add_resource(RestaurantResource, '/restaurants', '/restaurants/<string:restaurant_id>')
api.add_resource(MenuResource, '/menus', '/menus/<string:menu_id>')



if __name__ == '__main__':
    app.run(debug=True)
