#!/usr/bin/python3
"""module to handle restaurant"""

import uuid
from models.base_model import BaseModel, Base
from models.user import User
import models
from sqlalchemy import UUID, Column, String, DateTime, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from enum import Enum
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)


class Status(Enum):
    OPEN = "open"
    CLOSED = "closed"

class Restaurant(User, Base):
    """class to handle restaurant"""
    if storage_type == 'db':
        __tablename__ = "restaurants"
        restaurant_id = Column(String(60), ForeignKey('users.id'), nullable= False, primary_key=True)
        # restaurant_id = Column(String(60), nullable=True)
        # restaurant_id = Column(String(60), nullable=True, default=lambda: str(uuid.uuid4()))
        name = Column(String(128), nullable=False)
        description = Column(String(60), nullable=False)
        preview = Column(String(60), nullable=False)
        email = Column(String(60), nullable=False)
        password = Column(String(60), nullable=False)
        # location = Column(String(60), nullable=False)
        # storing location as attributes instead of creating a  new class called location
        country = Column(String(60), nullable=False)
        state = Column(String(60), nullable=False)
        city = Column(String(60), nullable=False)
        capacity = Column(Integer, nullable=False, default=0)
        type = Column(String(60), nullable=False, default="Standard")
        status = Column(String(8), nullable=True, default="OPEN")
        cuisine = Column(String(26), nullable=True)
        role = Column(String(18), nullable=True)
        profileImageUrl = Column(String(500), nullable=True)
        overall_rating = Column(Float)
        gallery_id = Column(String(60), ForeignKey('galleries.id'), nullable=True)
        #status = Column(Enum(Status), nullable=True, default=Status.OPEN.values())  # Using the Enum type here
        # relationships
        # - Menu, gallery, reviews
        reviews = relationship("Review", backref="restaurant")
        menus = relationship("Menu", backref="restaurant")
        
    else:
        restaurant_id = ""
        name = ""
        email = ""
        password = ""
        description = ""
        capacity = ""
        type = ""
        status  = None
        # location details
        state = ""
        country = ""
        city = ""
        role = ""
        cuisine = ""
        profileImageUrl = ""
        # galleryImage = [] # list of image urls
        gallery_id = ""
        overall_rating = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for restaurant"""
        super().__init__(*args, **kwargs)
