#!/usr/bin/python3
"""module to handle reservations"""

from models.base_model import BaseModel
from models.restaurant import Status

class Reservation(BaseModel):
    """class to handle reservations"""
    reservation_id = ""
    restaurant_id = ""
    status = Status.OPEN.value
    
    def __init__(self, *args, **kwargs):
        """constructor for reservation"""
        super().__init__(*args, **kwargs)