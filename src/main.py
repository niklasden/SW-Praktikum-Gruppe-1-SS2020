from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from server.db.UserMapper import UserMapper

import json

app = Flask(__name__)
api = Api(app)

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/test')
class Test(Resource):
    def get(self):
        result = {}
        with UserMapper() as usrmap:
            result_find_all = usrmap.find_all()
            result.update({"Find all result": str(result_find_all)})

            result_find_by_name = usrmap.find_by_name("Testname")
            result.update({"Find by name result": str(result_find_by_name)})
            
            result.update({"Find by e-mail result": str(usrmap.find_by_email("test@test.de"))})

        return result
        
        

if __name__ == '__main__':
    app.run(debug=True)