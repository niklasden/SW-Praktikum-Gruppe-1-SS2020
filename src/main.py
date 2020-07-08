from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from server.db.UserMapper import UserMapper
from server.bo.User import User

from SecurityDecorator import secured

from server.ShoppingAdministration import ShoppingAdministration

import json


app = Flask(__name__)
#CORS(app, resources=r'/shopping/*')
api = Api(app)


"""
Namespaces:
"""
shopping_v1 = api.namespace('shopping', description='iShopping App V1')     
testing = api.namespace('testing',description='Namespace for testing')



@shopping_v1.route('/hello')
@shopping_v1.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@testing.route('/testSecured')
class testSecured(Resource):
    @secured
    def get(self):
        res = "if you can see this without beeing logged in.. backend dev has got a problem."
        return res


@testing.route('/testUser')
class testUser(Resource):
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


@testing.route('/testGroup')
class testGroup(Resource):
    def get(self):
        adm = ShoppingAdministration()

        r = adm.get_all_groups()
        res = []
        res.append([str(i) for i in r])
        
        res.append([str(i)for i in adm.get_group_by_key(1)])
        
        return res



if __name__ == '__main__':
    app.run(debug=True)