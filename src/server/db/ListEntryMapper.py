from server.bo.ListEntry import ListEntry
from server.db.Mapper import Mapper 

class ListEntryMapper(Mapper):
    """
    Mapper for ListEntry Data Structure
    Author: Pascal & Niklas
    """
    def __init__(self): 
        super().__init__()

    
    def find_all(self):
        """
        Niklas
        """                    
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought from `Listentry`")
        tuples = cursor.fetchall()
        print(tuples)
        try:
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                result.append(le)
                print(result)
        except IndexError:
                result = None

        self._cnx.commit()
        cursor.close()
        return result
    
    def find_by_name(self, name):
        """
        Pascal name:str
        """                    
        pass

    def find_by_key(self, key):
        """
        Niklas key:int
        """
        pass
    
    def find_by_retailer(self, retailer):
        """
        Pascal retailer:Retailer
        """
        pass

    def find_by_article(self, article):
        """
        Niklas article:Article
        """
        pass

    def find_by_purchaser(self, purchaser):
        """
        Pascal purchaser:User
        """
        pass

    def find_by_checkout(self, check):
        """
        Niklas check:bool
        """
        pass
    
    def find_by_date_of_purchase(self, date): 
        """
        Pascal date:Date
        """
        pass
    
    def insert(self, le):
        """
        Niklas le:ListEntry
        """
        pass
    
    def update(self, le):
        """
        Pascal le:ListEntry
        """
        pass

    def delete(self, le):
        """
        Niklas le:ListEntry
        """
        pass

"""
for test purposes only
"""
if (__name__ == "__main__"):
    with ListEntryMapper() as mapper:
        result = mapper.find_all()
        print(str(result))
        for i in result:
            print(str(i))
