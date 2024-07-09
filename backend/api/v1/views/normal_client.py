#!/usr/bin/python3
"""module to manage normal_client"""

from models.normal_client import Normal_client
from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage

@app_views.route('/normal_clients', strict_slashes=False, methods=['GET'])
def normal_clients():
    """route to get all normal_clients"""
    if request.method == 'GET':
        return jsonify(storage.all(Normal_client).values())
    

@app_views.route('/normal_clients/<normal_client_id>', strict_slashes=False, methods=['GET'])
def normal_client(normal_client_id):
    """route to get specific normal_client"""
    normal_client = storage.get(Normal_client, normal_client_id)
    if normal_client is None:
        abort(404)
    if request.method == 'GET':
        return jsonify(normal_client.to_dict())
