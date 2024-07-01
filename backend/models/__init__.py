#!/usr/bin/env python3
"""Handles module storage initialization"""

from models.engine.file_storage import FileStorage
from models.engine.db_storage import DBStorage
from os import environ

storage_type = environ('DINEHUB_TYPE_STORAGE', None)
if storage_type:
    if storage_type == 'fs':
        storage = FileStorage()
    else:
        storage = DBStorage()

storage.reload()