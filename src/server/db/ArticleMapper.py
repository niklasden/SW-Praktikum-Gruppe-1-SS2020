from server.db.Mapper import Mapper
from server.bo.Article import Article

"""
@author Pia Schmid
"""
class ArticleMapper (Mapper):
    """"mapper-class, that maps article-object to a relational database. 
    For this purpose, a number of methods are provided, which can be used 
    e.g. to search for, create, modify and delete objects. 
    The mapping is bidirectional. This means that objects can be converted 
    into DB structures and DB structures into objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """get all articles

        :return A collection of article objects that represent all articles in the system. 
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Article.ID, Article.name, Article.creationdate, Category.name from Article LEFT JOIN Category ON Article.CategoryID = Category.ID"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, cd,category_name) in tuples: 
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_category(category_name)
            article.set_creationdate(cd)
            
            result.append(article)

        self._cnx.commit()
        cursor.close()
        
        return result


    def find_by_name(self, name):
        """get all articles according to the article name. 
        :param name Name of the correspondeing article
        :return A collection of article objects containing all articles with the desired name. 
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, `CategoryID`,`creationdate` FROM Article WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, category,cd) in tuples: 
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_category(category)
            article.set_creationdate(cd)
            result.append(article)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_key(self, key):
        """get an article with a given article ID. Since this is unique, exacly one object is returned. 

        :para key Primary key attribute (->DB)
        :return Article-object, that corresponds to the passed key, None if the DB tuple does not exist. 
        """

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, name, `CategoryID`,creationdate FROM Article WHERE id = {}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try: 
            (id, name, category,cd ) = tuples [0]
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_category(category)
            article.set_creationdate(cd)
            result = article
        except IndexError:
            """The IndexError will occur above when accessing tuples[0] if the previous SELECT call 
            does not return a tuple but tuples = cursor.fetchall() returns an empty sequence."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, article):
        """Inserting an article object into the database.
        The primary key of the transferred object is also checked and corrected if necessary.  

        :param article The object to be stored
        :return The object already passed, but with a corrected ID if necessary 
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Article")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            article.set_id(maxid[0]+1)
        print("here" ,article)
        #command = "INSERT INTO `Article` (`ID`, `name`, `CategoryID`) VALUES ('{0}', '{1}', '{2}')".format(article.get_id(),article.get_name(),article.get_category())
        command = "INSERT INTO Article (id, name, CategoryID,`creationdate`) VALUES (%s, %s, %s,NOW())"
        data = (article.get_id(), article.get_name(), article.get_category())
        cursor.execute(command, data) #data

        self._cnx.commit()
        cursor.close()

        return article

    def update(self, article):
        """Repeated writing of an object to the database.  
        :param article The object to be written to the DB. 
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Article " + "SET name=%s, CategoryID=%s WHERE id=%s"
        data = (article.get_name(), article.get_category(), article.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, article):
        """Delete the data of an article object from the database. 
        :param article The "object" to be deleted from the DB. 
        """
        try: 
            cursor = self._cnx.cursor()
            command = "DELETE FROM Article WHERE id={}".format(article.get_id())
            cursor.execute(command)

            self._cnx.commit()
            cursor.close()

            return "Article deleted"

        except Exception as e:
            return "Error in delet Article ArticleMapper:" + str(e)

"""For test purposes we can also execute this file if necessary to check the basic function. 

Note: Not professional but helpful..."""
if (__name__ == "__main__"):
    with ArticleMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
