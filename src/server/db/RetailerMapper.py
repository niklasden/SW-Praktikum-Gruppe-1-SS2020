from server.db.Mapper import Mapper
from server.bo.Retailer import Retailer

class RetailerMapper (Mapper):
    """
    Retailer mapper is used to execute database operations for retailer business objects
    @author Christopher Böhm
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Get all retailers from database

        :return A collection of retailer objects, which represents all retailers
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID, name, location,creationdate from Retailer")
        tuples = cursor.fetchall()

        for (id, name, location,cd) in tuples:
            retailer = Retailer()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_location(location)
            retailer.set_creationdate(cd)
            result.append(retailer)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """
        Search for a collection of retailers in database by provided retailer name

        :param name: name of retailer
        :return: A collection of retailer objects, which contains all retailers
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, location,creationdate FROM Retailer WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, location,cd) in tuples:
            retailer = Retailer()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_location(location)
            retailer.set_creationdate(cd)
            result.append(retailer)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Get all retailer data from database of a specific retailer by key

        :param key Primärschlüsselattribut (->DB)
        :return Retailer-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, location,creationdate FROM Retailer WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, location,cd) = tuples[0]
            retailer = Retailer()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_location(location)
            retailer.set_creationdate(cd)
            result = retailer
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, retailer):
        """
        Insert a new retailer to the database

        :param retailer: the retailer business object you want to save
        :return the retailer object you already provided, probably with changed data
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Retailer ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            retailer.set_id(maxid[0] + 1)

        command = "INSERT INTO Retailer (id, name, location,creationdate) VALUES (%s,%s,%s,NOW())"
        data = (retailer.get_id(), retailer.get_name(), retailer.get_location())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return retailer

    def update(self, retailer):
        """
        Overwrite a retailer object in database

        :param retailer: the retailer business object you want to overwrite in database
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
        """
        Delete a retailer in database

        :param retailer: business object you want to delete
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Retailer WHERE id={}".format(retailer.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

if (__name__ == "__main__"):
    with RetailerMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
