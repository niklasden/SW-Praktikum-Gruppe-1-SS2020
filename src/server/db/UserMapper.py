from server.bo.User import User
from server.db.Mapper import Mapper 


class UserMapper(Mapper):
    def __init__(self): 
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from User")
        tuples = cursor.fetchall()
        print(tuples)
        """
        for (id, name, mail, user_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(mail)
            user.set_user_id(user_id)
            result.append(user)
        """
        self._cnx.commit()
        cursor.close()

        return tuples


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
