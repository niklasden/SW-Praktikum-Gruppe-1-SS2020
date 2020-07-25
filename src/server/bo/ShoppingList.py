from server.bo import BusinessObject as bo

class ShoppingList(bo.BusinessObject):
    """ A single Shopping List
    @author Christopher Böhm

    Attributes
    ----------
    _name: str
        the name of the shopping list
    _group_id: str
        the group id the shopping list belongs to
    _id: str
        the unique id of the shopping list
    _creationdate: str
        the date the object has been created
    """

    def __init__(self):
        super().__init__()
        self._name = "" #name of the shoppinglist 
        self._id = "" #id of the shoppinglist 
        self._group_id = "" #Foreign key relationship to the ID of the group
        self._creationdate = "" #creation date of the shoppinglist 

    def get_group_id(self):
        """
        Getter for group id
        :return: group_id: group id
        """

        return self._group_id

    def set_group_id(self, group_id):
        """
        Setter for group id
        :param group_id: group id to set for shopping list
        :return: nothing
        """

        self._group_id = group_id

    def get_id(self):
        """
        Getter for shopping list id
        :return id: unique id of shopping list
        """

        return self._id

    def set_id(self, id):
        """"
        Setter for shopping list id
        :param id: id to set
        """
        self._id = id

    def get_name(self):
        """
        Getter for name
        :return: name of shopping list
        """
        return self._name

    def set_name(self, name):
        """
        Setter for name
        :param name: name of shopping list
        """
        self._name = name

    def get_creationdate(self):
        """
        Getter for creationdate
        :return: creationdate of shopping list
        """
        return self._creationdate

    def set_creationdate(self, creationdate):
        """
        Setter for creationdate
        :param creationdate: creationdate of shopping list
        """
        self._creationdate = creationdate

    def __str__(self):
        """
        Overwrites the __str__ class of the base object to generate a string representation of th shopping list object
        :return: a string representation of the retailer object
        """

        return "Shopping List: {}, name: {}".format(self.get_id(), self._name)

    @staticmethod
    def from_dict(dictionary=dict()):
        """
        Transform a python dict to a shopping list object
        :param dictionary:
        :return: a new generated ShoppingList object
        """

        obj = ShoppingList()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_group_id(dictionary["group_id"])
        #obj.set_creationdate(dictionary["creationdate"])

        return obj


