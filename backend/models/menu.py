#!/usr/bin/python3
"""module to handle menu"""

from models.base_model import BaseModel
from models.restaurant import RestaurantStatus

class Menu(BaseModel):
    """class to handle Menu"""
    menu_id = ""
    restaurant_id = ""
    status = RestaurantStatus.OPEN.value
    
    def __init__(self, *args, **kwargs):
        """Constructor for Menu"""
        super().__init__(*args, **kwargs)
