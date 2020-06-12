from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from server.db.UserMapper import UserMapper
from server.bo.User import User

from server.ShoppingAdministration import ShoppingAdministration

import json


app = Flask(__name__)
api = Api(app)

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/testUser')
class Test(Resource):
    def get(self):
        result = {}
        adm = ShoppingAdministration() 

        #find all result test
        result_find_all = adm.get_all_user()
        if result_find_all[0]:
            result.update({"Find all result ": [str(i) for i in result_find_all]})
       
            
        #find by name test
        result_find_by_name = adm.get_user_by_name("bg5KpSLu") 
        result.update({"Find by name result ": [str(i) for i in result_find_by_name]})


        #find by email test
        result.update({"Find by e-mail result ":[str(adm.get_user_by_email("bg5KpSLu@testmail.de"))]})


        #create test
        try:
            result.update({"Create user result ":[str(adm.create_user("AusserordentlicherTester","dieseMailist@wichtig.de","firebaseid123"))]})

        except Exception as e:
            return str(e)


        #insert test
        try:
            n_user = User()
            n_user.randomize()       #creates random values for userobject        
            #print(str(n_user))
            result.update({"Insert user result ":[str(adm.insert_user(n_user))]})
        except Exception as e:
            return "ERROR in main.py  " +str(e)
    

        #delete test
        try:
            result.update({"Delete user result ":[str(adm.delete_user(adm.get_user_by_email("dieseMailist@wichtig.de")))]})
        except Exception as e:
            return "ERROR in main.py delete test " +str(e) 
        
        return result
        
        

if __name__ == '__main__':
    app.run(debug=True)