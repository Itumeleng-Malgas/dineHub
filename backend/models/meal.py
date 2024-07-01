#!/usr/bin/python3
"""module to handle meal"""

from models.base_model import BaseModel
from enum import Enum

class MealCategory(Enum):
    """Enum class for meal category"""
    LOCAL = "Local"
    INTERNATIONAL = "International"
    TRADITIONAL = "Traditional"

class DietType(Enum):
    """Enum class for diet type"""
    VEGAN = "Vegan"
    PESCATARIAN = "Pescatarian"
    FLEXITARIAN = "Flexitarian"
    PALEO = "Paleo"
    KETO = "Keto"
    MEDITERRANEAN = "Mediterranean"

class Meal(BaseModel):
    """class to handle meal"""
    meal_id = ""
    restaurant_id = ""
    name = ""
    description = ""
    price = 0.0
    meal_category: MealCategory = None
    diet_type: DietType = None
    
    def __init__(self, *args, **kwargs):
        """constructor for meal"""
        super().__init__(*args, **kwargs)
    