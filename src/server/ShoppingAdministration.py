#from .bo.User import User ... 
from .bo.User import User

#from .db.UserMapper import UserMapper ..
from .db.UserMapper import UserMapper


#hier müssen BO Klassen & Mapper importiert werden

class ShoppingAdministration (object):

    def __init__(self):
        pass

    
    def create_user(self, name, email, google_user_id):
        """Um einen User anzulegen"""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_user_id(google_user_id)
        user.set_id(1)

        with UserMapper() as mapper:
                return mapper.insert(user)