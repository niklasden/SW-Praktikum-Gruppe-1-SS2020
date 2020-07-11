#from .bo.User import User ... 
from .bo.User import User
from .bo.Group import Group
from .bo.ListEntry import ListEntry
#from .db.UserMapper import UserMapper ..
from .db.UserMapper import UserMapper
from .db.RetailerMapper import RetailerMapper
from .db.GroupMapper import GroupMapper
from .db.ListEntryMapper import ListEntryMapper
from .db.ReportGenerator import ReportGenerator


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

    # Retailer
    # Chris
    def get_retailer_by_name(self, name):
        with RetailerMapper() as mapper:
            res = mapper.find_by_name(name)
            return res

    def get_retailer_by_id(self, id):
        with RetailerMapper() as mapper:
            res = mapper.find_by_key(id)
            return res

    def create_retailer(self, retailer):
        with RetailerMapper() as mapper:
            return mapper.insert(retailer)

    def save_retailer(self, retailer):
        with RetailerMapper() as mapper:
            mapper.update(retailer)

    def delete_retailer(self, retailer):
        with RetailerMapper() as mapper:
            mapper.delete(retailer)

    def get_all_retailers(self):
        with RetailerMapper() as mapper:
            res = mapper.find_all()
            return res

    #Groups:
    #Julius 

    def get_all_groups(self):
        with GroupMapper() as mapper: 
            res = mapper.find_all()
            return res
    
    def get_group_by_id(self,id):
        with GroupMapper() as mapper:
            res = mapper.find_by_key(id)
            return res 

    def insert_group(self,group):
        with GroupMapper() as mapper:
                return mapper.insert(group)

    def save_group(self,group):
        with GroupMapper() as mapper: 
            return mapper.update(group)

    def delete_group(self, group):
        with GroupMapper() as mapper:
            res = mapper.delete(group)
            return res
    
    def create_group(self,name,description):
        group = Group(name,description)
        group.set_id(1)

        with GroupMapper() as mapper:
            return mapper.insert(group)


    #ListEntry:
    def get_all_listentries(self):
        with ListEntryMapper() as mapper:
            result = mapper.find_all()
            return result

    def find_by_name(self, name):
        with ListEntryMapper() as mapper:
            result = mapper.find_by_name()
            return result

    def find_by_key(self, key):
        with ListEntryMapper() as mapper:
            result = mapper.find_by_key(key)
            return result
    
    def find_by_retailer(self, retailer):
        with ListEntryMapper() as mapper:
            result = mapper.find_by_retailer(article)
            return result
    
    def find_by_article(self, article):
        with ListEntryMapper() as mapper:
            result = mapper.find_by_article(article)
            return result
    
    def find_by_purchaser(self, purchaser):
        with ListEntryMapper() as mapper:
            result = mapper.find_by_purchaser(purchaser)
            return result
    
    def find_by_checkout(self, date):
        with ListEntryMapper() as mapper:
            result = mapper.find_by_checkout(date)
            return result
    
    def find_by_date_of_purchase(self, date):
        with ListEntryMapper() as mapper:
            result = mapper.find_by_date_of_purchase(date)
            return result
    
    #noch nicht fertig
    def insert(self, ):
        listentry = ListEntry()
        listentry.set_id(1)

        with ListEntryMapper() as mapper:
            result = mapper.insert(listentry)
            return result
    
    def update(self, listentry):
        with ListEntryMapper() as mapper:
            result = mapper.update()
            return result
    
    def delete(self, listentry):
        with ListEntryMapper() as mapper:
            result = mapper.delete()
            return result
            
    def get_report_entries(self, group_id = 1):
        with ReportGenerator() as generator:
            result = generator.get_report(group_id)
            return result