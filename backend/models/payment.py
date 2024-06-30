#!/usr/bin/python3
"""module to implement payments"""

from models.base_model import BaseModel
from enum import Enum
from datetime import datetime

class PaymentStatus(Enum):
    SUCCESS = "success"
    FAILURE = "failure"

class Payment(BaseModel):
    """class to implement payments"""
    payment_id = ""
    order_id = ""
    amount = 0.0
    payment_date = datetime.now()
    
    def __init__(self, *args, **kwargs):
        """constructor for payments"""
        super().__init__(*args, **kwargs)
