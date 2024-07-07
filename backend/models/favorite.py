#!/usr/bin/python3
"""module to support favorite"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from datetime import datetime
from models.registered_client import Registered_client
from models.restaurant import Restaurant
import os
import uuid

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Favorite(Base):
    """class to handle favorite"""
    if storage_type == 'db':
        __tablename__ = 'favorites'
        # favorite_id = Column(String(60), nullable=False, default=lambda: str(uuid.uuid4()))
        userId = Column(String(60), ForeignKey('registered_clients.client_id'),nullable=False, primary_key=True)
        restaurant_id = Column(String(60), ForeignKey('restaurants.restaurant_id'), nullable=False, primary_key=True)
        favorite_since = Column(DateTime, nullable=False,default=datetime.now())
    else:
        # favorite_id = str(uuid.uuid4())
        userId = ""
        restaurant_id = ""
        favorite_since = datetime.now()

        
    def __init__(self, *args, **kwargs):
        """constructor for favorite class"""
        super().__init__(*args, **kwargs)
