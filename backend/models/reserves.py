#!/usr/bin/python3
"""module to handle reserves"""
import os
from sqlalchemy import Column, String, ForeignKey, DateTime
from models.client import Client
from models.base_model import BaseModel, Base
from models.table import Table
from datetime import datetime

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)


class Reserves(BaseModel, Base):
    """class to manage Booking"""
    if storage_type == 'db':
        client_id = Column(String(60), ForeignKey(Client.client_id), nullable=False)
        table_id = Column(String(60), ForeignKey(Table.table_id), nullable=False)
        date_reserved = Column(DateTime, nullable=False, default=datetime.now())
        status = Column(String(6),nullable=False)
    elif storage_type == 'fs':
        client_id = ""
        table_id = ""
        date_reserved = ""
        status = ""
    
    def __init__(self, *args, **kwargs):
        """constructor for Booking"""
        super().__init__(*args, **kwargs)