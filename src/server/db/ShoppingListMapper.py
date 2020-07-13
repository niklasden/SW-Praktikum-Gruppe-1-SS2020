from server.db.Mapper import Mapper
from server.bo.ShoppingLIst import ShoppingList

""" A single Retailer
@author Christopher Böhm
"""
class ShoppingListMapper (Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Einzelhändler.

          :return Eine Sammlung mit Retailer-Objekten, die sämtliche Einzelhändler
                  repräsentieren.
          """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, name, Group_ID from Shoppinglist")
        tuples = cursor.fetchall()

        for (id, name, group_id) in tuples:
            shoppingList = ShoppingList()
            shoppingList.set_id(id)
            shoppingList.set_name(name)
            shoppingList.set_group_id(group_id)
            result.append(shoppingList)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen eines Retailers mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Retailer-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, location FROM Retailer WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, location) = tuples[0]
            retailer = ShoppingList()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_group_id(location)
            result = retailer
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_location(self, location):
        """
        :param location: Addresse des Einzelhändlers
        :return: A collection of Retailer-Objects, which contains all Retailers
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, location FROM Retailer WHERE location LIKE '{}' ORDER BY name".format(location)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, location) in tuples:
            retailer = Retailer()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_location(location)
            result.append(retailer)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, retailer):
        """Einfügen eines Retailer-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param retailer das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Retailer ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            retailer.set_id(maxid[0] + 1)

        command = "INSERT INTO Retailer (id, name, location) VALUES (%s,%s,%s)"
        data = (retailer.get_id(), retailer.get_name(), retailer.get_location())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return retailer

    def update(self, retailer):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param retailer das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Retailer " + "SET name=%s, location=%s WHERE id=%s"
        data = (retailer.get_name(), retailer.get_location(), retailer.get_id())
        print('Command, ', command)
        print('Data: ', data)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, retailer):
        """Löschen der Daten eines Retailer-Objekts aus der Datenbank.

        :param retailer das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Retailer WHERE id={}".format(retailer.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with RetailerMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
