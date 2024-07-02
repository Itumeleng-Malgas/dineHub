#!/usr/bin/python3
"""db relational database storage engine based on mysql"""

from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from models.base_model import BaseModel, Base

# import all models to db_storage class
from models.client import Client
from models.normal_client import Normal_client
from models.registered_client import Registered_client
from models.drink import Drink
from models.meal import Meal
from models.menu import Menu
from models.orders import Orders
from models.order_item import Order_item
from models.payment import Payment
from models.reservation import Reservation
from models.restaurant import Restaurant
from models.review import Review
from models.user import User
from models.table import Table


classes = {"Normal_client": Normal_client, "Client": Client, "Registered_client": Registered_client,
            "Drink": Drink, "Meal": Meal, "Menu": Menu, "Orders": Orders, "Order_item": Order_item,
            "Payment": Payment, "Reservation": Reservation, "Restaurant": Restaurant, "Review": Review,
            "User": User, "Table": Table}

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
        
    def all(self, cls=None):
        """method to get all objects of class name cls"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def count(self, cls=None):
        """method to return the number of objects in db"""
        if cls is None:
            count = 0
            for cls in classes.values():
                count+=self.__session.query(cls).count()
            return count
        if cls in classes.keys():
            cls = classes[cls]
        if cls not in classes.values():
            return 0
        return self.__session.query(cls).count()

    def get(self, cls, id):
        """method to get an object by id"""
        if cls in classes.keys():
            cls = classes[cls]
        if cls not in classes.values():
            return None
        return self.__session.query(cls).filter(id == cls.id).one_or_none()

    def new(self, obj):
        """method to add new class instance into storage of session"""
        self.__session.add(obj)

    def save(self):
        """save object to database"""
        self.__session.commit()

    def delete(self, obj=None):
        """Method to delete """
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """method to relaod database"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session

    def close(self):
        """call remove() method on private session and close database"""
        self.__session.remove()

    def get_session(self):
        """get the current session"""
        return self.__session
