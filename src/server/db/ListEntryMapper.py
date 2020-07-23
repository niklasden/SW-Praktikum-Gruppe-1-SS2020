from server.bo.ListEntry import ListEntry
from server.db.Mapper import Mapper 
import datetime

class ListEntryMapper(Mapper):
    """
    Mapper for ListEntry BusinessObject
    Author: Pascal & Niklas
    """
    def __init__(self): 
        super().__init__()

    
    def find_all(self):
        """
        Niklas
        get all listentries from the database
        :return: a list of listentry bos
        
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
        gets the specific listentry with that specific from the database
        :return: a single listentry bo
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
        get a specific listentry by its retailer from the database
        :return: a single listentry bo
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
        get a list of listentries with that specific article id from the database
        :return: a list of listentry bos
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
        gets a list of listentry bos by the assigned user id from the database
        :return: a list of listentry bos
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

    #can be deleted see row 210 redundant?
    def find_by_checkout(self, date):
        
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
        inserts a listentry into the database
        :return: a single listentry bo
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM `Listentry`")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            if maxid[0]:
                listentry.set_id(maxid[0]+1)
            else:
                listentry.set_id(1)
            
        
        if listentry.get_retailer() is None:
            listentry.set_retailer('NULL')
        else:
            listentry.set_retailer(listentry.get_retailer())

        if listentry.get_amount() is None:
            listentry.set_amount('NULL')
        else:
            listentry.set_amount(listentry.get_amount())

        if listentry.get_buy_date() is None:
            listentry.set_buy_date('NULL')
        else: 
            listentry.set_buy_date(listentry.get_buy_date())
        
        if listentry.get_user() is None:
            listentry.set_user('NULL')
        else:
            listentry.set_user(listentry.get_user())

        if listentry.get_group() is None:
            listentry.set_group('NULL')
        else:
            listentry.set_group(listentry.get_group())

        if listentry.get_unit() is None:
            listentry.set_unit('NULL')
        else: 
            listentry.set_unit(listentry.get_unit())


        command = "INSERT INTO `Listentry` (ID, Article_ID, Retailer_ID, Shoppinglist_ID, User_ID, Group_ID, amount, bought, creationdate, unit ) VALUES ({0}, {1}, {2}, {3}, {4}, {5}, {6}, NULL, NOW(), '{7}')".format(listentry.get_id(),listentry.get_article(),listentry.get_retailer(), listentry.get_shoppinglist(), listentry.get_user(), listentry.get_group(), listentry.get_amount(), listentry.get_unit())    
    
        try: 
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return listentry

        except Exception as e:
            cursor.close()
            print(str(e))
            return "Error in ListEntryMapper while inserting: "+str(e)
    
    def update(self, listentry):
        """
        Pascal le:ListEntry
        Niklas 
        updates an existing listentry in the database
        if it does not exist a new one is created
        :return: a single listentry bo
        """
    
        le = ListEntry()
        le = self.find_by_key(listentry.get_id())

        if listentry.get_article() != "" and listentry.get_article() is not None:
            le.set_article(listentry.get_article())
        if listentry.get_retailer() != "" and listentry.get_retailer() is not None:
            le.set_retailer(listentry.get_retailer())
        if listentry.get_shoppinglist() != "" and listentry.get_shoppinglist() is not None:
            le.set_shoppinglist(listentry.get_shoppinglist())
        if listentry.get_user() != "" or listentry.get_user() is not None:
            le.set_user(listentry.get_user())  
        if listentry.get_group() != "" or listentry.get_group() is not None:
            le.set_group(listentry.get_group())
        if listentry.get_amount() != "" or listentry.get_amount() is not None:
            le.set_amount(listentry.get_amount())
        if listentry.get_unit() != "" or listentry.get_unit() is not None:
            le.set_unit(listentry.get_unit())
        if listentry.get_buy_date() != "" and listentry.get_buy_date() is not None:
            le.set_buy_date(listentry.get_buy_date())
       

        try:
            cursor = self._cnx.cursor()
        
            if le.get_unit() is None:
                unit = "NULL"
            else:
                unit = "'" + le.get_unit() + "'"
        
            if le.get_retailer() is None:
                retailer = 'NULL'
            else:
                retailer =  le.get_retailer()
            
            if le.get_amount() is None:
                amount = 'NULL'
            else:
                amount = le.get_amount()
            
            if le.get_shoppinglist() is None:
                shoppinglist = "NULL"
            else:
                shoppinglist =  le.get_shoppinglist()
            
            if le.get_user() is None:
                user = 'NULL'
            else:
                user = le.get_user()
            
            if le.get_buy_date() is None:
                buydate = 'NULL'
            else:
                date = datetime.date.today()
                buydate = "'"+date.strftime("%Y/%m/%d")+"'"
                
            
            command = """UPDATE Listentry SET Article_ID={0}, Retailer_ID={1}, Shoppinglist_ID={2}, User_ID={3}, Group_ID={4}, amount={5}, unit={6}, bought={7} WHERE ID={8}""".format(le.get_article(), retailer, shoppinglist, user, le.get_group(), amount, unit, buydate, le.get_id())
            print(command)
                
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return listentry

        except Exception as e:
            print(str(e))
            return "Error in update ListEntry ListEntryMapper: " + str(e)
           

    def delete(self, listentry):
        """
        Niklas le:ListEntry
        delets a specific listentry  from the database
        :return: a str which tells the frontend that the listentry was deleted
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
        gets all assigned listentries from the database for a specific user id, group id combination
        :return: a list of listentry bos
        """
        result = []
        cursor = self._cnx.cursor()
        statement = "SELECT Listentry.ID, Article.name as 'name', Category.name as 'category', Listentry.amount, Listentry.unit, Listentry.User_ID, Retailer.name as 'retailer', Article.ID FROM Listentry LEFT JOIN Retailer ON Listentry.Retailer_ID = Retailer.ID LEFT JOIN Article ON Listentry.Article_ID = Article.ID LEFT JOIN Category ON Article.CategoryID = Category.ID WHERE (Group_ID={0}) AND (User_ID={1} AND (bought is NULL))".format(group_id, user_id)

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

    def get_items_of_group(self, group_id, shoppinglist_id):
        """
        Niklas - 
        gets all listentries from the database for a specific group id, shoppinglist idcombination
        :return: a list of listentry bos
        """
        result = []
        cursor = self._cnx.cursor()
        statement = "SELECT Listentry.ID, Article.name as 'name', Category.name as 'category', Listentry.amount, Listentry.unit, Listentry.Retailer_ID, Listentry.Shoppinglist_ID as 'shoppinglist_id', Listentry.User_ID as 'user_id', Retailer.name as 'retailer', Listentry.Group_ID as 'group_id', Listentry.Article_ID as 'article_id' FROM Listentry LEFT JOIN Retailer ON Listentry.Retailer_ID = Retailer.ID LEFT JOIN Article ON Listentry.Article_ID = Article.ID LEFT JOIN Category ON Article.CategoryID = Category.ID WHERE (Group_ID={0} AND Shoppinglist_ID={1} AND (bought is NULL))".format(group_id, shoppinglist_id)

        cursor.execute(statement)
        tuples = cursor.fetchall()
        
        for (id, name, category, amount, unit,retailer_id, shoppinglist_id, user_id, retailer, group_id, article_id) in tuples:
            listentry = ListEntry()
            listentry.set_id(id)
            listentry.set_name(name)
            listentry.set_category(category)
            listentry.set_amount(amount) 
            listentry.set_unit(unit)
            listentry.set_retailer_id(retailer_id)
            listentry.set_shoppinglist(shoppinglist_id)
            listentry.set_purchaser(user_id)
            listentry.set_retailer(retailer)
            listentry.set_group(group_id)
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
