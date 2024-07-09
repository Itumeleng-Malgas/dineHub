#!/usr/bin/python3
"""module to handle booking"""

from api.v1.views import app_views
from datetime import datetime
from models import storage
from models.client import Client
from models.booking import Booking
from flask import jsonify, request, abort

@app_views.route('/bookings', strict_slashes=False, methods=['GET'])
def bookings():
    bookings = storage.all(Booking).values()
    # Convert dict_values to a list of dictionaries
    bookings_list = [booking.to_dict() for booking in bookings]
    return jsonify(bookings_list)

@app_views.route('/bookings/<booking_id>', strict_slashes=False, methods=['GET'])
def booking(booking_id):
    """route to get specific booking"""
    booking = storage.get(Booking, booking_id)
    if booking is None:
        abort(404)
    if request.method == 'GET':
        return jsonify(booking.to_dict())

@app_views.route('/bookings', methods=['POST'])
def bookings_post():
    booking_data = request.get_json()

    # Check if the client_id exists in the clients table
    client_id = booking_data.get('client_id')
    client = storage.get(Client, client_id)
    if not client:
        return jsonify({'error': 'Client not found'}), 400

    # Ensure booked_on is a valid datetime string
    try:
        booking_data['booked_on'] = datetime.fromisoformat(booking_data['booked_on'])
    except ValueError:
        return jsonify({'error': 'Invalid datetime format for booked_on'}), 400

    # Create new booking
    new_booking = Booking(**booking_data)
    storage.new(new_booking)
    storage.save()
    return jsonify(new_booking.to_dict()), 201

@app_views.route('/bookings/<booking_id>', strict_slashes=False, methods=['DELETE', 'PUT'])
def booking_id(booking_id):
    """route to delete or update booking"""
    booking = storage.get(Booking, booking_id)
    if booking is None:
        abort(404)
    if request.method == 'DELETE':
        storage.delete(booking)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        if not request.is_json:
            return jsonify({"error": "Not a JSON"}), 400
        for key, value in request.get_json().items():
            if key not in ['id', 'created_at', 'updated_at']:
                setattr(booking, key, value)
        storage.save()
        return jsonify(booking.to_dict()), 200
    