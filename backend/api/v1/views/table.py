#!/usr/bin/python3
"""view to handle table endpoints"""

from models.table import Table
from models import storage
from api.v1.views import app_views
from flask import request, jsonify, abort
from models.reservation import Reservation
from models.restaurant import Restaurant

@app_views.route("/tables", strict_slashes=False, methods=["GET"])
def get_table():
    if request.method == "GET":
        """returns the list of all tables available on the platform"""
        all_tables = [table.to_dict() for table in storage.all(Table).values()]
        return jsonify(all_tables)


@app_views.route("/tables", strict_slashes=False, methods=['POST'])
def create_table():
    """create a new table"""
    if request.method == "POST":
            data = request.get_json(silent=True)
            if data is None or not isinstance(data, dict):
                abort(404, "Not a valid JSON")
            if data:
                # get the list of all accepted attributes of the class
                allow_attributes = [attrib for attrib in Table().__dir__() if not attrib.startswith('__')]
                new_table_dict = {}
                for key, value in data.items():
                    if key not in allow_attributes:
                        print({"Error": f"unsopported attribute {key} identified"})
                        # return jsonify({"Error": f"unsopported attribute {key}"})
                    if key not in ['created_at','updated_at','id']:
                            new_table_dict[key] = value
                new_table = Table(**new_table_dict)
                storage.new(new_table)
                storage.save()
                return jsonify(new_table.to_dict()), 201

@app_views.route("/tables_restaurant/<restaurant_id>", strict_slashes=False, methods=['GET'])
def restaurant_tables(restaurant_id):
    """route to get all tables in a restaurant"""
    if request.method == "GET":
        # tables = [table.to_dict() for table in storage.all(Table).values()]
        restaurant = storage.get(Restaurant, restaurant_id)
        if restaurant:
            reservation_ids = [reservation.id for reservation in restaurant.reservations]
            print(reservation_ids)
        tables = []
        if restaurant:
            for reservation_id in reservation_ids:
                tables.extend([table.to_dict() for table in storage.all(Table).values() if reservation_id == table.reservation_id])
        return jsonify(tables), 200

@app_views.route("/tables_reservation/<reservation_id>", strict_slashes=False, methods=['GET'])
def reservation_tables(reservation_id):
    """route to get all the tables in a reservation"""
    if request.method == "GET":
        # tables = [table.to_dict() for table in storage.all(Table).values()]
        tables = []
        reservation = storage.get(Reservation, reservation_id)
        tables.extend([table.to_dict() for table in storage.all(Table).values() if reservation_id == table.reservation_id])
        return jsonify(tables), 200

@app_views.route("/table/<table_id>", strict_slashes=False, methods=['DELETE',"PUT","GET"])
def delete_tables(table_id):
    """endpoint to handle delete , get and update of restaurant"""
    if request.method == "GET":
        table = storage.get(Table, table_id)
        return jsonify(table.to_dict())
    
    elif request.method == "DELETE":
        """method to delete a table by ID"""
        table = storage.get(Table, table_id)
        if table is None:
            return jsonify({"Message": f"No table found with that id {table_id}"}), 404
        storage.delete(table)
        storage.save()
        return jsonify({"Message": "Table deleted successfully"}), 200
    elif request.method == "PUT":
        """endpoint to handle update of restaurant"""
        
        # try to get an object with that id
        table_obj = None
        table_obj = storage.get(cls=Table, id=table_id)
        if table_obj:
            allowed_attribs = [attrib for attrib in Table().__dir__()]
            update_data = request.get_json(silent=True)
            attributes = update_data.keys()
            for attrib in attributes:
                cleaned_attrib = attrib.strip()
                if cleaned_attrib in allowed_attribs:
                    setattr(table_obj, cleaned_attrib, update_data[attrib])
            table_obj.save()
            return jsonify(table_obj.to_dict())