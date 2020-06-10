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
    Niklas
    """
    def find_by_key(self):
        pass
    

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