#!/usr/bin/python3
"""module to implement payments"""

from models.base_model import BaseModel, Base
from enum import Enum
from sqlalchemy import Column, Float, String, DateTime, ForeignKey
from datetime import datetime
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class PaymentStatus(Enum):
    SUCCESS = "success"
    FAILURE = "failure"

class Payment(BaseModel, Base):
    """class to implement payments"""
    if storage_type == 'db':
        __tablename__ = "payments"
        order_id = Column(String(60), ForeignKey("orders.id"), nullable=False)
        amount = Column(Float, default=0.0)
        payment_date = Column(DateTime, default=datetime.now())
        
    elif storage_type == "fs":
        order_id = ""
        amount = 0.0
        payment_date = datetime.now()
    
    def __init__(self, *args, **kwargs):
        """constructor for payments"""
        super().__init__(*args, **kwargs)
