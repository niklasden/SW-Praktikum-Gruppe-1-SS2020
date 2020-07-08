from server.bo.User import User
from server.db.Mapper import Mapper 

    """
    Mapper for ListEntry Data Structure
    Author: Pascal & Niklas
    """


class ListEntryMapper(Mapper):
    def __init__(self): 
        super().__init__()

    
    def find_all(self):
        """
        Niklas
        """                    
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from ListEntry")
        tuples = cursor.fetchall()
                
        for (id, mail, firebase_id, name) in tuples:
            user = User()
            user.set_id(id)
            user.set_email(mail)
            user.set_firebase_id(firebase_id)
            user.set_name(name)
            result.append(user)
        
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
    
    def insert(self, le):
        """
        Niklas le:ListEntry
        """
    
    def update(self, le):
        """
        Pascal le:ListEntry
        """
    
    def delete(self, le):
        """
        Niklas le:ListEntry
        """
    

"""
for test purposes only
"""
if (__name__ == "__main__"):
    with ListEntryMapper() as mapper:
        result = mapper.find_all()
        print(str(result))
        for i in result:
            print(str(i))
