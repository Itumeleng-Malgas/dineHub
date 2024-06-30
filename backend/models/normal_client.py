#!/usr/bin/env python3
"""module to handle normal client"""

# from models.base_model import BaseModel
from models.client import Client

class Normal_client(Client):
    """class to handle baseModel"""
    normal_client_id = ""
    email = ""
    telephone = ""
    first_name = ""
    last_name = ""
    
    def __init__(self, *args, **kwargs):
        """normal_client constructor"""
        super().__init__(*args, **kwargs)
