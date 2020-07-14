from server.bo import BusinessObject as bo

import random

class User (bo.BusinessObject):
    """
    author: Julius and Niklas
    """
    def __init__(self):
        super().__init__()
        self._name = ""
        self._email = "" 
        self._firebase_id = "" 
        self._creationdate = None 
    
    def randomize(self):
        """
        testing only
        creating attributes for self Userobject
        atm not checking if usermail etc exists in db!!!
        julius
        """

        chars = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" 

        self.set_name(''.join(random.sample(chars,8)))
        self.set_email(str(self.get_name())+"@testmail.de")
        self.set_firebase_id(self.get_name() + str(random.randint(2001,3000)))

    def get_creationdate(self):
        return self._creationdate

    def set_creationdate(self,cd):
        self._creationdate = cd 

    def get_name(self):
        return self._name
    
    def set_name(self, val):
        self._name = val
    
    def get_email(self):
        return self._email

    def set_email(self, val):
        self._email = val  

    def get_firebase_id(self):
        return self._firebase_id

    def set_firebase_id(self, val):
        self._firebase_id = val
    
    def __str__(self):
        return "Userobject:  ID: {}, Name: {}, Mail: {}, FirebaseID: {}".format(self.get_id(), self._name, self._email, self._firebase_id)
    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_firebase_id(dictionary["firebase_id"])
        obj.set_creationdate(dictionary["creationdate"])
        return obj


