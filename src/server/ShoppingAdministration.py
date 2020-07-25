#from .bo.User import User ... 
from .bo.User import User
from .bo.Article import Article

from .db.ArticleMapper import ArticleMapper
from .bo.Group import Group
from .bo.ListEntry import ListEntry
from .bo.FavoriteArticle import FavoriteArticle
#from .db.UserMapper import UserMapper ..
from .db.UserMapper import UserMapper
from .db.RetailerMapper import RetailerMapper
from .db.GroupMapper import GroupMapper
from .db.ListEntryMapper import ListEntryMapper
from .db.ReportGenerator import ReportGenerator
from .db.FavoriteArticleMapper import FavoriteArticleMapper as fam
from .db.ShoppingListMapper import ShoppingListMapper

#hier müssen BO Klassen & Mapper importiert werden
class ShoppingAdministration (object):
    """
    This class aggregates almost everyting of the business logic :)
    """
    def __init__(self):
        pass

    """User specific methods"""
    def create_user(self, name, email, firebase_id):
        """Creates an user bo """
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_firebase_id(firebase_id)
        user.set_id(1)

        with UserMapper() as mapper:
                return mapper.insert(user)
    
    def insert_user(self,user):
        """inserts an user into the db"""
        with UserMapper() as mapper:
                return mapper.insert(user)

    def get_user_by_name(self, name):
        """returns all users with given name"""
        with UserMapper() as mapper:
            return mapper.find_by_name(name)
    
    def get_user_by_id(self, key):
        """returns user with given id"""
        with UserMapper() as mapper:
            return mapper.find_by_key(key)

    def get_user_by_email(self, email):
        """returns all user with given email"""
        with UserMapper() as mapper:
            return mapper.find_by_email(email)
    
    def get_user_by_firebase_id(self, id):
        """returns user with given firebase id"""
        with UserMapper() as mapper:
            return mapper.find_by_firebase_id(id)
    
    def get_all_user(self):
        """returns all user in db"""
        with UserMapper() as mapper:
            return mapper.find_all()
    
    def save_user(self, user):
        """updates an user in db"""
        with UserMapper() as mapper:
            mapper.update(user)
    
    def delete_user(self, user):
        """deletes an user from db"""
        with UserMapper() as mapper:
            res = mapper.delete(user)
            return res


    # Retailer
    # Chris
    def get_retailer_by_name(self, name):
        # returns all Retailers with this name
        with RetailerMapper() as mapper:
            res = mapper.find_by_name(name)
            return res

    def get_retailer_by_id(self, id):
        """ returns a retailer with this unique id"""
        with RetailerMapper() as mapper:
            res = mapper.find_by_key(id)
            return res

    def create_retailer(self, retailer):
       """  creates an retailer  """
        with RetailerMapper() as mapper:
            return mapper.insert(retailer)

    def save_retailer(self, retailer):
        """  updates the retailer  """
        with RetailerMapper() as mapper:
            mapper.update(retailer)

    def delete_retailer(self, retailer):
        """  delets an retailer """
        with RetailerMapper() as mapper:
            try:
                #for every ListEntry in db, sets retailer to null 
                with ListEntryMapper() as lemapper:
                    lemapper.set_retailer_to_null(retailer)

            except Exception as e:
                print(str(e))
            
            mapper.delete(retailer)

    def get_all_retailers(self):
        """  returns all existing retailers  """
        with RetailerMapper() as mapper:
            res = mapper.find_all()
            return res

    #Groups:
    #Julius 
    def get_all_groups(self):
        """returns all groups from db"""
        with GroupMapper() as mapper: 
            res = mapper.find_all()
            return res
    def get_all_user_groups(self,uid):
        """returns all groups for one user"""
        with GroupMapper() as mapper: 
            return mapper.find_all_by_userid(uid)
    def get_group_by_id(self,id):
        with GroupMapper() as mapper:
            res = mapper.find_by_key(id)
            return res 

    def insert_group(self,group):
        """insert group in db"""
        with GroupMapper() as mapper:
                return mapper.insert(group)

    def save_group(self,group):
        """update group in db"""
        with GroupMapper() as mapper: 
            return mapper.update(group)

    def delete_group(self, group):
        """delete group from db. first deletes all shoppinglists, favArticles and users connected to the group"""
        with GroupMapper() as mapper:
            
            shoppinglists = self.get_shoppinglists_by_group_id(group.get_id())
            favArticles = self.get_FavoriteArticles_by_groupid(group.get_id())
            users = self.get_users_by_groupid(group.get_id())

            try:
                #delete all memberships
                if len(users) > 0:
                    for i in users:
                        self.delete_membership(i.get_id(),group.get_id(),outercall=True)

                # delete all shopping_lists:
                for i in shoppinglists:
                    self.delete_shoppinglist(i)
                
                #delete all favoriteArticles:
                for i in favArticles:
                    self.delete_FavoriteArticle(i)

            except Exception as e:
                print("Error in delete_group in ShoppingAdmin: "+str(e))
                res = "Error in delete_group in ShoppingAdmin: "+str(e)
            
            try:
                res = mapper.delete(group)
            except Exception as e:
                res = str(e) + " error in del group"
            
            return res
    
    def create_group(self,name,description,creationdate):
        """creates a group with given parameters and inserts it into db"""
        group = Group(name,description,creationdate)
        group.set_id(1)

        with GroupMapper() as mapper:
            return mapper.insert(group)

    #ListEntry Pascal & Niklas:
    def get_all_listentries(self):
        """ returns all existing Listentrys """ 
        with ListEntryMapper() as mapper:
            result = mapper.find_all()
            return result

    def find_listentry_by_name(self, name):
        """ return the Listentry with an specific article name """
        with ListEntryMapper() as mapper:
            result = mapper.find_by_name()
            return result

    def find_listentry_by_key(self, key):
        """ returns an listentry with the passed id  """
        with ListEntryMapper() as mapper:
            result = mapper.find_by_key(key)
            return result
    
    def find_listentry_by_retailer(self, retailer):
        """ returns an listentry with the passed retailer id  """
        with ListEntryMapper() as mapper:
            result = mapper.find_by_retailer(retailer)
            return result
    
    def find_listentry_by_article(self, article):
        """ returns an listentry with the passed article id  """
        with ListEntryMapper() as mapper:
            result = mapper.find_by_article(article)
            return result
    
    def find_listentry_by_purchaser(self, purchaser):
        """ returns an listentry with the passed purchaser id  """
        with ListEntryMapper() as mapper:
            result = mapper.find_by_purchaser(purchaser)
            return result
    
    def find_listentry_by_date_of_purchase(self, date):
        """ returns all listentrys which were bought on this date """
        with ListEntryMapper() as mapper:
            result = mapper.find_by_date_of_purchase(date)
            return result
    
    def get_personal_items_of_group(self, group_id, user_id):
        """ returns all listentrys which are assigned to the specific user_id and gropu_id """
        with ListEntryMapper() as mapper:
            result = mapper.get_personal_items_of_group(group_id, user_id)
            return result
    
    def insert_listentry(self, listentry):
        """ creates an new listentry """
        with ListEntryMapper() as mapper:
            result = mapper.insert(listentry)
            return result
    
    def update_listentry(self, listentry):
        """ update an exisiting listentry """
        with ListEntryMapper() as mapper:
            result = mapper.update(listentry)
            return result
    
    def delete_listentry(self, listentry):
        """ delete an exisiting listentry """
        with ListEntryMapper() as mapper:
            result = mapper.delete(listentry)
            return result
    
    def get_items_of_group(self, group_id, shoppinglist_id):
        """ returns all listentrys which are assigned to a specific group id and shoppinglist id """
        with ListEntryMapper() as mapper:
            result = mapper.get_items_of_group(group_id, shoppinglist_id)
            return result
            
    #Report Kevin
    def get_report_entries(self, group_id = 1):
         """  returns all reportentrie with the given group id"""
        with ReportGenerator() as generator:
            result = generator.get_report(group_id)
            return result

    def get_top3Articles(self, group_id = 1):
         """  returns the top 3 articles """
        with ReportGenerator() as generator:
            result = generator.get_top3_retailer(group_id)
            return result
    #Article:
    #Pia
    def get_all_article(self):
        """ returns all existing articles """
        with ArticleMapper() as mapper:
            result = mapper.find_all()
            return result

    def get_article_by_id(self, id):
        """ returns article with given id"""
        with ArticleMapper() as mapper:
            result = mapper.find_by_key(id)
            return result

    def get_article_by_name(self, name):
        """ returns article with given name"""
        with ArticleMapper() as mapper:
            result = mapper.find_by_name(name)
            return result
    
    '''
    def create_article(self, name, category):
        article = Article()
        article.set_name(name)
        article.set_category(category)
        article.set_id(1)
        with ArticleMapper() as mapper:
            return mapper.insert(article)
    '''

    def delete_article(self, article):
        """ deletes an article"""
        with ArticleMapper() as mapper:
            result = mapper.delete(article)
            return result

    def save_article(self, article):
        """ updates an article"""
        with ArticleMapper() as mapper:
            return mapper.update(article)


    def create_article(self, article):
        """ creates an article"""
        with ArticleMapper() as mapper:
            return mapper.insert(article)


    # membership

    def create_membership(self,uid,gid):
        """ creates an membership """
        with GroupMapper() as mapper:
            return mapper.createMembership(uid,gid)

    def delete_membership(self,uid,gid, outercall=False):
        """ deletes an memberhship """
        with GroupMapper() as mapper:
            a = mapper.deleteMembership(uid,gid)
            if outercall == False:
                if len(self.get_users_by_groupid(gid)) < 1:
                    g = self.get_group_by_id(gid)
                    self.delete_group(g)
                    print("deleted group {0} because there are no memberships left".format(str(g)))
            return a
    
    def get_users_by_groupid(self,gid):
        """ returns all users of a group """
        with GroupMapper() as mapper :
            userids = mapper.get_users_by_gid(gid)
            result = []
            
            #creating user objects from ids
            for i in userids: 
                r = self.get_user_by_id(i)
                result.append(r)
            return result

    # ShoppingList Chris/Julius
    def get_shoppinglists_by_group_id(self, group_id):
         """  returns all shoppinglists with the given group id """
        with ShoppingListMapper() as mapper:
            return mapper.find_all_by_group_id(group_id)

    def delete_shoppinglist(self, shopping_list):
        """deletes shoppinglist from db. First deletes all listentries connected to this shoppinglist"""
        with ShoppingListMapper() as mapper:
            
            #delete all listentries in Shoppinglist
            listentries = self.get_items_of_group(shopping_list.get_group_id(),shopping_list.get_id())
            try:
                for i in listentries:
                    self.delete_listentry(i)
                
                #delete shopping list
                return mapper.delete(shopping_list)
            
            except Exception as e:
                print("error in delete shopping list in adm: " +  str(e))
                return "error in delete shopping list in adm: " +  str(e)
   

    def insert_shoppinglist(self, shopping_list):
        """ creates a new shoppingslist  """
        with ShoppingListMapper() as mapper:
            return mapper.insert(shopping_list)

    def update_shoppinglist(self, shopping_list):
        """ update a existing shoppinglist """
        with ShoppingListMapper() as mapper:
            return mapper.update(shopping_list)

    def get_shoppinglist_by_id(self, list_id):
       """  returns the shoppinglist with the given id  """
        with ShoppingListMapper() as mapper: 
            return mapper.find_by_key(list_id)

    def get_shoppinglists(self):
        """ returns all shoppinglists """
        with ShoppingListMapper() as mapper: 
            return mapper.find_latest()


#FavoriteArticle 
    def get_all_FavoriteArticles(self):
        """ returns all exisiting favorite articels """
        with fam() as mapper:
            return mapper.find_all()

    def get_FavoriteArticle_by_id(self,id):
       """  returns all existing favorite articels with the given id """
        with fam() as mapper:
            return mapper.find_by_key(id)
            
    def get_FavoriteArticles_by_groupid(self,gid):
         """  returns all existing favorite articels with the given group id """
        with fam() as mapper:
            return mapper.find_by_group(gid)
    
    def insert_FavoriteArticle(self,fa):
        """inserts a new favorite article into db"""
        with fam() as mapper:
            return mapper.insert(fa)

    def update_FavoriteArticle(self,fa):
        """updates a favorite article in db"""
        with fam() as mapper:
            return mapper.update(fa)
    
    def delete_FavoriteArticle(self,fa):
         """  delets an existing favorite articel with the given id """
        with fam() as mapper:
            return mapper.delete(fa)
