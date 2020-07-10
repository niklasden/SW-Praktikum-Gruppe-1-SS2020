from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from SecurityDecorator import secured
from server.ShoppingAdministration import ShoppingAdministration


#Import all BO :
from server.db.UserMapper import UserMapper
from server.bo.User import User
from server.db.GroupMapper import GroupMapper
from server.bo.Group import Group

import json


app = Flask(__name__)
CORS(app, resources=r'/shopping/*')
api = Api(app)


"""
Namespaces:
"""
shopping_v1 = api.namespace('shopping', description='iShopping App V1')     
testing = api.namespace('testing',description='Namespace for testing')


"""
Transferierbare Strukturen: 
"""
bo = api.model('BusinessObject',{
    'id': fields.Integer(attribute= '_id', description= "Der einzigartige Identifier eines Business Object"),

})

"""
Business Objects: Group, t.b.f
"""
group = api.inherit('Group',bo, {
    'name': fields.String(attribute='name',description="Name einer Gruppe"),
    'description': fields.String(attribute='description',description="Beschreibung einer Gruppe")
})


# alle bos hier aufführen!



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

@testing.route('/testGroup')
@testing.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class testGroup(Resource):
    @testing.marshal_list_with(group)
    def get(self):
        adm = ShoppingAdministration()

        result= adm.get_all_groups()
        return result               #testing.marshal(result,fields)



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
        
        

if __name__ == '__main__':
    app.run(debug=True)