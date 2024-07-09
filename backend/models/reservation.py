#!/usr/bin/python3
"""module to handle reservations"""

from models.base_model import BaseModel, Base
# from models.restaurant import Status
from sqlalchemy import Column, String, Integer, ForeignKey
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)
class Reservation(BaseModel, Base):
    """class to handle reservations"""
    if storage_type == 'db':
        __tablename__ = 'reservations'
        # id = Column(String(36), nullable=False, primary_key=True)
        restaurant_id = Column(String(36), ForeignKey("restaurants.restaurant_id"), nullable=False)
        # status can take a value of OPEN or CLOSED
        status = Column(String(20), nullable=False)
    
    else:
        # id = ""
        restaurant_id = ""
        # status can take a value of OPEN or CLOSED
        status = " "
    
    def __init__(self, *args, **kwargs):
        """constructor for reservation"""
        super().__init__(*args, **kwargs)