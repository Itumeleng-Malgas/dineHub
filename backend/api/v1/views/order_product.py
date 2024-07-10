#!/usr/bin/python3
"""route to handle order_product"""

from api.v1.views import app_views
from models import storage
from models.orders import Orders
from models.product import Product
from models.restaurant import Restaurant
from flask import jsonify, request, abort
from models.order_product import Order_product

@app_views.route("/order_product/<order_id>", strict_slashes=False, methods=["GET"])
def get_order_products(order_id):
    """get all order_product by id"""
    if request.method == "GET":
        order_product = storage.get(Order_product, order_id)
        if order_product is None:
            return jsonify({"Message": f"No Order found with that id {order_id}"}), 404
        return jsonify(order_product.to_dict()), 200

@app_views.route("/order_product", strict_slashes=False, methods=["POST"])
def create_order_product():
    """create a new order_product"""
    if request.method == "POST":
        data = request.get_json(silent=True)
       
        if data is None or not isinstance(data, dict):
            abort(404, "Not a valid JSON")
        if data:
            order_id = data.get("order_id")
           
            product_id = data.get("product_id")
            #quantity = data.get("quantity")
            if not order_id or not product_id:
                abort(400, "Missing required fields")
            order = storage.get(Orders, order_id)
        
            if not order:
                abort(404, f"No Order found with id {order_id}")
            product = storage.get(Product, product_id)
            order_product_data = {"order_id": order_id, "product_id": product_id}
            order_product = Order_product(**order_product_data)
            if not product:
                abort(404, f"No Product found with id {product_id}")
            
            storage.new(order_product)
            storage.save()
            return jsonify(order_product.to_dict()), 201

@app_views.route("/order_products", strict_slashes=False, methods=["GET"])
def get_ordered_products():
    """method to get all the order_products on the platform"""
    if request.method == "GET":
        """returns the list of all tables available on the platform"""
        all_ordered_products = [odered_product.to_dict() for odered_product in storage.all(Order_product).values()]
        return jsonify(all_ordered_products)


@app_views.route("/order_products/<order_product_id>", strict_slashes=False, methods=['GET','DELETE'])
def ordered_products_by_id(order_product_id):
    """route to get all the products by order id"""
    if request.method == "GET":
        
        order_product = storage.get(Order_product, order_product_id)
        
        products = []
        if order_product:
            for product in order_product.products:
                products.append(product.to_dict())
        return jsonify(products), 200
    if request.method == "DELETE":
        """endpoint to handle delete of ordered_product_item"""
        ordered_product_item = storage.get(Order_product, order_product_id)
        if ordered_product_item is None:
            return jsonify({"Message": f"No ordered_product_item found with that id {order_product_id}"}), 404
        storage.delete(ordered_product_item)
        storage.save()
        return jsonify({"Message": "ordered_product_item deleted successfully"}), 200
    
@app_views.route("/order_product", strict_slashes=False, methods=["PUT"])
def manage_ordered_product_with_id_param():
    """this method handles update operations on order_product with id supplied """
    if request.method == "PUT":
        """endpoint to handle update of order_product"""
        update_data = request.get_json(silent=True)
        if update_data is None:
            # The request data is not valid JSON
            return jsonify({"error": "Invalid JSON sent"}), 400
        if "id" not in update_data.keys():
            return jsonify({"Error":"No id object supplied"})
        id = update_data.get("id", None)
        order_product_obj = None
        order_product_obj = storage.get(cls=Order_product, id=id)
        if order_product_obj:
            allowed_attribs = [attrib for attrib in Order_product().__dir__()]
            attributes = update_data.keys()
            for attrib in attributes:
                cleaned_attrib = attrib.strip()
                if cleaned_attrib in allowed_attribs:
                    setattr(order_product_obj, cleaned_attrib, update_data[attrib])
            order_product_obj.save()
            return jsonify( order_product_obj.to_dict())