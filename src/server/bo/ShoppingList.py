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
        self._name = ""
        self._id = ""
        self._group_id = ""
        self._creationdate = ""

    def get_group_id(self):
        return self._group_id

    def set_group_id(self, group_id):
        self._group_id = group_id

    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = name

    def get_creationdate(self):
        return self._creationdate

    def set_creationdate(self, creationdate):
        self._creationdate = creationdate

    def __str__(self):
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


