from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.ShoppingAdministration import ShoppingAdministration


def secured(function):
    """
    Julius
    """
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs): 
        id_token = request.cookies.get("token")    #requests ist ein attribut der jeweiligen "Operationsklasse", und wird über die ABC resource vererbt (RestX)
                                                   # der cookie ist dann halt teil der request 
        error_message = None
        claims = None 
        objects = None 

        if id_token:
            try:
                claims = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)  # it takes an id token and verifies it via our request adapter at firebase and returns the decoded token with all information

                if claims is not None: 
                    adm = ShoppingAdministration()
                
                    firebase_id = claims.get("user_id")    # if get doesn't work maybe ["user_id"]     https://google-auth.readthedocs.io/en/latest/reference/google.oauth2.id_token.html
                    email = claims.get("email")
                    name = claims.get("name")

                    user = adm.get_user_by_firebase_id(firebase_id)   #if there is no user in db with this firebase id 
                    
                    if user is not None: 
                        # update user in system 
                        user.set_name(name)
                        user.set_email(email)
                        adm.save_user(user)

                    else:
                        #creating user for later usage ()
                        user = adm.create_user(name,email,firebase_id)
                    
                    print(request.method, request.path, "Anfrage durch: ",name, " ", email)
                    
                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401
            except ValueError as exc:
                # This will be raised if the token is expired or any other
                # verification checks fail.
                error_message = str(exc)
                return exc, 401  

        return '',401 
    
    return wrapper