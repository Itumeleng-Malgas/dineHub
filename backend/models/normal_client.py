#!/usr/bin/env python3
"""module to handle normal client"""

# from models.base_model import BaseModel
from models.client import Client
from models.base_model import Base
from sqlalchemy import Column, String, Integer
import models

storage_type = models.storage_type

class Normal_client(Client, Base):
    """class to handle baseModel"""
    if storage_type == 'db':
        __tablename__ = "normal_clients"
        normal_client_id = Column(String(255), nullable=False, primary_key=True)
        email = Column(String(255), nullable=False)
        telephone = Column(String(20), nullable=False)
        first_name = Column(String(60), nullable=False)
        last_name = Column(String(60), nullable=False)
    else:
        normal_client_id = ""
        email = ""
        telephone = ""
        first_name = ""
        last_name = ""
    
    def __init__(self, *args, **kwargs):
        """normal_client constructor"""
        super().__init__(*args, **kwargs)
