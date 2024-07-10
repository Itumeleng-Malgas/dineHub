#!/usr/bin/env python3
"""file storage Module based on json file"""

import json
import os
# import all models to db_storage class
from models.client import Client
from models.normal_client import Normal_client
from models.registered_client import Registered_client
from models.menu import Menu
from models.orders import Orders
from models.order_product import Order_product
from models.payment import Payment
from models.reservation import Reservation
from models.restaurant import Restaurant
from models.review import Review
from models.user import User
from models.table import Table
from models.admin import Admin
from models.favorite import Favorite
from models.gallery import Gallery
from models.image import Image
from models.product import Product
from models.booking import Booking

classes = {"Normal_client": Normal_client, "Client": Client, "Registered_client": Registered_client,
           "Menu": Menu, "Orders": Orders, "Order_product": Order_product,
            "Payment": Payment, "Reservation": Reservation, "Restaurant": Restaurant, "Review": Review,
            "User": User, "Table": Table, "Admin":Admin, "Favorite":Favorite, "Gallery": Gallery, "Image":Image,
            "Product": Product, "Booking": Booking}


class FileStorage:
    __file_path = 'dine_hub_file_db.json'
    __objects = {}
    
    def all(self, cls=None):
        """returns all objects in storage"""
        if cls:
            available_classes_names= [class_.split('.')[0] for class_ in FileStorage.__objects.keys()]
            # this represents the string of the class names
            res = {}
            # if the cls is not a recognized classes type
            if not (cls in classes.values()):
                return {}
            # if the cls is a recognized class type we convert to string name of the class
            if type(cls) != str:
                cls = cls.__name__
            if cls in available_classes_names:
                for key, obj in FileStorage.__objects.items():
                    if cls == key.split('.')[0]:
                        res[key] = obj
                        # res.append(obj)
                return res
            else:
                return {}
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
            # for k, v in res_objs.items():
            #     res_objs[k] = v.to_dict()
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
        # if the cls is not a recognized classes type
        if not (cls in classes.values()):
            return {}
        # if the cls is a recognized class type we convert to string name of the class
        if type(cls) != str:
            cls = cls.__name__
        for obj_key in FileStorage.__objects.keys():
            cls_name, obj_id = obj_key.split('.')
            if cls and id:
                if (cls_name == cls) and (obj_id == id):
                    return FileStorage.__objects[obj_key]
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
