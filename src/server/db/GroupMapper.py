from server.bo.Group import Group
from server.db.Mapper import Mapper


class GroupMapper(Mapper):
    """
    Author: Julius

    Mapper for group business object
    """
    def __init__(self):
        super().__init__()
    
    def find_all(self):
        """
        get all groups from the data base
        :return: a list of group business objects
        """
        result = []
        cursor = self._cnx.cursor()
        statement = "Select * from `Group`"
        cursor.execute(statement)
        tuples = cursor.fetchall()

        try:
            for (id, description, name, creationdate) in tuples:
                gr = Group()
                gr.set_id(id)
                gr.set_description(description)
                gr.set_name(name)
                gr.set_creationdate(creationdate)
                result.append(gr)
        except IndexError:
            result = None 
        self._cnx.commit()
        cursor.close()

        return result 
    
    

    def find_all_by_userid(self,uid):
        """
        get all groups from the data base of one user
        :return: a list of group business objects
        """
        groups = []
        cursor = self._cnx.cursor()
        statement = "Select Group_ID from Membership WHERE User_ID = {} ".format(int(uid))
        cursor.execute(statement)
        tuples = cursor.fetchall()
        
        for gid in tuples:
            cursor.execute("SELECT * from `Group` WHERE ID = '{}'".format(gid[0]))
            g = cursor.fetchall()
            try:
                for (id, description, name, creationdate) in g:
                    gr = Group()
                    gr.set_id(id)
                    gr.set_description(description)
                    gr.set_name(name)
                    gr.set_creationdate(creationdate)

                    groups.append(gr)
            except IndexError:
                groups = None 
        
        self._cnx.commit()
        cursor.close()
        return groups 


    def find_by_key(self, key):
        """
        get one specific group from the data base  
        :return: a group business object
        
        Niklas
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, name, description, creationdate FROM `Group` WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, description, creationdate) = tuples[0]    
            group = Group()
            group.set_id(id)
            group.set_name(name)
            group.set_description(description)
            group.set_creationdate(creationdate)
            result = group
        except IndexError:
            result = None
        
        self._cnx.commit()
        cursor.close()
        return result
    

    def insert(self,group):
        """
        Julius
        
        
        insert a group business object to the data base  
        :return: a group business objects
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM `Group`")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            if maxid[0]:
                group.set_id(maxid[0]+1)
            else:
                group.set_id(1)

        command = "INSERT INTO `Group` (ID, description, name, creationdate) VALUES ('{0}', '{1}', '{2}', NOW())".format(group.get_id(),group.get_description(),group.get_name())
               
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
        
        update a group business object in the data base  
        :return: a group business objects
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
        
        
        delete a group business object from the data base  
        :return: str
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

    def checkMembership(self,uid,gid):
        """
        Julius 
        checks if an membership exists between a group and an user  
        :return: bool 
        """
        try:
            cursor = self._cnx.cursor()
            command = "SELECT `User_ID`,`Group_ID` FROM dev_shoppingproject.Membership WHERE `User_ID`={0} AND `Group_ID`={1}".format(uid,gid)
            cursor.execute(command)
            tuples = cursor.fetchall()
            
            if len(tuples) < 1:
                return False
            else:
                return True


        except Exception as e:
            print("exception in checkMembership",e)
            return None


    def createMembership(self,userid,groupid):
        """
        Julius

        creates an membership in db for a specific user an a specific group
        :return: str
        """

        if self.checkMembership(userid,groupid) == False:
            try:
                cursor = self._cnx.cursor()
                command = "INSERT INTO Membership (User_ID,Group_ID) VALUES ('{0}', '{1}')".format(userid,groupid)
                cursor.execute(command)
                self._cnx.commit()
                cursor.close()
                return "added usernr. {0} to groupnr. {1}".format(userid,groupid)
            
            except Exception as e:
                return str(e)
        else:
            print("membership already exists")
            return "membership already exists"
    

    def deleteMembership(self,userid,groupid):
        """
        Julius 

        deletes an membership from db  
        :return: str
        """
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
        """
        Julius 

        gets all users of one group 
        :return: list of group bos
        """
        try:
            cursor = self._cnx.cursor()
            command = "SELECT User_ID from Membership WHERE Group_ID = {0}".format(gid)
            cursor.execute(command)
            tuples = cursor.fetchall()
            res = []
            result =[]
            for i in tuples:
                res.append(i[0])

            self._cnx.commit()
            cursor.close()
            userids = res 

            """
            in shopping admin: create user objects from ids
            """
            return res 


        except Exception as e:
            print(e) 
            
            return None
            
