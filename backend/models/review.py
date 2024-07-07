#!/usr/bin/python3
"""module to handle reviews"""

from models.base_model import BaseModel, Base
from models.client import Client
from models.restaurant import Restaurant
from sqlalchemy import Integer, String, Column, ForeignKey, Float, DateTime
from datetime import datetime
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Review(Base):
    """class to handle client reviews"""
    if storage_type == "db":
        __tablename__ = "reviews"
        # review_id = Column(String(60), ForeignKey('') nullable=False, primary_key=True)
        restaurant_id = Column(String(60),ForeignKey('restaurants.restaurant_id'), nullable=False, primary_key=True)
        client_id = Column(String(60),ForeignKey('clients.client_id'), nullable=False, primary_key=True)
        text = Column(String(1024), nullable=False)
        rating = Column(Float, nullable=True)
        created_at = Column(DateTime, nullable=False,default=datetime.now())
        updated_at = Column(DateTime, nullable=False,default=datetime.now())
        

    else:
        # review_id = ""
        restaurant_id = ""
        client_id = ""
        text = ""
        rating = 0.0
        created_at = datetime.now()
        updated_at = datetime.now()
    
    
    
    def __init__(self, *args, **kwargs):
        """constructor for review"""
        super().__init__(*args, **kwargs)
