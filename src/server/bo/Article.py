from server.bo import BusinessObject as bo

""" A single Article
@author Pia Schmid
"""
class Article (bo.BusinessObject):

    """Realization of an article.

    An article has a name, a category and a creation date.
    """

    def __init__(self):
        super().__init__()
        self._name = "" #name of the article
        self._category = None #category of the article
        self._creationdate = None

    def get_creationdate(self):
        """get the creation date of the article"""
        return self._creationdate

    def set_creationdate(self,cd):
        """set the creation date of the article"""
        self._creationdate = cd

    def get_name(self):
        """get the article name"""
        return self._name

    def set_name(self, name):
        """set the article name"""
        self._name = name

    def get_category(self):
        """get the category of the article"""
        return self._category

    def set_category(self, category):
        """set the category of the article"""
        self._category = category

    def __str__(self):
        """create a simple textual representation of the respective instance."""
        return "Article: {}, name: {}, category: {}".format(self.get_id(), self._name, self._category)

    
    @staticmethod
    def from_dict(dictionary=dict()):
        """converting a python dict() into a article()"""
        obj = Article()
        obj.set_id(dictionary["id"]) #actually part of BusinessObject 
        obj.set_name(dictionary["name"])
        obj.set_category(dictionary["category"])
        obj.set_creationdate(dictionary["cd"])
        
        return obj

