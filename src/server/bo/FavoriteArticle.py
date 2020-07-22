from server.bo import BusinessObject as bo

class FavoriteArticle(bo.BusinessObject):
    """
    author: Julius
    Article BO: Attributes:  
    - Group_ID: <int>
    - Article_ID: <int>
    - amount: <str>
    - unit: <int> 
    - Retailer_ID: <int> 
    - creationdate: <str>
    """
    def __init__(self):
        super().__init__()
        self.Group_ID = 0
        self.Article_ID= 0
        self.amount = 0
        self.unit = ""
        self.Retailer_ID = 0
        self.creationdate = None #set directly in command with NOW() operator 
       
    def get_Group_ID(self):
        """
        getter for group id of favorite article 
        """
        return self.Group_ID
    
    def set_Group_ID(self,gid):
        """
        setter for gorup id of fav. article
        """
        self.Group_ID = gid
    
    def get_Article_ID(self):
        """
        getter for article id of fav. article
        """
        self
        return self.Article_ID
    
    def set_Article_ID(self,aid):
        """
        setter for article id of fav. article
        """
        self.Article_ID = aid
    
    def get_amount(self):
        """
        getter for amount of fav. article
        """
        return self.amount
    
    def set_amount(self,a):
        """
        setter for amount of fav. article
        """
        self.amount = a 

    def get_unit(self):
        """
        getter for unit of fav. article
        """
        return self.unit
    
    def set_unit(self,u):
        """
        setter for unit of fav. article
        """
        self.unit = u

    def get_Retailer_ID(self):
        """
        getter for retailer id of fav. article
        """
        return self.Retailer_ID
    
    def set_Retailer_ID(self,r):
        """
        getter for retailer id of fav. article
        """
        self.Retailer_ID = r

    def get_creationdate(self):
        """
        getter for creationdate of fav. article
        """
        return self.creationdate
    
    def set_creationdate(self,cd):
        """
        setter for creationdate of fav. article
        """
        self.creationdate = cd

    def __str__(self):
        return "ID: "+str(self._id)+" Group_ID: "+(str(self.Group_ID))+"ArticleID: "+(str(self.Article_ID))
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """
        returns an FavoriteArticle bo based on an dict (mainly from requests(json))
        """
        obj = FavoriteArticle()
        obj.set_id(dictionary["id"])
        obj.set_Group_ID(dictionary["group_id"])
        obj.set_Article_ID(dictionary["article_id"])
        obj.set_amount(dictionary["amount"])
        obj.set_unit(dictionary["unit"])
        obj.set_Retailer_ID(dictionary["retailer_id"])
        obj.set_creationdate(dictionary["creationdate"])
        return obj












