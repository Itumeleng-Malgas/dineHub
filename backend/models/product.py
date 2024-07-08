#!/usr/bin/python3
"""module to handle product"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.orm import relationship
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Product(BaseModel, Base):
    """class to handle products"""
    if storage_type == 'db':
        __tablename__ = "products"
        name = Column(String(60), nullable=False)
        description = Column(String(255), nullable=True)
        price  = Column(Float, default=0.0)
        cuisine = Column(String(60), nullable=True, default="unknown Cuisine")
        menu_id = Column(String(60), ForeignKey('menus.id'), nullable=False)
        picture = Column(String(60), default="No imageURL")
        # userid = Column(String(60), ForeignKey('users.id'), nullable=False)
        id = Column(String(60), ForeignKey('restaurants.restaurant_id'), nullable=False, primary_key=True)
    
    elif storage_type == 'fs':
        name = ""
        description = ""
        price  = 0.0
        cuisine = ""
        menu_id = ""
        picture = ""
        # userid = ""
        id = ""
        
    def __init__(self, *args, **kwargs):
        """constructor for product"""
        super().__init__(*args, **kwargs)
