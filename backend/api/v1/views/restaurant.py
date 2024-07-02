#!/usr/bin/python3
"""view to handle restaurant"""

from api.v1.views import app_views
from models import storage
from models.restaurant import Restaurant
from flask import jsonify, request, abort


@app_views.route("/restaurants", strict_slashes=False, methods=['GET', 'POST'])
def all_restaurants():
    """route to get all the restaurants"""
    if request.method == "GET":
        restaurants = [restaurant.to_dict() for restaurant in storage.all(Restaurant).values()]
        return jsonify(restaurants), 200
    
    if request.method == "POST":
        data = request.get_json(silent=True)
        if data is None or not isinstance(data, dict):
            abort(404, "Not a valid JSON")
        if data:
            # get the list of all accepted attributes of the class
            allow_attributes = [attrib for attrib in Restaurant().__dir__() if not attrib.startswith('__')]
            new_restaurant_dict = {}
            for key, value in data.items():
                if key not in allow_attributes:
                    abort(404, f"unsopported attribute {key}")
                if key not in ['created_at','updated_at','id']:
                    new_restaurant_dict[key] = value
            new_restaurant = Restaurant(**new_restaurant_dict)
            storage.new(new_restaurant)
            storage.save()
            return jsonify({"Message": "Resource Created Successfully"}), 200