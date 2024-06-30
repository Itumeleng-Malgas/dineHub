#!/usr/bin/python3
"""module to handle reviews"""

from models.base_model import BaseModel


class Review(BaseModel):
    """class to handle client reviews"""
    review_id = ""
    restaurant_id = ""
    client_id = ""
    text = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for review"""
        super().__init__(*args, **kwargs)
