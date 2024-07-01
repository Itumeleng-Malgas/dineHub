#!/usr/bin/python3
"""module to handle orders"""
from models.base_model import BaseModel
from sqlalchemy import Column, String, Integer
import models
from enum import Enum
storage_type = models.storage_type


class OrderStatus(Enum):
    """Enum class to handle order status"""
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"
    PENDING = "Pending"

class Orders(BaseModel):
    """class to handle orders"""
    
    if storage_type == 'db':
        __tablename__ = 'orders'
        order_id = Column(String(60), nullable=False)
        client_id = Column(String(60), nullable=False)
        status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
        
    else:
        order_id = ""
        client_id = ""
        status: OrderStatus = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for Orders"""
        super().__init__(*args, **kwargs)
    