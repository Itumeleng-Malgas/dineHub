#!/usr/bin/python3
""" Main flask app to handle DineHub API"""

from os import getenv
from flask import Flask, jsonify
from models import storage
from flask_cors import CORS
from api.v1.views import app_views

app = Flask(__name__)
CORS(app, resources={"/*": {"origins": "0.0.0.0"}})
app.register_blueprint(app_views)

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
