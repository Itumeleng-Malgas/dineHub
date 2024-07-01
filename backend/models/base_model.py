#!/usr/bin/env python3
"""Base model class which will be inherited by other classes"""

import uuid
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime
import models

# create an instance of declarative base
Base = declarative_base()

class BaseModel:
    """Base model class"""
    id = Column(String(60), unique= True, nullable= False, primary_key= True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    
    def __init__(self, *args, **kwargs):
        """Base model constructor"""
        if kwargs:
            for k, v in kwargs.items():
                if k != '__class__':
                    if k in ['created_at', 'updated_at']:
                        v = datetime.strptime(v, '%Y-%m-%d %H:%M:%S')
                    if k == 'id' and type(v) != str:
                        v = str(uuid.uuid4())
                    setattr(self, k, v)
            # if kwargs lacks attributes we create them instantly
            if getattr(self, 'created_at', None) is None:
                setattr(self, 'created_at', datetime.now())
            if getattr(self, 'updated_at', None) is None:
                setattr(self, 'updated_at', datetime.now())
            if getattr(self, 'id', None) is None:
                setattr(self, 'id', str(uuid.uuid4()))
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.now()
            self.updated_at = datetime.now()
            # this will cause the object to be put into the 
            # the storage engine's collection of objects only when
            # the object is not created from kwargs
            # model.storage.new(self)
        # putting it here will cause it to be loaded even from 
        

    def __str__(self):
        """returns the string representation of class instance"""
        return "[{}]->({}) {}".format(self.__class__.__name__, self.id, self.__dict__)
    
    def save(self):
        """instance method to save model to storage"""
        self.updated_at = datetime.now()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self):
        """method to return the dictionary representation of the class instance"""
        instance_dict = self.__dict__.copy()
        instance_dict['__class__'] = self.__class__.__name__
        instance_dict['updated_at'] = self.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        instance_dict['created_at'] = self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        instance_dict.pop('_sa_instance_state', None)
        return instance_dict

    def delete(self):
        """deletes the current instance from storage"""
        models.storage.delete(self)
