#!/usr/bin/python3
"""module to manage images"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime, ForeignKey
from datetime import datetime
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)
class Image(BaseModel, Base):
    """class to manage Images"""
    if storage_type == 'db':
        __tablename__ = "images"
        url = Column(String(255), nullable=False)
        description = Column(String(255), nullable=True)
        gallery_id = Column(String(60), ForeignKey('galleries.id'), nullable=True)
        restaurant_id = Column(String(60), ForeignKey('restaurants.restaurant_id'), nullable=True)
    elif storage_type == 'fs':
        url = ""
        description = ""
        gallery_id = ""
        restaurant_id = " "
        
    def __init__(self, *args, **kwargs):
        """constructor for image class"""
        super().__init__(*args, **kwargs)
