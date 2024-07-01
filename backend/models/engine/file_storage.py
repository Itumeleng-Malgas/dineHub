#!/usr/bin/env python3
"""file storage Module based on json file"""

import json
import os
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

classes = {"Normal_client": Normal_client, "Client": Client, "Registered_client": Registered_client,
            "Drink": Drink, "Meal": Meal, "Menu": Menu, "Orders": Orders, "Order_item": Order_item,
            "Payment": Payment, "Reservation": Reservation, "Restaurant": Restaurant, "Review": Review,
            "User": User, "Table": Table}


class FileStorage:
    __file_path = 'dine_hub_file_db.json'
    __objects = {}
    
    def all(self, cls=None):
        """returns all objects of cls if cls is not None in storage ie __objects"""
        if cls:
            cls_objs = []
            for value in FileStorage.__objects.values():
                if value['__class__'] == cls:
                    cls_objs.append(value)
            return cls_objs
        return FileStorage.__objects
    def new(self, obj):
        """ sets in __objects the obj with key <obj class name>.id"""
        if obj:
            key = "{}.{}".format(obj.__class__.__name__, obj.id)
            FileStorage.__objects[key] = obj
    
    def save(self):
        """serializes __objects to the JSON file (path: __file_path)
        """
        obj_dict = {key: obj.to_dict() for key, obj in FileStorage.__objects.items()}
        with open(FileStorage.__file_path, 'w') as file:
            json.dump(obj_dict, file)
            
    def reload(self):
        """method to reload objects from __file_path"""

        if os.path.exists(FileStorage.__file_path):
            try:
                with open(FileStorage.__file_path, 'r') as file:
                    json_objects = json.load(file)
            except json.JSONDecodeError:
                """do nothing if decode error occurs"""
                return
            res_objs = {}
            for obj_key, obj in json_objects.items():
                res_objs[obj_key] = eval(obj["__class__"])(**obj)
            FileStorage.__objects = res_objs
            
    def delete(self, obj=None):
        """method to delete object from objects"""
        if obj:
            key = "{}.{}".format(obj.__class__.__name__, obj.id)
            if key in FileStorage.__objects.keys():
                FileStorage.__objects.pop(key, None)
            self.save()
            self.reload()

    def close(self):
        """calls reload method for deserializing the json file to objects"""
        self.reload()
        
    def get(self, cls, id):
        """method to get an instance of an object from storage"""
        for obj_key in FileStorage.__objects.keys():
            cls_name, obj_id = obj_key.split('.')
            if cls and id:
                if (cls_name == cls) and (obj_id == id):
                    return FileStorage[obj_key]
    def get_session(self):
        """method to get the current storage session"""
        return self
    
    def count(self, cls=None):
        """method to return the number of objects in fs"""
        self.reload()
        count = 0
        result = {}
        if cls is None:
            return len(self.__objects)
        available_clsses = [obj.split(".")[0] for obj in self.__objects.keys()]
        if cls in classes.values():
            for item in available_clsses:
                if cls.__name__ == item:
                    count += 1
            return count
        if cls in classes.keys():
            for item in available_clsses:
                if cls == item:
                    count += 1
            return count
        return 0
