#from .bo.User import User ... 
from .bo.User import User
from .bo.Group import Group
#from .db.UserMapper import UserMapper ..
from .db.UserMapper import UserMapper
from .db.GroupMapper import GroupMapper 
from .db.ListEntryMapper import ListEntryMapper


#hier müssen BO Klassen & Mapper importiert werden

class ShoppingAdministration (object):

    def __init__(self):
        pass

    
    def create_user(self, name, email, firebase_id):
        """Um einen User anzulegen"""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_firebase_id(firebase_id)
        user.set_id(1)

        with UserMapper() as mapper:
                return mapper.insert(user)
    
    def insert_user(self,user):
        with UserMapper() as mapper:
                return mapper.insert(user)

    def get_user_by_name(self, name):
        with UserMapper() as mapper:
            return mapper.find_by_name(name)
    
    def get_user_by_id(self, key):
        with UserMapper() as mapper:
            return mapper.find_by_key(key)

    def get_user_by_email(self, email):
        with UserMapper() as mapper:
            return mapper.find_by_email(email)
    
    def get_user_by_firebase_id(self, id):
        with UserMapper() as mapper:
            return mapper.find_by_firebase_id(id)
    
    def get_all_user(self):
        with UserMapper() as mapper:
            return mapper.find_all()
    
    def save_user(self, user):
        with UserMapper() as mapper:
            mapper.update(user)
    
    def delete_user(self, user):
        with UserMapper() as mapper:
            res = mapper.delete(user)
            return res

    #Groups:

    def get_all_groups(self):
        with GroupMapper() as mapper: 
            res = mapper.find_all()
            return res

    
    #ListEntry:

    def get_all_listentries(self):
        with ListEntryMapper() as mapper:
            result = mapper.find_all()
            return result