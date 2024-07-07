#!/usr/bin/python3
"""view to manage clients favorite restaurants"""

from models import storage
from models.favorite import Favorite
from api.v1.views import app_views
from flask import jsonify, request, abort

@app_views.route('/favorites', strict_slashes=False, methods=['GET','POST'])
def favorites():
    """method to handle /favorites endpoint"""
    if request.method == 'GET':
        all_favorites = [favorite.to_dict() for favorite in storage.all(Favorite).values()]
        return jsonify(all_favorites)
    elif request.method == 'POST':
        data = request.get_json(silent=True)
        if data is None or not isinstance(data, dict):
            abort(404, "Not a valid JSON")
        if data:
            # get the list of all accepted attributes of the class
            allow_attributes = [attrib for attrib in Favorite().__dir__() if not attrib.startswith('__')]
            print(data)
            print(allow_attributes)
            new_favorite_dict = {}
            for key, value in data.items():
                # if key not in allow_attributes:
                #     print(key in allow_attributes)
                #     print("helo")
                    # continue
                    # abort(404, f"unsopported attribute {key}")
                if key not in ['created_at','updated_at','id']:
                    new_favorite_dict[key] = value
            new_favorite = Favorite(**new_favorite_dict)
            storage.new(new_favorite)
            storage.save()
            return jsonify({"Message": "Resource Created Successfully"}), 200

@app_views.route('/favorite/<userId>', strict_slashes=False, methods=['GET'])
def get_favorites(userId):
    """method to get all clients favorite restaurants"""
    favorites = [favorite.to_dict() for favorite in storage.all(Favorite).values()]
    for favorite in favorites:
        if favorite.get('userId', None) == userId:
            return jsonify(favorite), 200
    return jsonify({"Message": f"No favorites restaurants for client: {userId}"}), 404

@app_views.route("/favorite", strict_slashes=False, methods=['POST'])
def get_favorites_via_param():
    """route to get all the favorites for a client"""
    data = request.get_json()
    if data is None or not isinstance(data, dict):
            abort(404, "Not a valid JSON")
    userId = data.get('userId', None)
    if not userId:
        abort(404, "id attribute not found in data")
    favorites = [favorite.to_dict() for favorite in storage.all(Favorite).values()]
    clients_favorite = []
    for favorite in favorites:
        if favorite.get('userId', None) == userId:
            clients_favorite.append(favorite)
    return jsonify(clients_favorite), 200
