#!/usr/bin/env python3
"""Module to handle clients"""

from models.base_model import BaseModel, Base
from uuid import uuid4
from datetime import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
import os
from models.user import User

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Client(User, Base):
    """class to manage clients"""
    if storage_type == 'db':
        __tablename__ = 'clients'
        client_id = Column(String(60), ForeignKey('users.id'), nullable=False, primary_key=True)
        last_purchase = Column(DateTime, nullable=False, default=datetime.now())
        
    # class attributes
    elif storage_type == 'fs':
        last_purchase = datetime.now()

    
    def __init__(self, *args, **kwargs):
        """client constructor """
        # makes call to parent BaseModel constructor
        super().__init__(*args, **kwargs)

