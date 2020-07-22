import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper (AbstractContextManager, ABC):
    """Abstract class for mappers"""

    def __init__(self):
        self._cnx = None

    def __enter__(self):
        """Starts when mapper is called with with"""

        if os.getenv('GAE_ENV', '').startswith('standard'):
            self._cnx = connector.connect(user='kevin', password='kevin',
                                          unix_socket='/cloudsql/sw-praktikum-gruppe-1-ss2020:europe-west3:swpraktikum-sql',
                                          database='dev_shoppingproject')
        else:           
            self._cnx = connector.connect(user='kevin', password='kevin',
                                  host='localhost',
                                  database='dev_shoppingproject')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        
        self._cnx.close()


    """
    abstract methods that are required in every mapper 
    """
    @abstractmethod
    def find_all(self):
        
        pass

    @abstractmethod
    def find_by_key(self, key):
        
        pass

    @abstractmethod
    def insert(self, object):
        
        pass

    @abstractmethod
    def update(self, object):
        
        pass

    @abstractmethod
    def delete(self, object):
        
        pass
