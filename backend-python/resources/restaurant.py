#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import request
from flask_restful import Resource
from bson.objectid import ObjectId
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client.dinehub

class RestaurantResource(Resource):
    def get(self):
        restaurants = db.restaurants.find()
        result = []
        for restaurant in restaurants:
            result.append({
                'id': str(restaurant['_id']),
                'name': restaurant['name'],
                'location': restaurant['location'],
                'contact_info': restaurant['contact_info']
            })
        return result

    def post(self):
        data = request.get_json()
        restaurant_id = db.restaurants.insert_one({
            'name': data['name'],
            'location': data['location'],
            'contact_info': data['contact_info']
        }).inserted_id
        return {'id': str(restaurant_id), 'name': data['name'], 'location': data['location'], 'contact_info': data['contact_info']}, 201

    def put(self, restaurant_id):
        data = request.get_json()
        updated_restaurant = db.restaurants.find_one_and_update(
            {"_id": ObjectId(restaurant_id)},
            {"$set": {
                'name': data['name'],
                'location': data['location'],
                'contact_info': data['contact_info']
            }},
            return_document=True
        )
        if updated_restaurant:
            return {'id': str(updated_restaurant['_id']), 'name': updated_restaurant['name'], 'location': updated_restaurant['location'], 'contact_info': updated_restaurant['contact_info']}
        else:
            return {'message': 'Restaurant not found'}, 404

    def delete(self, restaurant_id):
        result = db.restaurants.delete_one({"_id": ObjectId(restaurant_id)})
        if result.deleted_count:
            return {'message': 'Restaurant deleted'}
        else:
            return {'message': 'Restaurant not found'}, 404
