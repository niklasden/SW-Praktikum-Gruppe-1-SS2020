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
from server.db.ListEntryMapper import ListEntryMapper
from server.bo.ListEntry import ListEntry

import json


app = Flask(__name__)
CORS(app, resources=r'/shopping/*')
api = Api(app)


"""
Namespaces:
"""
shopping_v1 = api.namespace('shopping', description='iKaufa App V1')     
testing = api.namespace('testing',description='Namespace for testing')


"""
Transferable structure: 
"""
bo = api.model('BusinessObject',{
    'id': fields.Integer(attribute= '_id', description= "unique bo id"),

})

"""
Business Objects: Group, ListEntry t.b.f
"""
group = api.inherit('Group',bo, {
    'name': fields.String(attribute='name',description="A groups name"),
    'description': fields.String(attribute='description',description="A groups description")
})

user = api.inherit('User',bo,{
    'name': fields.String(attribute='_name',description="An users name"),
    'email': fields.String(attribute='_email',description="An users email"),
    'firebase_id': fields.String(attribute='_firebase_id',description="An users firebaseid ")
})

listentry = api.inherit('ListEntry',bo, {
    'id': fields.String(attribute='_id',description="ID of a listentry"),
    'article_id': fields.String(attribute='_article_id',description="Article ID of a listentry"),
    'retailer_id': fields.String(attribute='_retailer_id',description="Retailer ID of the specific listenty"),
    'shoppinglist_id': fields.String(attribute='_shoppinglist_id',description="Corresponding Shopping List ID of a listentry"),
    'user_id': fields.String(attribute='_user_id',description="User ID which the ListEntry is assigned to"),
    'group_id': fields.String(attribute='_group_id',description="Group ID in which the ListEntry belongs to"),
    'amount': fields.String(attribute='_amount',description="Amount of item to be bought"),
    'bought': fields.String(attribute='_bought',description="Date when the article was bought"),
})

# alle bos hier aufführen!




@shopping_v1.route('/hello')
@shopping_v1.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


@shopping_v1.route('/Group')
@shopping_v1.response(500,'If an server sided error occures')
class GroupListOperations(Resource):
    @shopping_v1.marshal_with(group)
    @secured
    def get(self):
        adm = ShoppingAdministration()
        return adm.get_all_groups()
    
    @shopping_v1.marshal_with(group,code=200)
    @shopping_v1.expect(group)
    @secured
    def post(self):
        adm = ShoppingAdministration()
        try:
            proposal = Group.from_dict(api.payload)
            if proposal is not None:
                c = adm.create_group(proposal.get_name(),proposal.get_description())
                return c, 200
            else:
                return "",500

        except Exception as e:
            return str(e),500


@shopping_v1.route('/Group/<int:id>')
@shopping_v1.response(500,'If an server sided error occures')
@shopping_v1.param('id', 'Group objects id')
class GroupOperations(Resource):
    @shopping_v1.marshal_with(group)
    @secured
    def get(self,id):
        adm = ShoppingAdministration()
        return adm.get_group_by_id(id)
    
    @secured
    def delete(self,id):
        adm = ShoppingAdministration()
        grp = adm.get_group_by_id(id)
        adm.delete_group(grp)
        return "deleted",200
    
    @shopping_v1.marshal_with(group)
    @shopping_v1.expect(group,validate=True)
    @secured
    def put(self,id):
        adm = ShoppingAdministration()
        c = Group.from_dict(api.payload)
        if c is not None: 
            c.set_id(id)
            adm.save_group(c)
            return 'saved',200
        else:
            return 'error',500


@shopping_v1.route('User')
@shopping_v1.response(500,"If an server sided error occures")
class UserListOperations(Resource):
    @shopping_v1.marshal_list_with(user)
    @secured
    def get(self):
        adm = ShoppingAdministration() 
        result_find_all = adm.get_all_user()
        return result_find_all
        
    @shopping_v1.marshal_with(user,code=200)
    @shopping_v1.expect(user)
    @secured
    def post(self):
        adm = ShoppingAdministration()
        try:
            proposal = User.from_dict(api.payload)
            if proposal is not None:
                c = adm.create_user(proposal.get_name(),proposal.get_email(),proposal.get_firebase_id())
                return c, 200
            else:
                return "",500

        except Exception as e:
            return str(e),500
        


# TODO Class UserOperations

# TESTING AREA:

@testing.route('/testSecured')
class testSecured(Resource):
    @secured
    def get(self):
        res = "if you can see this without beeing logged in.. backend dev has got a problem."
        return res

@testing.route('/testGroup')
@testing.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class testGroupListOperations(Resource):
    @testing.marshal_with(group)
    def get(self):
        adm = ShoppingAdministration()
        
        result= adm.get_all_groups()
        return result


@testing.route('/testGroup/<int:id>')
@testing.param('id', "Group object id")
class testGroupOperations(Resource):
    @testing.marshal_with(group)
    def get(self,id):
        adm = ShoppingAdministration()
        return adm.get_group_by_id(id)

    def delete(self,id):
        adm = ShoppingAdministration()
        gr = adm.get_group_by_id(id)
        adm.delete_group(gr)

@testing.route('/testallListEntry')
@testing.response(500, 'Falls was in die Fritten geht')
class testListEntry(Resource):
    @testing.marshal_with(listentry)
    def get(self):
        adm = ShoppingAdministration()
        result = adm.get_all_listentries()
        return result

@testing.route('/testListEntrybykey')
@testing.response(500, 'Falls was in die Fritten geht')
class testListEntry(Resource):
    @testing.marshal_with(listentry)
    def get(self):
        adm = ShoppingAdministration()
        result = adm.get_l
        return result

@testing.route('/testListEntrybyRetailer')
@testing.response(500, 'Mach me so hamme kein stress')
class testListEntry(Resource):
    @testing.marshal_with(listentry)
    def get(self):
        adm = ShoppingAdministration()
        result = adm.get
        return result

@testing.route('/testUser')
@testing.response(500,'If an server sided error occures')
class testUser(Resource):
    @testing.marshal_with(user)
    def get(self):
        result = {}
        adm = ShoppingAdministration() 
        result_find_all = adm.get_all_user()
        return result_find_all
        """
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
        """
        

if __name__ == '__main__':
    app.run(debug=True)