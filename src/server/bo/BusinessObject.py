from abc import ABC, abstractmethod


class BusinessObject(ABC):
   
    def __init__(self):
        self._id = 0  

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self,value):
        """Setzen der ID."""
        self._id = value

