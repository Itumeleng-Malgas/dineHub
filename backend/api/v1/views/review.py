#!/usr/bin/python3
"""view to manage routes to reviews"""

from models.review import Review
from api.v1.views import app_views
from models import storage
from flask import jsonify, request

@app_views.route("/reviews", strict_slashes=False, methods=['GET', 'POST'])
def reviews():
    """method to handle review of """
    if request.method == 'GET':
        """method to get all the reviews"""
        all_reviews = [review.to_dict() for review in storage.all(Review).values()]
        return jsonify(all_reviews),  200
    elif request.method == 'POST':
        """handle creation of new review"""
        review_data = request.get_json(silent=True)
        new_review = {}
        if review_data:
            review_attributes = [ "review_id","restaurant_id","client_id","text"]
            for attrib, attrib_val in review_data.items():
                if attrib in review_attributes:
                    new_review[attrib] = attrib_val
            review = Review(**new_review)
            storage.new(review)
            storage.save()
        return jsonify(review.id)
