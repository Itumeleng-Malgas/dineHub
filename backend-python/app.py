#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_restful import Api
from config import Config
from models import db
from resources.restaurant import RestaurantResource

app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)
db.init_app(app)

with app.app_context():
    db.create_all()

api.add_resource(RestaurantResource, '/restaurants')

if __name__ == '__main__':
    app.run(debug=True)
