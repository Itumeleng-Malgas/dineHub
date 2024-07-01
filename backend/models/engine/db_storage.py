#!/usr/bin/python3
"""db relational database storage engine based on mysql"""

from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from models.base_model import BaseModel, Base

class DBStorage:
    """class to manage database storage"""
    __engine = None
    __session = None
    
    def __init__(self) -> None:
        """constructor for db storage instance by creating
        a connection to database storage
        """
        DINEHUB_MYSQL_USER = getenv('DINEHUB_MYSQL_USER')
        DINEHUB_MYSQL_PWD = getenv('DINEHUB_MYSQL_PWD')
        DINEHUB_MYSQL_HOST = getenv('DINEHUB_MYSQL_HOST')
        DINEHUB_MYSQL_DB = getenv('DINEHUB_MYSQL_DB')
        DINEHUB_ENV = getenv('DINEHUB_ENV')
        
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(DINEHUB_MYSQL_USER,
                                             DINEHUB_MYSQL_PWD,
                                             DINEHUB_MYSQL_HOST,
                                             DINEHUB_MYSQL_DB), pool_pre_ping=True)
        
        if DINEHUB_ENV == 'test':
            Base.metadata.drop_all(self.__engine)
        
    def get(self):
        """method to get an instance of an object from storage"""