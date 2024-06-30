#!/usr/bin/env python3
"""file storage Module based on json file"""

import json
import os
from models.base_model import BaseModel
from models.client import Client
from models.normal_client import Normal_client

class FileStorage:
    __file_path = 'dine_hub_file_db.json'
    __objects = {}
    
    def all(self):
        """returns all objects in storage ie __objects"""
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
