from server.bo import BusinessObject as bo

class User (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__email = ""
        self.__user_id = ""
    

    def get_name(self):
        return self.__name
    
    def set_name(self, val):
        self.__name = val
    
    def get_email(self):
        return self.__email

    def set_email(self, val):
        self.__email = val  

    def get_user_id(self):
        return self.__user_id

    def set_user_id(self, val):
        self.__user_id = val
    
    def __str__(self):
        #hier ist mir nicht ganz klar warum thies sowohl get_id als auch user_id verwendet?
         return "User: {}, {}, {}, {}".format(self.get_id(), self.__name, self.__email, self.__user_id)

    @staticmethod
    def from_dict(dictionary=dict())
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_user_id(dictionary["user_id"])
        return obj