from server.bo.Group import Group
from server.db.Mapper import Mapper

class GrouMapper(Mapper):
    """
    Author: Julius
    """
    def __init__(self):
        super().__init__()
    
    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        statement = ""
        cursor.execute(statement)

        tuples = cursor.fetchall()

        #hier ist das problem, dass in der db noch eine Tabelle angelegt werden muss, die verschiedene Listen speichert (mit fk
        #dann muss man diese listen instantiieren (vlt durch den listenmapper oder so) und daraufhin diese objekte dem Gruppenatribut self.lists hinzufügen
        
        #Todo: 1. Tabelle anlegen 2. Listenmapper 3. Gruppenmapper 

        pass 

    def find_by_key(self):
        """
        Niklas
        """
        pass 
    
    def insert(self):
        pass 

    def update(self):
        pass 

    def delete(self):
        """
        Niklas
        """
        pass 

    
