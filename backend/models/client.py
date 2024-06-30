#!/usr/bin/env python3
"""Module to handle clients"""

from models.base_model import BaseModel
from uuid import uuid4
from datetime import datetime

class Client(BaseModel):
    """class to manage clients"""
    
    # class attributes
    client_id = str(uuid4())
    last_checkin = ""
    
    def __init__(self, *args, **kwargs):
        """client constructor """
        # makes call to parent BaseModel constructor
        super().__init__(*args, **kwargs)

