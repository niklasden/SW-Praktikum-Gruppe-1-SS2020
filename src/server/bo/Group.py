from server.bo import BusinessObject as bo


class Group(bo.BusinessObject):
    """
    author: Julius
    Group Business Object:

    Attributes:
    - description: <str> 
    - name: <str>
    - creationdate: <str> 
    """
    def __init__(self, g_name="Group_name",desc = "", creationdate=""):
        super().__init__()
        self.description = desc
        self.name = g_name
        self.creationdate = creationdate
       

    def set_description(self,d):
        self.description = d

    def get_description(self):
        return self.description

    """    
    def add_member(self, user):
        self.members.append(user)
   
    def remove_member(self, user):   #wenns nicht über das objekt geht, dann über id
        if user in self.members:
            self.members.remove(user)
    
    def get_members(self):
        return self.members
    """

    def get_name(self):
        return self.name

    def set_name(self,name):
        self.name = name
    """
    def get_shopping_lists(self):
        return self.shopping_list
    
    def add_shopping_list(self,s_list):
        self.shopping_list = s_list
"""

    def get_creationdate(self):
        return self.creationdate

    def set_creationdate(self,date):
        self.creationdate = date

    def __str__(self):
        return "GroupName: {0} ; GroupID: {1}".format(self.name,self._id)

    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Group()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_description(dictionary["description"])
        obj.set_creationdate(dictionary["creationdate"])
        return obj












