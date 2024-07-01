#!/usr/bin/python3
"""class to handle order_item"""

from models.base_model import BaseModel
from enum import Enum

class ItemType(Enum):
    Drink = "Drink"
    Meal = "Meal"

class Order_item(BaseModel):
    """class to implement Order_item"""
    order_item_id = ""
    order_id = ""
    item_id = ""
    item_type: ItemType = None
    
    def __init__(self, *args, **kwargs):
        """constructor for Order_Items"""
        super().__init__(*args, **kwargs)
