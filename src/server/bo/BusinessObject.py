from abc import ABC, abstractmethod


class BusinessObject(ABC):
    """
    Abstract class for all other business objects. Defines that every bo must have an ID and getter / setter for it
    """
   
    def __init__(self):
        self._id = 0  #the unique identification number of the instance of this class

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self,value):
        """Setzen der ID."""
        self._id = value
