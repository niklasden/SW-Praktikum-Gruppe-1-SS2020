from server.bo import BusinessObject as bo

class Retailer(bo.BusinessObject):
    """ A single Retailer

    @author Christopher Böhm

    Attributes
    ----------
    _name: str
        the name of the retailer
    _location: str
        the location of the retailer, can be an address or a description like: behind the big building etc.
    _id: str
        the unique id of the retailer
    _creationdate: str
        the date the object has been created
    """

    def __init__(self):
        super().__init__()
        self._name = ""
        self._location = ""
        self._id = ""
        self._creationdate = None

    def get_creationdate(self):
        """
        Getter for creationdate of retailer
        :return: string of creationdate
        """
        return self._creationdate

    def set_creationdate(self, creationdate):
        """
        Setter for creationdate of retailer
        :param creationdate: the creationdate the retailer should be set to
        :return: nothing
        """
        self._creationdate = creationdate

    def get_id(self):
        """
        Getter for unique id of retailer
        :return: integer of id
        """
        return self._id

    def set_id(self, id):
        """"
        Setter for unique id of retailer
        :param: id: the id of the retailer
        """
        self._id = id

    def get_name(self):
        """
        Getter for retailer name
        :return: the name string of the retailer
        """
        return self._name

    def set_name(self, name):
        """
        Setter for retailer name
        :param name:
        :return:
        """
        self._name = name

    def get_location(self):
        """
        Getter for retailer location
        :return: retailer location as string
        """
        return self._location

    def set_location(self, location):
        """
        Setter for retailer location
        :param location: location string of the retailer
        :return: nothing
        """
        self._location = location

    def __str__(self):
        """
        Overwrites the __str__ class of the base object to generate a string representation of th retailer object
        :return: a string representation of the retailer object
        """
        return "Retailer: {}, name: {}, location: {}".format(self.get_id(), self._name, self._location)

    @staticmethod
    def from_dict(dictionary=dict()):
        """
        Transforming a python dict() in a retailer object
        :param dictionary:
        :return:
        """
        obj = Retailer()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_location(dictionary["location"])
        
        return obj


