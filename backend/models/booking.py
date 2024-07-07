#!/usr/bin/python3
"""module to manage booking"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, DateTime
from datetime import datetime
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)


class Booking(Base):
    """class to manage booking"""
    if storage_type == "db":
        __tablename__ = "bookings"
        client_id = Column(String(60), ForeignKey("clients.client_id"), nullable=False, primary_key=True)
        table_id = Column(String(60), ForeignKey("tables.id"), nullable=False, primary_key=True)
        booked_on = Column(DateTime, nullable=False, default=datetime.now())
        # Accepted, Rejected, Pending
        status = Column(String(60), nullable=False, default="pending")
    elif storage_type == "fs":
        client_id = ""
        table_id = ""
        booked_on = datetime.now()
        # Accepted, Rejected, Pending
        status = ""
    
    def __init__(self, *args, **kwargs):
        """ constructor class for booking"""
        super().__init__(*args, **kwargs)