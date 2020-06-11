from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.ShoppingAdministration import ShoppingAdministration


def secured():
    """
    Julius
    """

    firebase_request_adapter = requests.Request()
    def wrapper(*args, **kwargs): 
        id_token = request.cookies.get("token")    #requests ist ein attribut der jeweiligen "Operationsklasse", und wird über die ABC resource vererbt (RestX)
                                                    # der cookie ist dann halt teil der request 
        claims = None 
        objects = None 

        if id_token:
            pass 
        