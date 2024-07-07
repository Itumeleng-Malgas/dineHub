#!/usr/bin/python3
"""class to handle admin"""

from models.base_model import BaseModel, Base
from models.user import User
from sqlalchemy import Column, String, Integer, ForeignKey
from enum import Enum
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Admin_status(Enum):
   Active = "Active"
   Inactive = "Inactive"


class Admin(User, Base):
    """class to handle Admin"""
    if storage_type == "db":
        __tablename__ = "admins"
        admin_id = Column(String(60),ForeignKey('users.id'), nullable=False, primary_key=True)
        status = Column(String(12), nullable=False, default="Active")
        email = Column(String(60), nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(60), nullable=False)
        last_name = Column(String(60), nullable=False)
        
    elif storage_type == 'fs':
        status: Admin_status = None
        email = ""
        password = ""
        first_name = ""
        last_name = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for Admin"""
        super().__init__(*args, **kwargs)
