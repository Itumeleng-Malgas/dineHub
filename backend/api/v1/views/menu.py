#!/usr/bin/python3
"""route to handle menu"""

from api.v1.views import app_views
from models import storage
from models.menu import Menu
from models.restaurant import Restaurant
from flask import jsonify, request, abort



@app_views.route("/menus", strict_slashes=False, methods=['POST'])
def create_menus():
    """create a new menu"""
    if request.method == "POST":
            data = request.get_json(silent=True)
            if data is None or not isinstance(data, dict):
                abort(404, "Not a valid JSON")
            if data:
                # get the list of all accepted attributes of the class
                allow_attributes = [attrib for attrib in Menu().__dir__() if not attrib.startswith('__')]
                new_menu_dict = {}
                for key, value in data.items():
                    if key not in allow_attributes:
                        print({"Error": f"unsopported attribute {key} identified"})
                        # return jsonify({"Error": f"unsopported attribute {key}"})
                    if key not in ['created_at','updated_at','id']:
                            new_menu_dict[key] = value
                new_menu = Menu(**new_menu_dict)
                storage.new(new_menu)
                storage.save()
                return jsonify(new_menu.to_dict()), 201

@app_views.route("/menus/restaurant_id", strict_slashes=False, methods=['GET'])
def restaurant_menus(restaurant_id):
    """route to get all the menus"""
    if request.method == "GET":
        # menus = [menu.to_dict() for menu in storage.all(Menu).values()]
        restaurant = storage.get(Restaurant, restaurant_id)
        
        reviews = []
        if restaurant:
            for review in restaurant.menus:
                reviews.append(review.to_dict())
        return jsonify(reviews), 200
    
    


@app_views.route("/menu/<id>", strict_slashes=False, methods=["DELETE", "UPDATE"])
def manage_menu(id):
    """endpoint to handle delete of restaurant"""
    if request.method == "DELETE":
        menu_item = storage.get(Menu, id)
        if menu_item is None:
            return jsonify({"Message": f"No Restaurant found with that id {id}"}), 404
        storage.delete(menu_item)
        storage.save()
        return jsonify({"Message": "Restaurant deleted successfully"}), 200
