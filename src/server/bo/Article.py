from server.bo import BusinessObject as bo

""" A single Article
@author Pia Schmid
"""
class Article (bo.BusinessObject):

    """An article has a name and a category"""

    def __init__(self):
        super().__init__()
        self._name = ""
        self._category = None

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = name

    def get_category(self):
        return self._category

    def set_category(self, category):
        self._category = category

    def __str__(self):
        return "Article: {}, name: {}, category: {}".format(self.get_id(), self._name, self._category)

    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Article()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_category(dictionary["category"])
        return obj

