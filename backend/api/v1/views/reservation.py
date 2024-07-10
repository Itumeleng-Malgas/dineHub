#!/usr/bin/python3
"""view to manage reservation"""

from models import storage
from models.reservation import Reservation
from api.v1.views import app_views
from flask import jsonify, request, abort

@app_views.route("/reservations", strict_slashes=False, methods=["GET","POST"])
def get_all_reservations():
    if request.method == "GET":
        """method to get all reservations"""
        all_reservation = [reservation.to_dict() for reservation in storage.all(Reservation)]
        return jsonify(all_reservation)
    elif request.method == "POST":
        """method to create a new reservation"""
        reservation_data = request.get_json(silent=True)
        print(reservation_data)
        if reservation_data is None or not isinstance(reservation_data, dict):
            return jsonify({"Error":"Not a valid JSON"}), 401
        if reservation_data:
            # get the list of all accepted attributes of the class
            allow_attributes = [attrib for attrib in Reservation().__dir__() if not attrib.startswith('__')]
            
            new_reservation_dict = {}
            for key, value in reservation_data.items():   
                clean_key = key.strip()
                if clean_key.strip() not in allow_attributes:
                    print({"Error": f"unsopported attribute {clean_key} identified"})
                    # return jsonify({"Error": f"unsopported attribute {key}"})
                if clean_key not in ['created_at','updated_at','id']:
                        new_reservation_dict[clean_key] = value
            new_reservation = Reservation(**new_reservation_dict)
            print(new_reservation)
            storage.new(new_reservation)
            storage.save()
        return jsonify(new_reservation.to_dict()), 201
