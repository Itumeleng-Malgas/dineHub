#!/usr/bin/python3
"""module to handle registered client"""

from models.base_model import BaseModel
from models.client import Client
from enum import Enum

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

class Registered_client(Client):
    """class to handle registered clinets"""
    registered_client_id = ""
    # client_id = Client.client_id
    email = ""
    telephone = ""
    first_name = ""
    last_name = ""
    password = ""
    # diet_type = ""
    # meal_preference = ""
    # drink_preference = ""
    diet_type : Diet_Type = None
    meal_preference : Meal_Preference = None
    drink_preference : Drink_Preference = None

    
    def __init__(self, *args, **kwargs):
        """constructor of registed_client"""
        super().__init__(*args, **kwargs)
