from server.bo import BusinessObject as bo


class Group(bo.BusinessObject):
    """
    author: Julius
    """
    def __init__(self, g_name="Group_name"):
        super().__init__()
        self.members =  []
        self.name = g_name
        self.shopping_lists = []

    def add_member(self, user):
        self.members.append(user)
    
    def remove_member(self, user):   #wenns nicht über das objekt geht, dann über id
        if user in self.members:
            self.members.remove(user)
    
    def get_members(self):
        return self.members

    def get_name(self):
        return self.name

    def set_name(self,name):
        self.name = name
    
    def get_shopping_lists(self):
        return self.shopping_lists
    
    def add_shopping_list(self,s_list):
        self.shopping_lists.append(s_list)

    def __str__(self):
        return "Groupobject: Name = {0}".format(self.name)














