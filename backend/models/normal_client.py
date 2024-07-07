#!/usr/bin/env python3
"""module to handle normal client"""

# from models.base_model import BaseModel
from models.client import Client
from models.base_model import BaseModel,Base
from sqlalchemy import Column, String, Integer, ForeignKey
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Normal_client(Client, Base):
    """class to handle baseModel"""
    if storage_type == 'db':
        __tablename__ = "normal_clients"
        client_id = Column(String(60), ForeignKey('clients.client_id'), nullable=False, primary_key=True)
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
