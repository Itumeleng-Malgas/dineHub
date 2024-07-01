#!/usr/bin/python3
"""module to handle restaurant"""

from models.base_model import BaseModel, Base
import models
from sqlalchemy import Column, String, DateTime, Integer
from enum import Enum
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Status(Enum):
    OPEN = "open"
    CLOSED = "closed"

class Restaurant(BaseModel):
    """class to handle restaurant"""
    if storage_type == 'db':
        __tablename__ = "restaurants"
        restaurant_id = Column(String(60), nullable= False, primary_key=True, unique= True)
        name = Column(String(128), nullable=False)
        email = Column(String(60), nullable=False)
        password = Column(String(60), nullable=False)
        location = Column(String(60), nullable=False)
        capacity = Column(Integer, nullable=False)
        type = Column(String(60), nullable=False)
        status = Column(Enum(Status), nullable=True)  # Using the Enum type here
    else:
        restaurant_id = ""
        name = ""
        email = ""
        password = ""
        location = ""
        capacity = ""
        type = ""
        status : Status = None
    
    def __init__(self, *args, **kwargs):
        """constructor for restaurant"""
        super().__init__(*args, **kwargs)
