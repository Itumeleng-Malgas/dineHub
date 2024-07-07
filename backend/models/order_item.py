#!/usr/bin/python3
"""class to handle order_item"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from models.orders import Orders
import uuid
from enum import Enum
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)
class ItemType(Enum):
    Drink = "Drink"
    Meal = "Meal"

class Order_item(BaseModel):
    """class to implement Order_item"""
    if storage_type == 'db':
        __tablename__ = "order_item"
        #order_id = Column(String(60), ForeignKey(Orders.order_id) nullable=False)
        order_item_id = Column(String(60), nullable=False, default=str(uuid.uuid4()))
        # item_id = Column(String(60, ForeignKey(Item.item_id)))
        item_type = Column(String(60), nullable=False)
    elif storage_type == 'fs':
        order_item_id = ""
        order_id = ""
        item_id = ""
        item_type: ItemType = None
    
    def __init__(self, *args, **kwargs):
        """constructor for Order_Items"""
        super().__init__(*args, **kwargs)
