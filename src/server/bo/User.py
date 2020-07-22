from server.bo import BusinessObject as bo

import random

class User (bo.BusinessObject):
    """
    authors: Julius and Niklas
    User business object

    Attributes
    _name: <str>
    _email: <str>
    _firebase_id: <str> 
    _creationdate: <str> 
    _location: <str>
    """
    def __init__(self):
        super().__init__()
        self._name = ""
        self._email = "" 
        self._firebase_id = "" 
        self._creationdate = None 
        self._location = ""
    
    def randomize(self):
        """
        testing only  
        creating random attributes for self Userobject  
        atm not checking if usermail etc exists in db!!!  
        julius
        """

        chars = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" 

        self.set_name(''.join(random.sample(chars,8)))
        self.set_email(str(self.get_name())+"@testmail.de")
        self.set_firebase_id(self.get_name() + str(random.randint(2001,3000)))

    def get_creationdate(self):
        """
        getter for creationdate of user
        """
        return self._creationdate

    def set_creationdate(self,cd):
        """
        setter for creationdate of user
        """
        self._creationdate = cd 

    def get_name(self):
        """
        getter for name of user
        """
        return self._name
    
    def set_name(self, val):
        """
        setter for creationdate of user
        """
        self._name = val
    
    def get_email(self):
        """
        getter for email of user
        """
        return self._email

    def set_email(self, val):
        """
        setter for email of user
        """
        self._email = val  

    def get_firebase_id(self):
        """
        getter for firebase id of user
        """
        return self._firebase_id

    def set_firebase_id(self, val):
        """
        setter for firebase id of user
        """
        self._firebase_id = val
    
    def get_location(self):
        """
        getter for location of user
        """
        return self._location 

    def set_location(self, val):
        """
        setter for location of user
        """
        self._location = val
    
    def __str__(self):
        return "Userobject:  ID: {}, Name: {}, Mail: {}, FirebaseID: {}, Location: {}".format(self.get_id(), self._name, self._email, self._firebase_id, self._location)
    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_firebase_id(dictionary["firebase_id"])
        obj.set_location(dictionary["location"])
        return obj


