#!/usr/bin/python3
"""module to handle payment"""

from api.v1.views import app_views
from models import storage
from models.payment import Payment
from flask import jsonify, request, abort


@app_views.route('/payments', strict_slashes=False, methods=['GET'])
def payments():
    """route to get all payments"""
    if request.method == 'GET':
        return jsonify(storage.all(Payment).values())

@app_views.route('/payments/<payment_id>', strict_slashes=False, methods=['GET'])
def payment(payment_id):
    """route to get specific payment"""
    payment = storage.get(Payment, payment_id)
    if payment is None:
        abort(404)
    if request.method == 'GET':
        return jsonify(payment.to_dict())

@app_views.route('/payments', strict_slashes=False, methods=['POST'])
def payments_post():
    """route to create new payment"""
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Not a JSON"}), 400
        #if 'name' not in request.get_json():
            #return jsonify({"error": "Missing name"}), 400

        new_payment = Payment(**request.get_json())
        new_payment.save()
        return jsonify(new_payment.to_dict()), 201

@app_views.route('/payments/<payment_id>', strict_slashes=False, methods=['DELETE', 'PUT'])
def payment_id(payment_id):
    """route to delete or update payment"""
    payment = storage.get(Payment, payment_id)
    if payment is None:
        abort(404)
    if request.method == 'DELETE':
        storage.delete(payment)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        if not request.is_json:
            return jsonify({"error": "Not a JSON"}), 400
        for key, value in request.get_json().items():
            if key not in ['id', 'created_at', 'updated_at']:
                setattr(payment, key, value)
        storage.save()
        return jsonify(payment.to_dict()), 200
