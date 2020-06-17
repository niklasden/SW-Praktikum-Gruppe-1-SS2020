from server.bo import BusinessObject as bo

""" A single Retailer
@author Christopher Böhm
"""
class Retailer (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = None
        self._location = None

    def get_name(self):
        self._name

    def set_name(self, name):
        self._name = name

    def get_location(self):
        return self._location

    def set_location(self, location):
        self._location = location

    def __str__(self):
        return "Retailer: {}, name: {}".format(self.get_id(), self._name)

