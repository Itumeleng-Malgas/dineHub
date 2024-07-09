#!/usr/bin/python3
"""view to manage routes to reviews"""

from models.review import Review
from api.v1.views import app_views
from models import storage
from flask import jsonify, request, abort

@app_views.route("/reviews", strict_slashes=False, methods=['GET', 'POST'])
def reviews():
    """Method to handle all reviews or create a new review."""
    if request.method == 'GET':
        """Method to get all reviews"""
        all_reviews = [review.to_dict() for review in storage.all(Review).values()]
        return jsonify(all_reviews), 200
    
    elif request.method == 'POST':
        """Handle creation of a new review"""
        review_data = request.get_json(silent=True)
        if not review_data:
            return jsonify({"error": "Not a JSON"}), 400
        
        required_fields = ["review_id", "restaurant_id", "client_id", "text"]
        for field in required_fields:
            if field not in review_data:
                return jsonify({"error": f"Missing {field}"}), 400
        
        new_review = Review(**review_data)
        storage.new(new_review)
        storage.save()
        return jsonify(new_review.to_dict()), 201

@app_views.route("/reviews/<review_id>", strict_slashes=False, methods=['GET', 'DELETE', 'PUT'])
def review_by_id(review_id):
    """Method to handle a single review by ID."""
    review = storage.get(Review, review_id)
    if not review:
        abort(404)

    if request.method == 'GET':
        """Retrieve a review by ID"""
        return jsonify(review.to_dict()), 200
    
    elif request.method == 'DELETE':
        """Delete a review by ID"""
        storage.delete(review)
        storage.save()
        return jsonify({}), 200
    
    elif request.method == 'PUT':
        """Update a review by ID"""
        review_data = request.get_json(silent=True)
        if not review_data:
            return jsonify({"error": "Not a JSON"}), 400

        ignore_fields = ["id", "created_at", "updated_at", "restaurant_id", "client_id"]
        for key, value in review_data.items():
            if key not in ignore_fields:
                setattr(review, key, value)
        
        storage.save()
        return jsonify(review.to_dict()), 200
