#!/usr/bin/python3
"""module to handle reservations"""

from models.base_model import BaseModel
# from models.restaurant import Status
from sqlalchemy import Column, String, Integer
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)
1
class Reservation(BaseModel):
    """class to handle reservations"""
    if storage_type == 'db':
        reservation_id = Column(String(36), nullable=False, primary_key=True)
        restaurant_id = Column(String(36), nullable=False)
        status = Column(String(20), nullable=False)
    
    else:
        reservation_id = ""
        restaurant_id = ""
        status = " "
    
    def __init__(self, *args, **kwargs):
        """constructor for reservation"""
        super().__init__(*args, **kwargs)