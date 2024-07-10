#!/usr/bin/python3
"""route to handle menu"""

from api.v1.views import app_views
from models import storage
from models.menu import Menu
from models.restaurant import Restaurant
from flask import jsonify, request, abort

@app_views.route("/menus", strict_slashes=False, methods=["GET"])
def get_menus():
    """method to get all the menus on the platform"""
    if request.method == "GET":
        """returns the list of all tables available on the platform"""
        all_menus = [menu.to_dict() for menu in storage.all(Menu).values()]
        return jsonify(all_menus)

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

@app_views.route("/menus/<restaurant_id>", strict_slashes=False, methods=['GET'])
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
    

@app_views.route("/menu/<id>", strict_slashes=False, methods=["GET", "DELETE", "PUT"])
def manage_menu(id):
    if request.method == "GET":
        menu = storage.get(Menu, id)
        return jsonify(menu.to_dict()), 200
    if request.method == "DELETE":
        """endpoint to handle delete of restaurant"""
        menu_item = storage.get(Menu, id)
        if menu_item is None:
            return jsonify({"Message": f"No Restaurant found with that id {id}"}), 404
        storage.delete(menu_item)
        storage.save()
        return jsonify({"Message": "Restaurant deleted successfully"}), 200
    elif request.method == "PUT":
        """endpoint to handle update of restaurant"""
        
        # try to get an object with that id
        menu_obj = None
        menu_obj = storage.get(cls=Menu, id=id)
        if menu_obj:
            allowed_attribs = [attrib for attrib in Menu().__dir__()]
            update_data = request.get_json(silent=True)
            attributes = update_data.keys()
            for attrib in attributes:
                cleaned_attrib = attrib.strip()
                if cleaned_attrib in allowed_attribs:
                    setattr(menu_obj, cleaned_attrib, update_data[attrib])
            menu_obj.save()
            return jsonify(menu_obj.to_dict())

        
        
@app_views.route("/menu", strict_slashes=False, methods=["PUT"])
def manage_menu_with_id_param():
    """this method handles delete and update operations on menu with id supplied """
    if request.method == "PUT":
        """endpoint to handle update of restaurant"""
        update_data = request.get_json(silent=True)
        if update_data is None:
            # The request data is not valid JSON
            return jsonify({"error": "Invalid JSON sent"}), 400
        if "id" not in update_data.keys():
            return jsonify({"Error":"No id object supplied"})
        id = update_data.get("id", None)
        menu_obj = None
        menu_obj = storage.get(cls=Menu, id=id)
        if menu_obj:
            allowed_attribs = [attrib for attrib in Menu().__dir__()]
            attributes = update_data.keys()
            for attrib in attributes:
                cleaned_attrib = attrib.strip()
                if cleaned_attrib in allowed_attribs:
                    setattr(menu_obj, cleaned_attrib, update_data[attrib])
            menu_obj.save()
            return jsonify(menu_obj.to_dict())
        # if not none do something
  