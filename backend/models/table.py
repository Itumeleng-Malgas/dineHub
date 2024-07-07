#!/usr/bin/python3
"""class to handle tables"""

from models.base_model import BaseModel, Base
from enum import Enum
from sqlalchemy import Column, String, Integer, ForeignKey
import os

# class TableType(Enum):
#     """class to hadle table type(vip, standard)"""
#     VIP = 'vip'
#     STANDARD = 'standard'
storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)
class Table(BaseModel, Base):
    """class to handle tables"""
    if storage_type == 'db':
        __tablename__ = 'tables'  # Add this line to specify the table name in the database
        # table_id = Column(String(62), primary_key=True)
        # table types: VIP, Standard
        table_type = Column(String(60))  # Assuming TableType is an Enum
        reservation_id = Column(String(60), ForeignKey("reservations.id"), nullable=False)
        number_of_seats = Column(Integer, nullable=False, default=0)
        table_number = Column(Integer, default=0)

    else:
        table_id = ""
        table_type  = None
        reservation_id = ""
        number_of_seats = 0
        table_number =  0
    
    def __init__(self, *args, **kwargs):
        """constructor for table"""
        super().__init__(*args, **kwargs)
        
        
    
        