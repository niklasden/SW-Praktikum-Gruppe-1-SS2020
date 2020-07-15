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
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought,creationdate from `Listentry`")
        tuples = cursor.fetchall()
        
        try:
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought,cd) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                le.set_creationdate(cd)
                result.append(le)
                
        except IndexError:
                result = None

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_key(self, key):
        """
        Niklas key:int
        """
        result = None
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought, creationdate from `Listentry` WHERE ID={}".format(key))
        tuples = cursor.fetchall()
        print(tuples)
        try:
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought, cd) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                le.set_creationdate(cd)
                result = le
                
        except IndexError:
                result = None

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_retailer(self, retailer):
        """
        Pascal retailer:Retailer
        """

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought,creationdate from `Listentry` WHERE Retailer_ID={}".format(retailer))
        tuples = cursor.fetchall()
        print(tuples)

        try: 
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought,cd) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                le.set_creationdate(cd)
                result.append(le)
                print(result)
        except IndexError:
                result = None
        self._cnx.commit()
        cursor.close()
        return result

    def find_by_article(self, article):
        """
        Niklas article:Article
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought,creationdate from `Listentry` WHERE Article_ID={}".format(article))
        tuples = cursor.fetchall()
        print(tuples)
        try:
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought,cd) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                le.set_creationdate(cd)
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
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought,creationdate from `Listentry` WHERE User_ID={}".format(purchaser))
        tuples = cursor.fetchall()
        print(tuples)

        try: 
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought,cd) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                le.set_creationdate(cd)
                result.append(le)
                print(result)
        except IndexError:
                result = None
        self._cnx.commit()
        cursor.close()
        return result

    def find_by_checkout(self, date):
        """
        Niklas check:bool - needs date format check on frontend
        tbd
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought,creationdate from `Listentry` WHERE bought={}".format(date))
        tuples = cursor.fetchall()
        print(tuples)
        try:
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought,cd) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                le.set_creationdate(cd)
                result.append(le), 
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
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought,creationdate from `Listentry` WHERE bought={}".format(date.get_bought))
        tuples = cursor.fetchall()
        print(tuples)

        try: 
            for (id, article_id, retailer_id, shoppinglist_id, user_id, group_id, amount, bought,cd) in tuples:
                le = ListEntry()
                le.set_id(id)
                le.set_article(article_id)
                le.set_retailer(retailer_id)
                le.set_shoppinglist(shoppinglist_id)
                le.set_user(user_id)
                le.set_group(group_id)
                le.set_amount(amount)
                le.set_buy_date(bought)
                le.set_creationdate(cd)
                result.append(le)
                print(result)
        except IndexError:
                result = None
        self._cnx.commit()
        cursor.close()
        return result
    
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

        command = "INSERT INTO `Listentry` (ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought,creationdate ) VALUES ({0}, {1}, {2}, {3}, {4}, {5}, {6}, null,NOW())".format(listentry.get_id(),listentry.get_article(),listentry.get_retailer(), listentry.get_shoppinglist(), listentry.get_user(), listentry.get_group(), listentry.get_amount())    
        
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
    
        le = ListEntry()
        le = self.find_by_key(listentry.get_id())

        if listentry.get_article() != "":
            le.set_article(listentry.get_article())
        if listentry.get_retailer() != "":
            le.set_retailer(listentry.get_retailer())
        if listentry.get_shoppinglist() != "":
            le.set_shoppinglist(listentry.get_shoppinglist())
        if listentry.get_user() != "":
            le.set_user(listentry.get_user())
        if listentry.get_group() != "":
            le.set_group(listentry.get_group())
        if listentry.get_amount() != "":
            le.set_amount(listentry.get_amount())
        if listentry.get_unit() != "":
            le.set_amount(listentry.get_unit())
        
        print(le)

        try:
            cursor = self._cnx.cursor()
            command = "UPDATE Listentry " + "SET Article_ID={0}, Retailer_ID={1}, Shoppinglist_ID={2}, User_ID={3}, Group_ID={4}, amount={5}, unit='{6}' WHERE ID={7}".format(le.get_article(), le.get_retailer(), le.get_shoppinglist(), le.get_user(), le.get_group(), le.get_amount(), le.get_unit(), le.get_id())
            print(command)
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return listentry

        except Exception as e:
            return "Error in update ListEntry ListEntryMapper: " + str(e)

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

    def get_personal_items_of_group(self, user_id, group_id):
        """
        Pascal
        """
        result = []
        cursor = self._cnx.cursor()
        print(user_id )
        print("group" + group_id)
        statement = "SELECT Listentry.ID, Article.name as 'name', Category.name as 'category', Listentry.amount, Listentry.unit, Listentry.User_ID, Retailer.name as 'retailer', Article.ID FROM Listentry LEFT JOIN Retailer ON Listentry.Retailer_ID = Retailer.ID LEFT JOIN Article ON Listentry.Article_ID = Article.ID LEFT JOIN Category ON Article.CategoryID = Category.ID WHERE (Group_ID={0}) AND (User_ID={1})".format(group_id, user_id)

        cursor.execute(statement)
        tuples = cursor.fetchall()
        
        for (id, name, category, amount, unit, user_id, retailer, article_id) in tuples:
            listentry = ListEntry()
            listentry.set_id(id)
            listentry.set_name(name)
            listentry.set_category(category)
            listentry.set_amount(amount)
            listentry.set_unit(unit)
            listentry.set_user(user_id)
            listentry.set_retailer(retailer)
            listentry.set_article(article_id)
            listentry.set_shoppinglist(None)
            listentry.set_group(group_id)
            result.append(listentry)

        self._cnx.commit()
        cursor.close()

        return result

    def get_items_of_group(self, group_id):
        """
        Niklas - items are unassigned
        """
        result = []
        cursor = self._cnx.cursor()
        statement = "SELECT Listentry.ID, Article.name as 'name', Category.name as 'category', Listentry.amount, Listentry.unit, Listentry.Shoppinglist_ID as 'shoppinglist_id', Listentry.User_ID as 'user_id', Retailer.name as 'retailer', Listentry.Group_ID as 'group', Listentry.Article_ID as 'article_id' FROM Listentry LEFT JOIN Retailer ON Listentry.Retailer_ID = Retailer.ID LEFT JOIN Article ON Listentry.Article_ID = Article.ID LEFT JOIN Category ON Article.CategoryID = Category.ID WHERE (Group_ID={0} AND User_ID IS NULL)".format(group_id)

        cursor.execute(statement)
        tuples = cursor.fetchall()
        
        for (id, name, category, amount, unit, shoppinglist_id, user_id, retailer, group, article_id) in tuples:
            listentry = ListEntry()
            listentry.set_id(id)
            listentry.set_name(name)
            listentry.set_category(category)
            listentry.set_amount(amount) 
            listentry.set_unit(unit)
            listentry.set_shoppinglist(shoppinglist_id)
            listentry.set_purchaser(user_id)
            listentry.set_retailer(retailer)
            listentry.set_group(group)
            listentry.set_article(article_id)
            result.append(listentry)

        self._cnx.commit()
        cursor.close()

        return result


"""
for test purposes only
"""
if (__name__ == "__main__"):
    with ListEntryMapper() as mapper:
        result = mapper.find_all()
        print(str(result))
        for i in result:
            print(str(i))
