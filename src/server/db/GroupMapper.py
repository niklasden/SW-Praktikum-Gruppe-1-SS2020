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

        try:
            for (id, description, name) in tuples:
                gr = Group()
                gr.set_id(id)
                gr.set_description(description)
                gr.set_name(name)
                
                result.append(gr)
                print(result)
        except IndexError:
            result = None 
        
        self._cnx.commit()
        cursor.close()

        return result 
        
    def find_all_by_userid(self,uid):
        groups = []
        cursor = self._cnx.cursor()
        statement = "Select Group_ID from Membership WHERE User_ID = {} ".format(int(uid))
        cursor.execute(statement)
        tuples = cursor.fetchall()
        
        for gid in tuples:
            cursor.execute("SELECT * from `Group` WHERE ID = '{}'".format(gid[0]))
            g = cursor.fetchall()
            try:
                for (id, description, name) in g:
                    gr = Group()
                    gr.set_id(id)
                    gr.set_description(description)
                    gr.set_name(name)

                    groups.append(gr)
            except IndexError:
                groups = None 
        
        self._cnx.commit()
        cursor.close()

        return groups 

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
    
    def insert(self,group):
        """
        Julius
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM `Group`")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            if maxid[0]:
                group.set_id(maxid[0]+1)
            else:
                group.set_id(1)

        command = "INSERT INTO `Group` (ID, description, name) VALUES ('{0}', '{1}', '{2}')".format(group.get_id(),group.get_description(),group.get_name())
               
        try:
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return group

        except Exception as e:
            cursor.close()
            return "Error in groupMapper insert: "+str(e)

    def update(self,group):
        """
        Julius
        """
        cursor = self._cnx.cursor()
        command = "UPDATE `Group` " + "SET name=%s, description=%s WHERE id=%s"
        data = (group.get_name(), group.get_description(), group.get_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

        return group

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

    def createMembership(self,userid,groupid):
        """
        Julius
        """
        try:
            cursor = self._cnx.cursor()
            command = "INSERT INTO Membership (User_ID,Group_ID) VALUES ('{0}', '{1}')".format(userid,groupid)

            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return "added usernr. {0} to groupnr. {1}".format(userid,groupid)
        
        except Exception as e:
            return str(e)

    def deleteMembership(self,userid,groupid):

        try: 
            cursor = self._cnx.cursor()
            command = "DELETE FROM dev_shoppingproject.Membership WHERE User_ID = {0} AND Group_ID =  {1}".format(userid,groupid)
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return "deleted usernr. {0} to groupnr. {1}".format(userid,groupid)
        
        except Exception as e:
            return str(e)
    
    def get_users_by_gid(self,gid):
        
        cursor = self._cnx.cursor()
        command = "SELECT User_ID from Membership WHERE Group_ID = {0}".format(gid)
        cursor.execute(command)
        tuples = cursor.fetchall()
        res = []
        for i in tuples:
            res.append(i[0])

        self._cnx.commit()
        cursor.close()
        return {"User_IDs": res}