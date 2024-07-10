#!/usr/bin/python3
"""class to handle order_item"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.orders import Orders
import uuid
from enum import Enum
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)
class ItemType(Enum):
    Drink = "Drink"
    Meal = "Meal"

class Order_product(BaseModel, Base):
    """class to implement Order_product"""
    if storage_type == 'db':
        __tablename__ = "order_product"
        order_id = Column(String(60), ForeignKey("orders.id"), nullable=False)
        product_id = Column(String(60), ForeignKey('products.id'), nullable=False)
        # order_item_id = Column(String(60), nullable=False, default=str(uuid.uuid4()))
        # item_id = Column(String(60, ForeignKey(Item.item_id)))
        
        quantity  = Column(Integer, nullable=False, default=1)
        
        # relationships
        products = relationship("Product", backref="order_product")
    elif storage_type == 'fs':
        order_id = " "
        product_id = " "
        quantity = 1
    
    def __init__(self, *args, **kwargs): 
        """constructor for Order_Items"""
        super().__init__(*args, **kwargs)
