#!/usr/bin/python3
"""module to support favorite"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
import os
import uuid

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Favorite(BaseModel):
    """class to handle favorite"""
    if storage_type == 'db':
        favorite_id = Column(String(60), nullable=False, default=lambda: str(uuid.uuid4()))
        client_id = Column(String(60), nullable=False)
        restaurant_id = Column(String(60), nullable=False)
    else:
        favorite_id = str(uuid.uuid4())
        client_id = ""
        restaurant_id = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for favorite class"""
        super().__init__(*args, **kwargs)
