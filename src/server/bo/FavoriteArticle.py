from server.bo import BusinessObject as bo

class FavoriteArticle(bo.BusinessObject):
    """
    author: Julius
    """
    def __init__(self):
        super().__init__()
        self.Group_ID = 0
        self.Article_ID= 0
        self.amount = 0
        self.unit = ""
        self.Retailer_ID = 0
        self.creationdate = None
       
    def get_Group_ID(self):
        return self.Group_ID
    
    def set_Group_ID(self,gid):
        self.Group_ID = gid
    
    def get_Article_ID(self):
        return self.Article_ID
    
    def set_Article_ID(self,aid):
        self.Article_ID = aid
    
    def get_amount(self):
        return self.amount
    
    def set_amount(self,a):
        self.amount = a 

    def get_unit(self):
        return self.unit
    
    def set_unit(self,u):
        self.unit = u

    def get_Retailer_ID(self):
        return self.Retailer_ID
    
    def set_Retailer_ID(self,r):
        self.Retailer_ID = r

    def get_creationdate(self):
        return self.creationdate
    
    def set_creationdate(self,cd):
        self.creationdate = cd

    def __str__(self):
        return "ID: "+str(self._id)+" Group_ID: "+(str(self.Group_ID))+"ArticleID: "+(str(self.Article_ID))
    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = FavoriteArticle()
        obj.set_id(dictionary["id"])
        obj.set_Group_ID(dictionary["group_id"])
        obj.set_Article_ID(dictionary["article_id"])
        obj.set_amount(dictionary["amount"])
        obj.set_unit(dictionary["unit"])
        obj.set_Retailer_ID(dictionary["retailer_id"])
        obj.set_creationdate(dictionary["creationdate"])
        return obj












