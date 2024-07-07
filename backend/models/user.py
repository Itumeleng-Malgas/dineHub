#!/usr/bin/python3
"""module to handle users"""

from models.base_model import BaseModel, Base
from sqlalchemy import String, Column, DateTime
from uuid import uuid4
from datetime import datetime
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)
class User(BaseModel, Base):
    if storage_type == 'db':
        __tablename__ = "users"
        last_checkin = Column(DateTime, nullable=False, default=datetime.now())
    else:
        last_checkin = datetime.now()
        
    def __init__(self, *args, **kwargs):
        """constructor for user"""
        super().__init__(*args, **kwargs)
