#!/usr/bin/python3
"""class to handle admin"""

from models.base_model import BaseModel
from sqlalchemy import Column, String, Integer
import Enum
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Admin_status(Enum):
    Active = "Active"
    Inactive = "Inactive"


class Admin(BaseModel):
    """class to handle Admin"""
    if storage_type == "db":
        __tablename__ = 'admins'
        admin_id = Column(String(60), nullable=False, primary_key=True)
        status = Column(Enum(Admin_status), nullable=False)
        email = Column(String(60), nullable=False)
        password = Column(String(128), nullable=False)
        first_name = Column(String(60), nullable=False)
        last_name = Column(String(60), nullable=False)
        last_checkin = Column(String(60), nullable=True)
    admin_id = ""
    status: Admin_status = None
    email = ""
    password = ""
    first_name = ""
    last_name = ""
    last_checkin = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for Admin"""
        super().__init__(*args, **kwargs)
