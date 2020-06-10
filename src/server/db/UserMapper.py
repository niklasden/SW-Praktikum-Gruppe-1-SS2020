from server.bo.User import User
from server.db.Mapper import Mapper 

"""
Niklas und Julius
"""
class UserMapper(Mapper):
    def __init__(self): 
        super().__init__()

    def find_all(self):                     
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from User")
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
    
    """
    Julius
    """
    def find_by_name(self,name):
        pass 
    

    """
    Niklas - Noch nicht getestet
    """
    def find_by_key(self, key):
        result = None
        cursor = self._cnx.cursor()
        #Select Anweisung muss noch mit Werten aus DB angepasst werden
        command = "SELECT id, name, email, google_user_id FROM users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()
    
    try:
        (id, name, mail, firebase_id) = tuples[0]
        user = User()
        user.set_name(name)
        user.set_email(mail)
        user.set_firebase_id(firebase_id)
        result = user
    """Wenn Tupel leer, da kein Objekt mit dieser ID in DB /
        Führt zu IndexError, dann Ergebnis leer ergo nicht vorhanden
    """
    except IndexError:
        result = None
    
    self._cnx.commit()
    cursor.close()

    return result
    
    
    """
    Julius
    """
    def find_by_email(self,mail_adress):
        pass


    """
    Niklas
    """
    def find_by_firebase_id(self,firebase_id):
        pass 


    """
    Julius
    """
    def insert(self):
        pass
    
    """
    Niklas
    """
    def update(self):
        pass


    """
    Julius
    """
    def delete(self):  
        pass




"""
Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)