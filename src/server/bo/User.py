from server.bo import BusinessObject as bo

class User (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__email = "" 
        self.__firebase_id = ""   
    

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
        return "User: {}, {}, {}, {}".format(self.get_id(), self.__name, self.__email, self.__firebase_id)
    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_firebase_id(dictionary["firebase_id"])
        return obj


