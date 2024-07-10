#!/usr/bin/python3
"""route to handle orders"""

from api.v1.views import app_views
from models import storage
from models.orders import Orders
from models.product import Product
from models.restaurant import Restaurant
from flask import jsonify, request, abort


@app_views.route("/orders", strict_slashes=False, methods=["GET"])
def get_orders():
    """method to get all the orders on the platform"""
    if request.method == "GET":
        """returns the list of all tables available on the platform"""
        all_orders = [order.to_dict() for order in storage.all(Orders).values()]
        return jsonify(all_orders)

@app_views.route("/orders", strict_slashes=False, methods=['POST'])
def create_orders():
    """create a new order"""
    if request.method == "POST":
            data = request.get_json(silent=True)
            if data is None or not isinstance(data, dict):
                abort(404, "Not a valid JSON")
            if data:
                # get the list of all accepted attributes of the class
                allow_attributes = [attrib for attrib in Orders().__dir__() if not attrib.startswith('__')]
                new_order_dict = {}
                for key, value in data.items():
                    if key not in allow_attributes:
                        print({"Error": f"unsopported attribute {key} identified"})
                        # return jsonify({"Error": f"unsopported attribute {key}"})
                    if key not in ['created_at','updated_at','id']:
                            new_order_dict[key] = value
                new_order = Orders(**new_order_dict)
                storage.new(new_order)
                storage.save()
                return jsonify(new_order.to_dict()), 201

@app_views.route("/orders/<restaurant_id>", strict_slashes=False, methods=['GET'])
def restaurant_orders(restaurant_id):
    """route to get all the orders"""
    if request.method == "GET":
        # orders = [order.to_dict() for order in storage.all(Order).values()]
        restaurant = storage.get(Restaurant, restaurant_id)
        
        reviews = []
        if restaurant:
            for review in restaurant.orders:
                reviews.append(review.to_dict())
        return jsonify(reviews), 200
    

@app_views.route("/order/<id>", strict_slashes=False, methods=["GET", "DELETE", "PUT"])
def manage_order(id):
    if request.method == "GET":
        order = storage.get(Orders, id)
        return jsonify(order.to_dict()), 200
    if request.method == "DELETE":
        """endpoint to handle delete of restaurant"""
        order_item = storage.get(Orders, id)
        if order_item is None:
            return jsonify({"Message": f"No Order found with that id {id}"}), 404
        storage.delete(order_item)
        storage.save()
        return jsonify({"Message": "Order deleted successfully"}), 200
    elif request.method == "PUT":
        """endpoint to handle update of restaurant"""
        
        # try to get an object with that id
        order_obj = None
        order_obj = storage.get(cls=Orders, id=id)
        if order_obj:
            allowed_attribs = [attrib for attrib in Orders().__dir__()]
            update_data = request.get_json(silent=True)
            attributes = update_data.keys()
            for attrib in attributes:
                cleaned_attrib = attrib.strip()
                if cleaned_attrib in allowed_attribs:
                    setattr(order_obj, cleaned_attrib, update_data[attrib])
            order_obj.save()
            return jsonify(order_obj.to_dict())

        
@app_views.route("/order", strict_slashes=False, methods=["PUT"])
def manage_order_with_id_param():
    """this method handles delete and update operations on order with id supplied """
    if request.method == "PUT":
        """endpoint to handle update of restaurant"""
        update_data = request.get_json(silent=True)
        if update_data is None:
            # The request data is not valid JSON
            return jsonify({"error": "Invalid JSON sent"}), 400
        if "id" not in update_data.keys():
            return jsonify({"Error":"No id object supplied"})
        id = update_data.get("id", None)
        order_obj = None
        order_obj = storage.get(cls=Orders, id=id)
        if order_obj:
            allowed_attribs = [attrib for attrib in Orders().__dir__()]
            attributes = update_data.keys()
            for attrib in attributes:
                cleaned_attrib = attrib.strip()
                if cleaned_attrib in allowed_attribs:
                    setattr(order_obj, cleaned_attrib, update_data[attrib])
            order_obj.save()
            return jsonify(order_obj.to_dict())


