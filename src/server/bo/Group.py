from server.bo import BusinessObject as bo


class Group(bo.BusinessObject):
    """
    author: Julius
    """
    def __init__(self, g_name="Group_name"):
        super().__init__()
        #self.members =  []
        self.name = g_name
        self.description = ""
        #self.shopping_list = None

    
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
    
    def set_description(self,d):
        self.description = d
    
    def get_description(self):
        return self.description
    """
    def get_shopping_list(self):
        return self.shopping_list
    
    def set_shopping_list(self,listId):
        self.shopping_list = listId
    """

    def __str__(self):
        return "GroupName: {0} ; GroupID: {1}".format(self.name,self._id)














