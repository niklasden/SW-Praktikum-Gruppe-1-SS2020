from server.bo import BusinessObject as bo

class Article (bo.BusinessObject):
    """ A single article

    @author Pia Schmid

    Attributes
    ----------
    _name: str
        the name of the article
    _category: str
        the category of the article: user can choose one of the predefined categories
    _creationdate: DateTime
        the date the object has been created
    """

    def __init__(self):
        super().__init__()
        self._name = "" 
        self._category = None
        self._creationdate = None

    def get_creationdate(self):
        """
        Getter for creationdate of the article
        :return DateTime of creationdate
        """
        return self._creationdate

    def set_creationdate(self,cd):
        """
        Setter for creationdate of the article
        :para cd The creationdate the article should be set to
        :return nothing
        """
        self._creationdate = cd

    def get_name(self):
        """
        Getter for article name
        :return String of the article name
        """
        return self._name

    def set_name(self, name):
        """
        Setter for the article name
        :param name Name of the article
        :return nothing
        """
        self._name = name

    def get_category(self):
        """
        Getter for the category of the article
        :return the category of the article
        """
        return self._category

    def set_category(self, category):
        """
        Setter for the category of the article
        :param category Category string of the article
        :return nothing
        """
        self._category = category

    def __str__(self):
        """
        Overwrites the __str__ class of the base object to generate a string representation of th article object
        :return A string representation of the article object"""
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

