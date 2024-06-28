#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import request
from flask_restful import Resource
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client.dinehub

class MenuResource(Resource):
    def get(self, menu_id=None):
        if menu_id:
            menu = db.menus.find_one({"_id": ObjectId(menu_id)})
            if menu:
                return {'id': str(menu['_id']), 'restaurant_id': menu['restaurant_id'], 'date_posted': menu['date_posted']}
            else:
                return {'message': 'Menu not found'}, 404
        else:
            menus = db.menus.find()
            result = [{'id': str(menu['_id']), 'restaurant_id': menu['restaurant_id'], 'date_posted': menu['date_posted']} for menu in menus]
            return result

    def post(self):
        data = request.get_json()
        menu_id = db.menus.insert_one({
            'restaurant_id': data['restaurant_id'],
            'date_posted': data['date_posted']
        }).inserted_id
        return {'id': str(menu_id), 'restaurant_id': data['restaurant_id'], 'date_posted': data['date_posted']}, 201

    def put(self, menu_id):
        data = request.get_json()
        updated_menu = db.menus.find_one_and_update(
            {"_id": ObjectId(menu_id)},
            {"$set": {
                'restaurant_id': data['restaurant_id'],
                'date_posted': data['date_posted']
            }},
            return_document=True
        )
        if updated_menu:
            return {'id': str(updated_menu['_id']), 'restaurant_id': updated_menu['restaurant_id'], 'date_posted': updated_menu['date_posted']}
        else:
            return {'message': 'Menu not found'}, 404

    def delete(self, menu_id):
        result = db.menus.delete_one({"_id": ObjectId(menu_id)})
        if result.deleted_count:
            return {'message': 'Menu deleted'}
        else:
            return {'message': 'Menu not found'}, 404
