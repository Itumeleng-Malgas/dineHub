#!/usr/bin/python3
"""module to handle orders"""
from models.base_model import BaseModel
from enum import Enum

class OrderStatus(Enum):
    """Enum class to handle order status"""
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"
    PENDING = "Pending"

class Orders(BaseModel):
    """class to handle orders"""
    order_id = ""
    client_id = ""
    status: OrderStatus = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for Orders"""
        super().__init__(*args, **kwargs)
    