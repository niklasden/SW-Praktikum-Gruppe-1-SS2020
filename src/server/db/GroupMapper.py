from server.bo.Group import Group
from server.db.Mapper import Mapper

class GroupMapper(Mapper):
    """
    Author: Julius
    """
    def __init__(self):
        super().__init__()
    
    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        statement = "Select * from `Group`"
        cursor.execute(statement)

        tuples = cursor.fetchall()

        
        for (id, description, name) in tuples:
            gr = Group()
            gr.set_id(id)
            gr.set_description(description)
            gr.set_name(name)
            
            result.append(gr)
                
            
        
        
        self._cnx.commit()
        cursor.close()

        return result 

        #hier ist das problem, dass in der db noch eine Tabelle angelegt werden muss, die verschiedene Listen speichert (mit fk
        #dann muss man diese listen instantiieren (vlt durch den listenmapper oder so) und daraufhin diese objekte dem Gruppenatribut self.lists hinzufügen
        
        #Todo: 1. Tabelle anlegen 2. Listenmapper 3. Gruppenmapper 

        pass 

    def find_by_key(self, key):
        """
        Niklas
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, name, description FROM `Group` WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, description) = tuples[0]    #potentieller fehler (erst description dann name)
            group = Group()
            group.set_id(id)
            group.set_name(name)
            group.set_description(description)
            result = group
        except IndexError:
            result = None
        
        self._cnx.commit()
        cursor.close()
        return result
    
    def insert(self):
        pass 

    def update(self):
        pass 

    def delete(self, group):
        """
        Niklas
        """
        try:
            cursor = self._cnx.cursor()
            command = "DELETE FROM `Group` WHERE ID={0}".format(group.get_id())
            cursor.execute(command)

            self._cnx.commit()
            cursor.close()

            return "Group deleted"

        except Exception as e:
            return "Error in delete Group GroupMapper: " + str(e)

    
