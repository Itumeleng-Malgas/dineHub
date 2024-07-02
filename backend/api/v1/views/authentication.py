#!/usr/bin/python3
"""view to handle authentication of users"""

from models import storage
from models.registered_client import Registered_client
from models.restaurant import Restaurant
from api.v1.views import app_views
from flask import jsonify, request, abort


@app_views.route('/auth/login', strict_slashes=False, methods=['POST'])
def login():
    """authenticates and email and password"""
    credentials = request.get_json()
    if credentials is None or not isinstance(credentials, dict):
        abort(404, "wrong format of parameters(expected dictionary)")
    all_restaurants = [restaurant.to_dict() for restaurant in storage.all(Restaurant).values()]
    all_registered_clients = [client.to_dict() for client in storage.all(Registered_client).values()]
    all_users = all_restaurants + all_registered_clients
    
    email = credentials.get('email')
    password = credentials.get('password')
    if email is None or password is None:
        abort(404, "expecting email and password")
    for user in all_users:
        if (user.get('email',None) == email) and (user.get('password',None)== password):
            return jsonify(user)
    return jsonify({"code": 0, "message":"verification failed"}), 404

@app_views.route('/auth/verify', strict_slashes=False, methods=['POST'])
def verify_email():
    """route to verify email during password reset"""
    email = request.get_json()
    if email is None or not isinstance(email, dict):
        abort(404, "wrong format of parameters(expected dictionary)")
    all_restaurants = [restaurant.to_dict() for restaurant in storage.all(Restaurant).values()]
    all_registered_clients = [client.to_dict() for client in storage.all(Registered_client).values()]
    all_users = all_restaurants + all_registered_clients
    
    suplied_email = email.get('email')
    for user in all_users:
        if user.get('email') == suplied_email:
            return jsonify({"code": 1, "message":"success", "userType":user.get('__class__', None)})
    return jsonify({"code": 0, "message":"verification failed"}), 404