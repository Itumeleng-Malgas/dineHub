from api.v1.views import app_views
from flask import jsonify
import models

from models.base_model import BaseModel
from models.client import Client
from models.normal_client import Normal_client
from models.drink import Drink
from models.meal import Meal
from models.menu import Menu
from models.order_item import Order_item
from models.registered_client import Registered_client
from models.reservation import Reservation
from models.restaurant import Restaurant
from models.review import Review
from models.table import Table
from models.user import User
from models.orders import Orders
from models.payment import Payment
from models.product import Product

classes = {"Normal_client": Normal_client, "Client": Client, "Registered_client": Registered_client,
            "Drink": Drink, "Meal": Meal, "Menu": Menu, "Orders": Orders, "Order_item": Order_item,
            "Payment": Payment, "Reservation": Reservation, "Restaurant": Restaurant, "Review": Review,
            "User": User, "Table": Table, "Product": Product}


@app_views.route('/status', strict_slashes=False, methods=['GET'])
def status():
    """route to get the current api status"""
    return jsonify({"status": "OK"}), 200

@app_views.route('/stats', strict_slashes=False, methods=['GET'])
def stats():
    """route to give statistics of objects in storage"""
    stats_dic = {}
    for cls_name, obj in classes.items():
        stats_dic [cls_name] = models.storage.count(obj)
    return jsonify(stats_dic), 200
