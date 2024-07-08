#!/usr/bin/python3
"""view to manage products"""

from models import storage
from models.product import Product
from api.v1.views import app_views
from flask import jsonify, request, abort


@app_views.route('/products', strict_slashes=False, methods=['GET'])
def products():
    """route to get all products"""
    if request.method == 'GET':
        return jsonify(storage.all(Product).values())
    
@app_views.route('/products/<menu_id>', strict_slashes=False, methods=['POST'])
def products_menu(menu_id):
    """route to add product to menu"""


    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Not a JSON"}), 400
        if 'name' not in request.get_json():
            return jsonify({"error": "Missing name"}), 400

        new_product = Product(**request.get_json())
        new_product.save()
        return jsonify(new_product.to_dict()), 201

@app_views.route('/products/<product_id>', strict_slashes=False, methods=['GET', 'DELETE', 'PUT'])
def product(product_id):
    """route to get specific product"""
    product = storage.get(Product, product_id)
    if product is None:
        abort(404)
    if request.method == 'GET':
        return jsonify(product.to_dict())

    if request.method == 'DELETE':
        storage.delete(product)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        if not request.is_json:
            return jsonify({"error": "Not a JSON"}), 400
        for key, value in request.get_json().items():
            if key not in ['id', 'created_at', 'updated_at']:
                setattr(product, key, value)
        storage.save()
        return jsonify(product.to_dict()), 200