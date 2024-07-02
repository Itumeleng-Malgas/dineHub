#!/usr/bin/python3
"""view to handle restaurant"""

from api.v1.views import app_views
from models import storage
from models.registered_client import Registered_client
from flask import jsonify, request, abort


@app_views.route("/registered_clients", strict_slashes=False, methods=['GET', 'POST'])
def all_registered_clients():
    """route to get all the restaurants"""
    if request.method == "GET":
        print("hello")
        registered_clients = [client.to_dict() for client in storage.all(Registered_client).values()]
        return jsonify(registered_clients), 200
    
    if request.method == "POST":
        data = request.get_json(silent=True)
        if data is None or not isinstance(data, dict):
            abort(404, "Not a valid JSON")
        if data:
            # get the list of all accepted attributes of the class
            allow_attributes = [attrib for attrib in Registered_client().__dir__() if not attrib.startswith('__')]
            new_client_dict = {}
            for key, value in data.items():
                if key not in allow_attributes:
                    abort(404, f"unsopported attribute {key}")
                if key not in ['created_at','updated_at','id']:
                    new_client_dict[key] = value
            new_client = Registered_client(**new_client_dict)
            storage.new(new_client)
            storage.save()
            return jsonify({"Message": "Resource Created Successfully"}), 200