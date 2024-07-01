#!/usr/bin/python3
"""module to handle users"""

from models.base_model import BaseModel
class User(BaseModel):
    user_id = ""
    date_created = ""
    last_updated = ""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
