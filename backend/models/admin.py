#!/usr/bin/python3
"""class to handle admin"""

from models.base_model import BaseModel
from enum import Enum


class Admin_status(Enum):
    Active = "Active"
    Inactive = "Inactive"


class Admin(BaseModel):
    """class to handle Admin"""
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
