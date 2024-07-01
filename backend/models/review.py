#!/usr/bin/python3
"""module to handle reviews"""

from models.base_model import BaseModel
from sqlalchemy import Integer, String, Column
import models

storage_type = models.storage_type

class Review(BaseModel):
    """class to handle client reviews"""
    if storage_type == "db":
        __tablename__ = "reviews"
        review_id = Column(String(60), nullable=False)
        restaurant_id = Column(String(60), nullable=False)
        client_id = Column(String(60), nullable=False)
        text = Column(String(1024), nullable=False)

    else:
        review_id = ""
        restaurant_id = ""
        client_id = ""
        text = ""
    
    
    
    def __init__(self, *args, **kwargs):
        """constructor for review"""
        super().__init__(*args, **kwargs)
