from server.db.Mapper import Mapper
from server.bo.Article import Article

""" A single Article
@author Pia Schmid
"""
class ArticleMapper (Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Articel.

        :return Eine Sammlung mit Article-Objekten, die sämtliche Artikel des Systems repräsentieren. 
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from Article"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, category_id) in tuples: 
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_category(category_id)
            result.append(article)

        self._cnx.commit()
        cursor.close()
        
        return result


    def find_by_name(self, name):
        """Auslesen aller Artikel anhand des Artikelnames. 
        :param name Name des zugehörigen Artikel
        :return Ein Sammlung mit Article-Objekten, die sämtliche Artikel mit dem gewünschten Namen enthält.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, `CategoryID` FROM Article WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, category) in tuples: 
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_category(category)
            result.append(article)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_key(self, key):
        """Suchen eines Artikels mit vorgegebener Article ID. Da diese eindeutig ist, wird genau ein Objekt zurückgegeben.

        :para key Primärschlüsselattribut (->DB)
        :return Article-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tuple.
        """

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, name, `CategoryID` FROM Article WHERE id = {}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try: 
            (id, name, category) = tuples [0]
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_category(category)
            result = article
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, article):
        """Einfügen eines Article-Objekts in die Datenbank.
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf. berichtigt.

        :param article das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigirter ID
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Article")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            article.set_id(maxid[0]+1)

        command = ""
        data = (actricle.get_id(), article.get_name(), article.get_category())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return article

    def update(self, article):
        """Wiederholtes Schreiben eines Objekts in die Datenbank. 
        :param article das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Article " + "SET name=%s, category=%s WHERE id=%s"
        data = (article.get_id(), article.get_name(), article.get_category())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, article):
        """Löschen des Daten eines Article-Objekts aus der Datenbank.
        :param: article das aus der DB zu löschende "Objekt"
        """
        try: 
            cursor = self._cnx.cursor()
            command = "DELETE FROM Article WHERE id={}".format(article.get_id())
            cursor.exevute(command)

            self._cnx.commit()
            cursor.close()

            return "Article deleted"

        except Exception as e:
            return "Error in delet Article ArticleMapper:" + str(e)

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ArticleMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
