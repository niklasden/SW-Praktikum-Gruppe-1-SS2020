from server.bo import BusinessObject as bo

""" A single Shopping List
@author Christopher Böhm
"""
class ShoppingList(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = "" # Der Name einer Shopping List
        self._id = "" # The id of a Shopping List
        self._group_id = ""

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

    def __str__(self):
        return "Shopping List: {}, name: {}".format(self.get_id(), self._name)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = ShoppingList()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_group_id(dictionary["group_id"])
        return obj


