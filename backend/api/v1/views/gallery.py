#!/usr/bin/python3
"""view to handle restaurant"""

from api.v1.views import app_views
from models import storage
from models.gallery import Gallery
from flask import jsonify, request, abort

@app_views.route("/add_gallery", strict_slashes=False, methods=['POST'])
def add_gallery():
    """route to register a new gallery to the system"""
    if request.method == "POST":
        gallery_data = request.get_json(silent=True)
        print(gallery_data)
    
    if gallery_data is None or not isinstance(gallery_data, dict):
        # abort(404, "Not a valid JSON")
        return jsonify({"Error": "Not a valid JSON"})
    if gallery_data:
        # get the list of all accepted attributes of the class
        allow_attributes = [attrib for attrib in Gallery().__dir__() if not attrib.startswith('__')]
        
        new_gallery_dict = {}
        for key, value in gallery_data.items():
            if key not in allow_attributes:
                print({"Error": f"unsopported attribute {key} identified"})
                # return jsonify({"Error": f"unsopported attribute {key}"})
            if key not in ['created_at','updated_at','id']:
                    new_gallery_dict[key] = value
        new_gallery = Gallery(**new_gallery_dict)
        storage.new(new_gallery)
        storage.save()
        return jsonify(new_gallery.to_dict()), 200

@app_views.route("/gallery/<id>", strict_slashes=False, methods=["DELETE", "UPDATE"])
def manage_gallery(id):
    """endpoint to handle delete and update galleries"""
    if request.method == "DELETE":
        gallery = storage.get(Gallery, id)
        if gallery is None:
            return jsonify({"Message": f"No Restaurant found with that id {id}"}), 404
        storage.delete(gallery)
        storage.save()
        return jsonify({"Message": "Restaurant deleted successfully"}), 200
    # elif request.method == "UPDATE":
    # id {other, }