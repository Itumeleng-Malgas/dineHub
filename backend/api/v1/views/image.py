#!/usr/bin/python3
"""view to handle image"""

from api.v1.views import app_views
from models import storage
from models.image import Image
from flask import jsonify, request, abort

@app_views.route("/image", strict_slashes=False, methods=["GET",'POST',"DELETE", "PUT"])
def manage_image():
    """route to manage GET, POST, PUT and DELETE operations on an image"""
    if request.method == "POST":
        img_data = request.get_json(silent=True)
        print(img_data)

        if img_data is None or not isinstance(img_data, dict):
            # abort(404, "Not a valid JSON")
            return jsonify({"Error": "Not a valid JSON"})
        if img_data:
            # get the list of all accepted attributes of the class
            allow_attributes = [attrib for attrib in Image().__dir__() if not attrib.startswith('__')]

            new_image_dict = {}
            for key, value in img_data.items():
                if key not in allow_attributes:
                    print({"Error": f"unsopported attribute {key} identified"})
                    # return jsonify({"Error": f"unsopported attribute {key}"})
                if key not in ['created_at','updated_at','id']:
                        new_image_dict[key] = value
            new_image = Image(**new_image_dict)
            storage.new(new_image)
            storage.save()
            return jsonify(new_image.to_dict()), 200

    elif request.method == "DELETE":
         """endpoint to handle delete of image"""
         img_data = request.get_json(silent=True)
         if img_data is None and img_data.get("id",None):
             return jsonify({"Error": "No image id supplied"})
         img_id = img_data.get("id", None)
         img_id = img_id.strip()
         image = storage.get(Image, img_id)
         if image is None:
            return jsonify({"Message": f"No image found with that id {img_id}"}), 404
         storage.delete(image)
         storage.save()
         return jsonify({"Message": "image deleted successfully"}), 200
    elif request.method == "PUT":
        pass

