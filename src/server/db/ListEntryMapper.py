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
        Pascal name:str - ListEntry hat kein Name? :D
        """                    
        pass

    def find_by_key(self, key):
        """
        Niklas key:int
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought from `Listentry` WHERE ID={}".format(key))
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
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought from `Listentry` WHERE Article_ID={}".format(article))
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
        

    def find_by_purchaser(self, purchaser):
        """
        Pascal purchaser:User
        """
        pass

    def find_by_checkout(self, date):
        """
        Niklas check:bool - needs date format check on frontend
        tbd
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought from `Listentry` WHERE Article_ID={}".format(date))
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
        
    
    def find_by_date_of_purchase(self, date): 
        """
        Pascal date:Date
        """
        pass
    
    def insert(self, listentry):
        """
        Niklas le:ListEntry
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM `Listentry`")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            if maxid[0]:
                listentry.set_id(maxid[0]+1)
            else:
                listentry.set_id(1)

        command = "INSERT INTO `Listentry` (ID, Article_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought ) VALUES ('{0}', '{1}', '{2}')".format(listentry.get_id(),listentry.get_article(),listentry.get_name(), listentry.get_user(), listentry.get_group(), listentry.get_amount(), listentry.get_bought())
               
        try:
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return listentry

        except Exception as e:
            cursor.close()
            return "Error in ListEntryMapper while inserting: "+str(e)
    
    def update(self, listentry):
        """
        Pascal le:ListEntry
        """
        pass

    def delete(self, listentry):
        """
        Niklas le:ListEntry
        """
        try:
            cursor = self._cnx.cursor()
            command = "DELETE FROM `Listentry` WHERE ID={0}".format(listentry.get_id())
            cursor.execute(command)

            self._cnx.commit()
            cursor.close()

            return "ListEntry deleted"

        except Exception as e:
            return "Error in delete ListEntry ListEntryMapper: " + str(e)

"""
for test purposes only
"""
if (__name__ == "__main__"):
    with ListEntryMapper() as mapper:
        result = mapper.find_all()
        print(str(result))
        for i in result:
            print(str(i))
