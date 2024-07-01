#!/usr/bin/python3
"""module to handle menu"""

from models.base_model import BaseModel
from models.restaurant import Status
from sqlalchemy import Column, String, Integer
import models

storage_type = models.storage_type

class Menu(BaseModel):
    """class to handle Menu"""
    if storage_type == 'db':
        __tablename__ = "menus"
        menu_id = Column(String(60), nullable=False)
        restaurant_id = Column(String(60), nullable=False)
        status = Column(String(60), nullable=False)

    else:
        menu_id = ""
        restaurant_id = ""
        status: Status = ""
    
    def __init__(self, *args, **kwargs):
        """Constructor for Menu"""
        super().__init__(*args, **kwargs)
