#!/usr/bin/python3
"""module to handle registered client"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.client import Client
from enum import Enum
import uuid
import models
import os

storage_type = os.getenv('DINEHUB_TYPE_STORAGE', None)

class Diet_Type(Enum):
    """class to handle enum of diet type"""
    VEGAN = "Vegan"
    PESCATARIAN = "pescatarian"
    FLEXITARIAN = "flexitarian"
    PALEO = "paleo"
    KETO = "keto"
    MEDITERRANEAN = "mediterranean"

class Meal_Preference(Enum):
    """class to handle enum of meal preference"""
    LOCAL = "Local"
    INTERNATIONAL = "International"
    TRADITIONAL = "Traditional"

class Drink_Preference(Enum):
    """class to handle enum of drink preference"""
    NATURAL = "Natural"
    SYNTHETIC = "Synthetic"
    ALCOHOLIC = "Alcoholic"
    NON_ALCOHOLIC = "Non_alcoholic"
    COCKTAILS = "Cocktails"

class Registered_client(Client, Base):
    """class to handle registered clinets"""
    if storage_type == 'db':
        __tablename__ = "registered_clients"
        # registered_client_id = Column(String(60), nullable=True, default=lambda: str(uuid.uuid4()))
        client_id = Column(String(60), ForeignKey('clients.client_id'), nullable=False, primary_key=True)
        telephone = Column(String(20), nullable=False)
        first_name = Column(String(128), nullable=False)
        last_name = Column(String(128), nullable=False)
        email = Column(String(60), nullable=False)
        password = Column(String(128), nullable=False)
        diet_type = Column(String(20), nullable=True)
        meal_preference = Column(String(20), nullable=True)
        drink_preference = Column(String(20), nullable=True)
        
        # Establish a relationship (optional)
        # client = relationship("Client", back_populates="registered_clients")
        
        # Relationships
        favorites = relationship("Favorite", backref="clients")
    else: 
        registered_client_id = uuid.uuid4()
        # client_id = Client.client_id
        telephone = ""
        first_name = ""
        last_name = ""
        password = ""
        email = ""
        # diet_type = ""
        # meal_preference = ""
        # drink_preference = ""
        diet_type : Diet_Type = None
        meal_preference : Meal_Preference = None
        drink_preference : Drink_Preference = None

    
    def __init__(self, *args, **kwargs):
        """constructor of registed_client"""
        super().__init__(*args, **kwargs)
