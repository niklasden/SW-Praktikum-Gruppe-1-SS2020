from server.db.Mapper import Mapper
from server.bo.ShoppingList import ShoppingList

""" A single ShoppingList
@author Christopher Böhm
"""
class ShoppingListMapper (Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """We don't need this function, but we need to implement it, so its just a pass"""
        pass

    def find_all_by_group_id(self, group_id):
        """Find all shopping lists of a specific group

          :return A collection of shopping list objects
          """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, name, Group_ID, creationdate from Shoppinglist WHERE Group_ID={}".format(group_id))
        tuples = cursor.fetchall()

        for (id, name, group_id, creationdate) in tuples:
            shoppingList = ShoppingList()
            shoppingList.set_id(id)
            shoppingList.set_name(name)
            shoppingList.set_group_id(group_id)
            shoppingList.set_creationdate(creationdate)
            result.append(shoppingList)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Find a shopping list objects by it's id in

        :param key primary key attribute of shopping list in database
        :return shopping list object. Returns None if there is no shopping list with the specified id
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, Group_ID, creationdate FROM Shoppinglist WHERE ID={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, group_id, creationdate) = tuples[0]
            shoppingList = ShoppingList()
            shoppingList.set_id(id)
            shoppingList.set_name(name)
            shoppingList.set_group_id(group_id)
            shoppingList.set_creationdate(creationdate)
            result = shoppingList
        except IndexError:
            """if tuples of cursor.fetchall() is empty we will get IndexError. In this case
            we didn't find the object with the key in database, result will be none then
            """
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, shopping_list):
        """Einfügen eines Retailer-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param shopping_list the object we want to save in database
        :return the shopping list object, maybe slightly altered
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Shoppinglist ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            shopping_list.set_id(maxid[0] + 1)

        command = "INSERT INTO Shoppinglist (ID, name, Group_ID, creationdate) VALUES (%s,%s,%s, NOW())"
        data = (shopping_list.get_id(), shopping_list.get_name(), shopping_list.get_group_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        self._insert_default_articles_to_shopping_list(shopping_list.get_id(),shopping_list.get_group_id())


        return shopping_list

    def _insert_default_articles_to_shopping_list(self, shopping_list_id,group_id):
        """
        @Author: Christopher Böhm
        @Julius
        :param shopping_list_id:
        :return:
        """
        cursor = self._cnx.cursor()

        cursor.execute("SELECT MAX(ID) AS maxid FROM Listentry ")
        tuples = cursor.fetchall()

        new_id = 1
        for (maxid) in tuples:
            new_id = maxid[0] 

        cursor.execute("SELECT ID,`Group_ID`,`Article_ID`,`amount`, `unit`,`Retailer_ID` FROM FavoriteArticle WHERE Group_ID={0}".format(group_id))
        tuples = cursor.fetchall()
        
        insertArticlesStatemenet = ""
        try:
            for (id,gid,article_id,amount,unit,retailer_id) in tuples:
                new_id +=1
                insertArticlesStatemenet = """ INSERT INTO Listentry (
                        ID, 
                        Article_ID, 
                        Retailer_ID, 
                        Shoppinglist_ID, 
                        User_ID, 
                        Group_ID, 
                        amount, 
                        unit, 
                        bought, 
                        creationdate
                    )
                    VALUES (
                        {0}, 
                        {1}, 
                        {2}, 
                        {3}, 
                        NULL, 
                        {4}, 
                        {5},  
                        '{6}', 
                        NULL, 
                        NOW()
                    );
                """.format(new_id, article_id, retailer_id,shopping_list_id,gid,amount,str(unit))
                
                cursor.execute(insertArticlesStatemenet)
                
        except IndexError:
            print("no favoritearticles")
        """ except Exception as e:
            print("error in _insert_default_articles_to_shopping_list" ,str(e))
         """
        self._cnx.commit()
        cursor.close()

    def update(self, shopping_list):
        """Overwriting the shopping list object in databse

        :param shopping_list the object that should be written to database
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Shoppinglist " + "SET name=%s, Group_ID=%s, modified_at=NOW() WHERE ID=%s"
        data = (shopping_list.get_name(), shopping_list.get_group_id(), shopping_list.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return shopping_list

    def delete(self, shopping_list):
        """Deleting a shopping list object from database

        :param shopping_list the shopping list object we want to delete
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Shoppinglist WHERE ID={}".format(shopping_list.get_id())
        # print(command)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_latest(self):
        cursor = self._cnx.cursor()
        result = []
        command = "SELECT MAX(id) FROM Shoppinglist"
        # print(command)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            for id in tuples:
                result.append(id)
        except IndexError:
            """if tuples of cursor.fetchall() is empty we will get IndexError. In this case
            we didn't find the object with the key in database, result will be none then
            """
            result = None
        self._cnx.commit()
        cursor.close()
        return result

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ShoppingListMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
