#!/usr/bin/python3
"""module to handle menu"""

from models.base_model import BaseModel, Base
from models.product import Product
# from models.restaurant import Status
from sqlalchemy import Column, String, Integer, ForeignKey, Table
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

# creating an intermediate menu_products table to relate menu and its products
if storage_type == "db":
    menu_product = Table('menu_product', Base.metadata, 
                         Column("menu_id", String(60), ForeignKey("menus.id", ondelete="CASCADE"), onupdate="CASCADE"),
                         Column("product_id", String(60), ForeignKey("products.id", ondelete="CASCADE"), onupdate="CASCADE")
                         )

class Menu(BaseModel, Base):
    """class to handle Menu"""
    if storage_type == 'db':
        __tablename__ = "menus"
        name = Column(String(60), nullable=False)
        restaurant_id = Column(String(60), ForeignKey('restaurants.restaurant_id'), nullable=False)
        # menu can be closed or open
        status = Column(String(60), nullable=False, default="open")

    else:
        name = ""
        restaurant_id = ""
        status = ""
    
    def __init__(self, *args, **kwargs):
        """Constructor for Menu"""
        super().__init__(*args, **kwargs)
