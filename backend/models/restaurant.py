#!/usr/bin/python3
"""module to handle restaurant"""

from models.base_model import BaseModel
from enum import Enum

class Status(Enum):
    OPEN = "open"
    CLOSED = "closed"

class Restaurant(BaseModel):
    """class to handle restaurant"""
    restaurant_id = ""
    name = ""
    email = ""
    password = ""
    location = ""
    capacity = ""
    type = ""
    status : Status = None
    
    def __init__(self, *args, **kwargs):
        """constructor for restaurant"""
        super().__init__(*args, **kwargs)
