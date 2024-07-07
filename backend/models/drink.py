#!/usr/bin/python3
"""module to handle drinks"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, Float
import os

storage_type = os.getenv("DINEHUB_ST")
class Drink(BaseModel):
    """class to handle drinks"""
    if storage_type == 'db':
        """class to handle drinks"""
        __tablename__ = 'drinks'
        
        drink_id = Column(Integer, primary_key=True)
        menu_id = Column(Integer)
        name = Column(String(255))
        description = Column(String(255))
        price = Column(Float)
        
        def __init__(self, *args, **kwargs):
            """constructor for Drink class"""
            super().__init__(*args, **kwargs)
    
    def __init__(self, *args, **kwargs):
        """constructor for Drink class"""
        super().__init__(*args, **kwargs)
