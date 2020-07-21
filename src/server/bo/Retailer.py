from server.bo import BusinessObject as bo

""" A single Retailer
@author Christopher Böhm
"""
class Retailer(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = "" # Der Name eines Einzelhändlers, z.B. Rewe
        self._location = "" # Die Adresse des Einzelhändlers als einzelner String
        self._id = "" # The id of a retailer
        self._creationdate = None

    def get_creationdate(self):
        return self._creationdate
    def set_creationdate(self,cd):
        self._creationdate = cd
    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = name

    def get_location(self):
        return self._location

    def set_location(self, location):
        self._location = location

    def __str__(self):
        return "Retailer: {}, name: {}, location: {}".format(self.get_id(), self._name, self._location)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = Retailer()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_location(dictionary["location"])
        
        
        return obj


