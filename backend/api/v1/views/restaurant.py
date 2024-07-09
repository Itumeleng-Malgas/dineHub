#!/usr/bin/python3
"""view to handle restaurant"""

from api.v1.views import app_views
from models import storage
from models.restaurant import Restaurant
from models.gallery import Gallery
from models.image import Image
from flask import jsonify, request, abort
import bcrypt

@app_views.route("/add_restaurants", strict_slashes=False, methods=['POST'])
def register_restaurants():
    """route to register a new restaurants with gallery information"""
    pass
    
    

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
                clean_key = key.strip()
                if clean_key.strip() not in allow_attributes:
                    print({"Error": f"unsopported attribute {clean_key} identified"})
                    # return jsonify({"Error": f"unsopported attribute {key}"})
                if clean_key not in ['created_at','updated_at','id','gallery']:
                    if clean_key == 'password':
                    # Encode the password and hash it
                        encoded_password = value.encode('utf-8')
                        hashed_password = bcrypt.hashpw(encoded_password, bcrypt.gensalt())
                        new_restaurant_dict[clean_key] = hashed_password.decode('utf-8')
                    else:
                        new_restaurant_dict[clean_key] = value
            new_restaurant = Restaurant(**new_restaurant_dict)
            storage.new(new_restaurant)
            storage.save()
            imageUrls = data.get("gallery", None)
            if imageUrls:
                restaurant_id = new_restaurant.id
                # create a new gallery
                gallery_data = {"description": "No description", "restaurant_id":restaurant_id}
                new_gallery = Gallery(**gallery_data)
                storage.new(new_gallery)
                storage.save()
                gallery_id = new_gallery.id
                # add images to the gallery
                for image_url in imageUrls:
                    img_data = {"url": image_url, "gallery_id":gallery_id, "restaurant_id": restaurant_id, "description":"No description"}
                    new_image = Image(**img_data)
                    storage.new(new_image)
                    storage.save()
            profileUrl = data.get("restaurantImage", None)
            if profileUrl:
                img_data = {"url": profileUrl, "gallery_id":gallery_id, "restaurant_id": restaurant_id, "description":"profile image of restaurant"}
                new_image = Image(**img_data)
                storage.new(new_image)
                storage.save()
            return jsonify(new_restaurant.to_dict()), 200

@app_views.route("/restaurant/<id>", strict_slashes=False, methods=['GET'])
def get_restaurant(id):
    """route to get all the restaurants"""
    restaurants = [restaurant.to_dict() for restaurant in storage.all(Restaurant).values()]
    for restaurant in restaurants:
        if restaurant['id'] == id:
            return jsonify(restaurant), 200
    return jsonify({"Message": f"No Restaurant found with that id {id}"}), 404

@app_views.route("/restaurant", strict_slashes=False, methods=['POST'])
def get_restaurant_via_param():
    """route to get all the restaurants"""
    data = request.get_json()
    if data is None or not isinstance(data, dict):
            abort(404, "Not a valid JSON")
    id = data.get('id', None)
    if not id:
        abort(404, "id attribute not found in data")
    restaurants = [restaurant.to_dict() for restaurant in storage.all(Restaurant).values()]
    for restaurant in restaurants:
        if restaurant['id'] == id:
            return jsonify(restaurant), 200
    return jsonify({"Message": f"No Restaurant found with that id {id}"}), 404

@app_views.route("/restaurant/<id>", strict_slashes=False, methods=["DELETE", "PUT"])
def manage_restaurant(id):
    """endpoint to handle delete of restaurant"""
    if request.method == "DELETE":
        restaurant = storage.get(Restaurant, id)
        if restaurant is None:
            return jsonify({"Message": f"No Restaurant found with that id {id}"}), 404
        storage.delete(restaurant)
        storage.save()
        return jsonify({"Message": "Restaurant deleted successfully"}), 200
    elif request.method == "PUT":
        """handle update operation on restaurants"""
        pass
        
        


@app_views.route("/search", strict_slashes=False, methods=["POST"])
def search():
    """search for a restaurant by country, state or city"""
    restaurants = [restaurant.to_dict() for restaurant in storage.all(Restaurant).values()]
    search_term = request.get_json()
    search_result = []
    # print(list(search_term.values()))
    for keyword, term in search_term.items():
        if keyword in ["cuisine", "name","country", "state", "city"]:
            for restaurant in restaurants:
                if keyword in  restaurant.keys():
                    if restaurant.get(keyword) and term:
                        if restaurant[keyword].strip().lower() == term.strip().lower():
                            search_result.append(restaurant)
                            
    # eliminate duplicate results
    cleaned_results = []
    ids = list(set([restaurant.get("id") for restaurant in search_result if restaurant.get("id", None)]))
    saved_restaurants = storage.all(Restaurant)
    print(saved_restaurants)
    for resto_id, resto in saved_restaurants.items():
        if resto_id.split(".")[1]  in ids:
            cleaned_results.append(resto.to_dict())
    return jsonify(cleaned_results), 200