from server.bo import BusinessObject as bo

import random

class User (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__email = "" 
        self.__firebase_id = ""   
    
    def randomize(self):
        """
        testing only
        creating attributes for self Userobject
        atm not checking if usermail etc exists in db!!!
        """

        chars = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" 

        self.set_name(''.join(random.sample(chars,8)))
        self.set_email(str(self.get_name())+"@testmail.de")
        self.set_firebase_id(self.get_name() + str(random.randint(2001,3000)))


    def get_name(self):
        return self.__name
    
    def set_name(self, val):
        self.__name = val
    
    def get_email(self):
        return self.__email

    def set_email(self, val):
        self.__email = val  

    def get_firebase_id(self):
        return self.__firebase_id

    def set_firebase_id(self, val):
        self.__firebase_id = val
    
    def __str__(self):
        return "Userobject:  ID: {}, Name: {}, Mail: {}, FirebaseID: {}".format(self.get_id(), self.__name, self.__email, self.__firebase_id)
    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_firebase_id(dictionary["firebase_id"])
        return obj


