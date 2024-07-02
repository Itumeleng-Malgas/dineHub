#!/usr/bin/env python3
"""Handles module storage initialization"""

from models.engine.file_storage import FileStorage
from models.engine.db_storage import DBStorage
from os import getenv

storage_type = getenv('DINEHUB_TYPE_STORAGE', None)
if storage_type:
    if storage_type == 'db':
        storage = DBStorage()
        storage.reload()
    else:
        storage = FileStorage()
        storage.reload()

