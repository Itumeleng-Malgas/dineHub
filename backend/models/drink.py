#!/usr/bin/python3
"""module to handle drinks"""

from models.base_model import BaseModel


class Drink(BaseModel):
    """class to handle drinks"""
    drink_id: int = 0
    menu_id: int = 0
    name: str = ""
    description: str = ""
    price: float = 0.0
    
    def __init__(self, *args, **kwargs):
        """constructor for Drink class"""
        super().__init__(*args, **kwargs)
