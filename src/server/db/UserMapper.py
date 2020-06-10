from server.bo.User import User
from server.db.Mapper import Mapper 


class UserMapper(Mapper):
    def __init__(self): 
        super().__init__()

    
    def find_all(self):
        """
        Niklas und Julius
        """                    
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
    
    
    def find_by_name(self,name):
        """
        Julius
        """
        res = []
        cursor = self._cnx.cursor()
        cursor.execute(r"SELECT ID,'e-mail','firebase-id', name FROM User WHERE name LIKE '{0}' ORDER BY name".format(name))   
        tuples = cursor.fetchall()

        for (id, mail, firebase_id, name) in tuples:
                user = User()
                user.set_id(id)
                user.set_email(mail)
                user.set_firebase_id(firebase_id)
                user.set_name(name)
                res.append(user)

        self._cnx.commit()
        cursor.close()
        return res
        

    
    def find_by_key(self):
        """
        Niklas
        """
        pass
    

    
    def find_by_email(self,mail_adress):
        """
        Julius
        """
        res = None
        cursor = self._cnx.cursor()
        cursor.execute(r"SELECT ID, `e-mail`,`firebase-id`, name FROM User WHERE `e-mail` LIKE '{0}' ORDER BY name".format(mail_adress))  
        tuples = cursor.fetchall()
        
        try:
            (id, mail, firebase_id, name) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_email(mail)
            user.set_firebase_id(firebase_id)
            user.set_name(name)
            res = user
        
            self._cnx.commit()
            cursor.close() 
            return res

        except Exception as e:
            print(e)
            return res
        
        
    
    def find_by_firebase_id(self,firebase_id):
        """
        Niklas
        """
        pass 


    
    def insert(self,user):
        """
        Julius
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM User")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            """
            tuples looks like [(1,)]
            """
            if maxid[0]:
                """
                if max id exists, adding +1 to it
                """
                user.set_id(maxid[0] + 1)
            else:
                """
                if no max id returns from the db, setting it to 1
                """
                user.set_id(1)
        
        command = "INSERT INTO User (ID, `e-mail`, `firebase-id` , name) VALUES('{0}','{1}','{2}','{3}')".format(user.get_id(),user.get_email(),user.get_firebase_id(),user.get_name())
        try:
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return user

        except Exception as e:
            cursor.close()
            return "Error: "+str(e)
            


    def update(self):
        """
        Niklas
        """
        pass


    
    def delete(self, user):
        """
        Julius
        """
        usrstring = str(user)
        try:
            cursor = self._cnx.cursor()
            command = "DELETE FROM User WHERE ID={0}".format(user.get_id())
            cursor.execute(command)

            self._cnx.commit()
            cursor.close()

            return "deleted "+ usrstring

        except Exception as e:
            print(e)
            return None
            
"""
for test purposes only
"""
if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_all()
        print(str(result))
        for i in result:
            print(str(i))