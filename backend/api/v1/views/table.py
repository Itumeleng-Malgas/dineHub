#!/usr/bin/python3
"""view to handle table endpoints"""

from models.table import Table
from models import storage
from api.v1.views import app_views
from flask import request, jsonify, abort

@app_views.route("/table", strict_slashes=False, methods=["GET"])
def get_table():
    if request.method == "GET":
        """returns the list of all tables available on the platform"""
        all_tables = [table.to_dict() for table in storage.all(Table).values()]
        return jsonify(all_tables)
    elif request.method == "POST":
        """method to create a new reservation"""
        reservation_data = request.get_json(silent=True)
        print("helo world")
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
        return jsonify(new_reservation.to_dict())