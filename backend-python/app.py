#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_restful import Api
from config import Config
from resources.restaurant import RestaurantResource
from resources.menu import MenuResource


app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)

# Endpoint to get a specific restaurant by ID
api.add_resource(RestaurantResource, '/restaurants', '/restaurants/<string:restaurant_id>')
api.add_resource(MenuResource, '/menus', '/menus/<string:menu_id>')

if __name__ == '__main__':
    app.run(debug=True)
