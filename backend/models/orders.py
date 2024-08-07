#!/usr/bin/python3
"""module to handle orders"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, Table, ForeignKey
from sqlalchemy.orm import relationship
import models
from enum import Enum
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

# creating an intermediate menu_products table to relate menu and its products
# if storage_type == "db":
#     order_product = Table('order_product', Base.metadata, 
#                         Column("order_id", String(60), ForeignKey("orders.id", ondelete="CASCADE"), onupdate="CASCADE"),
#                         Column("product_id", String(60), ForeignKey("products.id", ondelete="CASCADE"), onupdate="CASCADE"),
#                         Column("quantity", Integer, nullable=False, default=1)
#                         )

class OrderStatus(Enum):
    """Enum class to handle order status"""
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"
    PENDING = "Pending"

class Orders(BaseModel, Base):
    """class to handle orders"""
    
    if storage_type == 'db':
        __tablename__ = 'orders'
        # order_id = Column(String(60), nullable=False)
        client_id = Column(String(60), nullable=False)
        status = Column(String(80), nullable=False, default='Pending')
        # status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
        # products = relationship("Product", backref="orders")
        # Define the relationship, using the association table
        # products = relationship("Product", backref="orders")
    else:
        # order_id = ""
        client_id = ""
        status: OrderStatus = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for Orders"""
        super().__init__(*args, **kwargs)
    