#!/usr/bin/python3
"""class to handle tables"""

from models.base_model import BaseModel
from enum import Enum

class TableType(Enum):
    """class to hadle table type(vip, standard)"""
    VIP = 'vip'
    STANDARD = 'standard'
    
class Table(BaseModel):
    """class to handle tables"""
    table_id = ""
    table_type : TableType = None
    reservation_id = ""
    number_of_seats = 0
    table_number =  0
    
    def __init__(self, *args, **kwargs):
        """constructor for table"""
        super().__init__(*args, **kwargs)
        
        
    
        