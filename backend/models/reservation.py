#!/usr/bin/python3
"""module to handle reservations"""

from models.base_model import BaseModel
from models.restaurant import Status
from sqlalchemy import Column, String, Integer
import models

storage_type = models.storage_type
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
        status = Status.OPEN.value
    
    def __init__(self, *args, **kwargs):
        """constructor for reservation"""
        super().__init__(*args, **kwargs)