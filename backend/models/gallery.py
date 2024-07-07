#!/usr/bin/python3
"""module to implement the Gallery of restaurants"""

from models.base_model import BaseModel, Base
from models.restaurant import Restaurant
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from uuid import uuid4
import os


storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)


class Gallery(BaseModel, Base):
    """class to manage gallery"""
    if storage_type == 'db':
        __tablename__ = 'galleries'
        # id = Column(String(60), nullable=False, primary_key=True)
        # restaurant_id = Column(String(60), ForeignKey('restaurants.restaurant_id'), nullable=True)
        description = Column(String(60), nullable=True)
        
        # relationships
        images = relationship("Image", backref="gallery")
    elif storage_type == 'fs':
        description = ""

    def __init__(self, *args, **kwargs):
        """constructor for Gallery class"""
        super().__init__(*args, **kwargs)