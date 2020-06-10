from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from server.db.UserMapper import UserMapper
from server.bo.User import User

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
        with UserMapper() as usrmap:
            #find all result test
            result_find_all = usrmap.find_all()
            result.update({"Find all result ": [str(i) for i in result_find_all]})


            #find by name test
            result_find_by_name = usrmap.find_by_name("bg5KpSLu") 
            result.update({"Find by name result ": [str(i) for i in result_find_by_name]})


            #find by email test
            result.update({"Find by e-mail result ":[str(usrmap.find_by_email("bg5KpSLu@testmail.de"))]})


           #insert test
            try:
                n_user = User()
                n_user.randomize()       #creates random values for userobject        
                print(str(n_user))
                result.update({"Insert user result ":[str(usrmap.insert(n_user))]})
            
            except Exception as e:
                return "ERROR in main.py  " +str(e)
        
            #delete test
            try:
                result.update({"Delete user result ":[str(usrmap.delete(n_user))]})
            except Exception as e:
                return e 
        
        return result
        
        

if __name__ == '__main__':
    app.run(debug=True)