from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from server.db.UserMapper import UserMapper 
app = Flask(__name__)
api = Api(app)

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/test')
class Test(Resource):
    def get(self):
        with UserMapper() as usrmap:
            result = usrmap.find_all()
        return result

if __name__ == '__main__':
    app.run(debug=True)