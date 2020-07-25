from flask import Flask, request
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
from server.bo.Retailer import Retailer
from server.bo.Article import Article
from server.db.ArticleMapper import ArticleMapper
from server.bo.ShoppingList import ShoppingList
from server.bo.FavoriteArticle import FavoriteArticle
from server.db.FavoriteArticleMapper import FavoriteArticleMapper
import json


app = Flask(__name__)
CORS(app, resources=r'/shopping/*', supports_credentials=True)
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
Business Objects: Group, ListEntry, user, retailer, report, article, shoppinglist and favourite articles 
"""
group = api.inherit('Group',bo, {
    'name': fields.String(attribute='name',description="A groups name"),
    'description': fields.String(attribute='description',description="A groups description"),
    'creationdate': fields.DateTime(attribute='creationdate', description="The creationdate of group")
})

user = api.inherit('User',bo,{
    'name': fields.String(attribute='_name',description="An users name"),
    'email': fields.String(attribute='_email',description="An users email"),
    'firebase_id': fields.String(attribute='_firebase_id',description="An users firebaseid"),
    'creationdate': fields.DateTime(attribute='_creationdate',description="An users creationdate"),
    'location': fields.String(attribute='_location',description="A users location")
})

retailer = api.inherit('Retailer',bo,{
    'id': fields.Integer(attribute='_id', description="The id of a retailer"),
    'name': fields.String(attribute='_name',description="A retailers name"),
    'location': fields.String(attribute='_location', description="The address/location of a retailer as single string"),
    'creationdate': fields.DateTime(attribute='_creationdate',description="An retailers creationdate")
})

listentry = api.inherit('ListEntry',bo, {
    'article_id': fields.Integer(attribute='_article_id',description="Article ID of a listentry"),
    'shoppinglist_id': fields.Integer(attribute='_shoppinglist_id',description="Corresponding Shopping List ID of a listentry"),
    'user_id': fields.Integer(attribute='_user_id',description="User ID which the ListEntry is assigned to"),
    'group_id': fields.Integer(attribute='_group_id',description="Group ID in which the ListEntry belongs to"),
    'amount': fields.String(attribute='_amount',description="Amount of item to be bought"),
    'unit': fields.String(attribute='_unit', description="Unit of item"),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Retailer ID which the ListEntry is assigned to'),
    'bought': fields.String(attribute='_bought',description="Date when the article was bought"),
    'name': fields.String(attribute='_name',description="Name of the article"),
    'category': fields.String(attribute='_category',description="Category of the article"),
    'retailer': fields.String(attribute='_retailer',description="Retailer where the items/articles were bought"),
    'creationdate': fields.DateTime(attribute='_creationdate',description="An listentries creationdate"),
})

report = api.inherit('Report',bo, {
    'report_group': fields.String(attribute='_report_group',description="Group which report is used for"),
    'report_retailer': fields.Raw(attribute='_report_retailer',description="Retailers visited of group members."),
    '_report_listentries': fields.Raw(attribute='_report_listentries',description="Dictionary with bought articles with timestamp"),
    'top_articles': fields.Raw(attribute='_top_articles', description="Top 3 bought articles of each group"),
    'top_retailers': fields.Raw(attribute='_top_retailers', description="Top 3 bought retailers of each group"),
})
article = api.inherit('Article', bo, {
    'name': fields.String(attribute='_name', description="An Article name"), 
    'category': fields.String(attribute='_category', description="Category name of the specific article"),
    'creationdate': fields.DateTime(attribute='_creationdate',description="An users creationdate")
})

shoppingList = api.inherit('ShoppingList', bo, {
    'name': fields.String(attribute='_name', description="The name of a ShoppingList"),
    'group_id': fields.Integer(attribute='_group_id', description="The group id the shopping list belongs to"),
})

favoriteArticle = api.inherit('FavoriteArticle', bo, {
    'group_id': fields.Integer(attribute='Group_ID', description="The Group id the fa belongs to"),
    'article_id': fields.Integer(attribute='Article_ID', description="The article id "),
    'amount': fields.Integer(attribute='amount', description="The amount of the article "),
    'unit': fields.String(attribute='unit', description="The unit of the amount "),
    'retailer_id': fields.Integer(attribute='Retailer_ID', description="The retailer id the FA belongs to"),
    'creationdate': fields.DateTime(attribute='creationdate', description="Create Date of the shopping list")
})

# alle bos hier aufführen!

#Membership

@shopping_v1.route('/membership')
@shopping_v1.response(500,'If an server sided error occures')
class MembershipOperations(Resource):

    """
    payload has to look like:
    
    {
	"User_ID": 2,
	"Group_ID":5
    }
    """
    @secured
    def post(self):
        """
        Creates an new membership object.
        """
        
        userid = api.payload["User_ID"]
        groupid = api.payload["Group_ID"]
        
        adm = ShoppingAdministration()
        return adm.create_membership(userid,groupid)
        
@shopping_v1.route('/membership/del')    #2. route becuase we cant use delete http method becuase there are no membership ids (otherwise we could use membership/id with delete method )
@shopping_v1.response(500,'If an server sided error occures')
class MembershipOperations(Resource):

    """
    payload has to look like:
    
    {
	"User_ID": 2,
	"Group_ID":5
    }
    """
    @secured
    def post(self):
        """
        Deletes an specific Group object.

        The object is determined by query parameteres user_id and group_id.
        """
        try:
            adm = ShoppingAdministration()
            adm.delete_membership(api.payload["User_ID"],api.payload["Group_ID"])
            return "deleted "+ str(api.payload), 200
        except Exception as e:
            return str(e)

@shopping_v1.route('/membership/<int:groupid>')   
@shopping_v1.response(500,'If an server sided error occures')
@shopping_v1.param('groupid', 'Group ID')
class MembershipGroupOperations(Resource):
    @shopping_v1.marshal_list_with(user)
    #@secured
    def get(self,groupid):
        """
        Gets an specific membership object.

        The object is determined by the ``group_id`` in the URI.
        """
        adm = ShoppingAdministration()
        return adm.get_users_by_groupid(groupid)

@shopping_v1.route('/Group/Usergroup/<int:userid>')
@shopping_v1.response(500,'If an server sided error occures')
@shopping_v1.param('userid', 'Users id')
class UserGroupOperations(Resource):
    @shopping_v1.marshal_with(group)
    #@secured
    def get(self,userid):
        """
        Gets an specific Group object.

        The object is determined by the ``user_id`` in the URI.
        """
        adm = ShoppingAdministration()
        return adm.get_all_user_groups(userid)

@shopping_v1.route('/Group')
@shopping_v1.response(500,'If an server sided error occures')
class GroupListOperations(Resource):
    @shopping_v1.marshal_with(group)
    @secured
    def get(self):
        """
        Gets all Group object.
        """
        adm = ShoppingAdministration()
        return adm.get_all_groups()
    
    @shopping_v1.marshal_with(group,code=200)
    @shopping_v1.expect(group)
    @secured
    def post(self):
        """
        Creates an new group object.
        """
        adm = ShoppingAdministration()
        try:
            proposal = Group.from_dict(api.payload)
            if proposal is not None:
                c = adm.create_group(proposal.get_name(),proposal.get_description(),proposal.get_creationdate())
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
        """
        Gets an specific Group object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        return adm.get_group_by_id(id)
    
    @secured
    def delete(self,id):
        """
        Deletes an specific Group object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        grp = adm.get_group_by_id(id)
       
        adm.delete_group(grp)
        return "group and all memberships deleted",200
    
    @shopping_v1.marshal_with(group)
    @shopping_v1.expect(group,validate=True)
    @secured
    def put(self,id):
        """
        Updates an specific Group object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        c = Group.from_dict(api.payload)
        if c is not None: 
            c.set_id(id)
            adm.save_group(c)
            return 'saved',200
        else:
            return 'error',500

@shopping_v1.route('/Retailer')
@shopping_v1.response(500, "Server side error occured")
class RetailerListOperations(Resource):
    @shopping_v1.marshal_list_with(retailer)
    @secured
    def get(self):
        """
        Gets all Retailer objects.
        """
        adm = ShoppingAdministration()
        result_find_all = adm.get_all_retailers()
        return result_find_all

    @shopping_v1.marshal_with(retailer, code=200)
    @shopping_v1.expect(retailer, validate=True)
    @secured
    def post(self):
        """
        Creates an new Retailer object.
        """
        adm = ShoppingAdministration()
        try:
            proposal = Retailer.from_dict(api.payload)
            if proposal is not None:
                retailer = Retailer()
                retailer.set_id(proposal.get_id())
                retailer.set_name(proposal.get_name())
                retailer.set_location(proposal.get_location())
                if (proposal.get_id() == 0):
                    c = adm.create_retailer(retailer)
                else:
                    c = adm.save_retailer(retailer)
                return c, 200
            else:
                return "", 500

        except Exception as e:
            print(str(e))
            return str(e), 500


@shopping_v1.route('/Retailer/<int:id>')
@shopping_v1.response(500, "Server side error occured")
class RetailerOperations(Resource):
    @secured
    def delete(self, id):
        """
        Deletes an specific Retailer object.

        The object is determined by the ``id`` in the URI.
        """

        adm = ShoppingAdministration()
        cust = adm.get_retailer_by_id(id)
        adm.delete_retailer(cust)
        return '', 200


@shopping_v1.route('/report/<int:id>')
@shopping_v1.response(500,'If an server sided error occures')
@shopping_v1.param('id', 'Group objects id')
class testReportGenerator(Resource):
    @testing.marshal_with(report)
    def get(self, id):
        """
        Gets an report object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        result = adm.get_report_entries(id)
        return result


#User:

@shopping_v1.route('/User')
@shopping_v1.response(500,"If an server sided error occures")
class UserListOperations(Resource):
    @shopping_v1.marshal_list_with(user)
    #@secured can not be secured due to fetch function inside App.js
    def get(self):
        """
        Returns all User objects.
        """
        adm = ShoppingAdministration() 
        result_find_all = adm.get_all_user()
        return result_find_all
        
    @shopping_v1.marshal_with(user,code=200)
    @shopping_v1.expect(user)
    #@secured
    def post(self):
        adm = ShoppingAdministration()
        """ try:
        """
        proposal = User.from_dict(api.payload)
        if proposal is not None:
            d = adm.insert_user(proposal)

        """ if proposal is not None:
            c = adm.create_user(proposal.get_name(),proposal.get_email(),proposal.get_firebase_id())
            return c, 200 """
        
        """ except Exception as e:
            print(e)
            return str(e) """
        

# TODO: uppercase report
@shopping_v1.route('/report/<int:id>')
@shopping_v1.response(500,'If an server sided error occures')
@shopping_v1.param('id', 'Group objects id')
class testReportGenerator(Resource):
    @shopping_v1.marshal_with(report)
    @secured
    def get(self, id):
        """
        Gets an specific report object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        result = adm.get_report_entries(id)
        return result

# TODO: uppercase report

@shopping_v1.route('/report/top3Retailer/<int:id>')
@shopping_v1.response(500,'If an server sided error occures')
@shopping_v1.param('id', 'Group objects id')
class testTop3Articles(Resource):
    @secured
    def get(self, id):
        adm = ShoppingAdministration()
        result = adm.get_top3Articles(id)
        return result

        
@shopping_v1.route('/User/<int:id>')
@shopping_v1.response(500,"If an server sided error occures")
class UserIDOperations(Resource):
    @shopping_v1.marshal_with(user)
    @secured
    def get(self,id):
        """
        Gets an specific user object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        return adm.get_user_by_id(id)
    
    @secured
    def delete(self,id):
        """
        Deletes an specific user object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        usr = adm.get_user_by_id(id)
        adm.delete_user(usr)
        return "deleted",200

   
    @shopping_v1.marshal_with(user)
    @shopping_v1.expect(user,validate=True)
    @secured
    def put(self,id):
        """
        Updates an specific user object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        c = User.from_dict(api.payload)
        
        if c is not None: 
            c.set_id(id)
            adm.save_user(c)
            return 'saved',200
        else:
            return 'error',500
    
@shopping_v1.route('/User/name/<string:name>')
@shopping_v1.response(500,"If an server sided error occures")
class UserIDOperations(Resource):
    
    @shopping_v1.marshal_list_with(user)
    @secured
    def get(self,name):
        """
        Gets an specific user object.

        The object is determined by the ``name`` in the URI.
        """
        adm = ShoppingAdministration()
        usr = adm.get_user_by_name(name)
        return usr


@shopping_v1.route('/User/firebaseid/<string:firebaseid>')
@shopping_v1.response(500,"If an server sided error occures")
class UserIDOperations(Resource): 
    @shopping_v1.marshal_list_with(user)
    def get(self,firebaseid):
        """
        Gets an specific User object.

        The object is determined by the ``firebaseid`` in the URI.
        """
        adm = ShoppingAdministration()
        usr = adm.get_user_by_firebase_id(firebaseid)
        return usr


@shopping_v1.route('/User/email/<string:email>')
@shopping_v1.response(500,"If an server sided error occures")
class UserIDOperations(Resource):
    @shopping_v1.marshal_list_with(user)
    @secured
    def get(self,email):
        """
        Gets an specific user object.

        The object is determined by the ``email`` in the URI.
        """
        adm = ShoppingAdministration()
        usr = adm.get_user_by_email(email)
        return usr



#Article
@shopping_v1.route('/Article')
@shopping_v1.response(500, 'If an server sided error occures')
class ArticleOperations(Resource):
    @shopping_v1.marshal_with(article)
    @secured
    def get(self):
        adm = ShoppingAdministration()
        result = adm.get_all_article()
        return result 

    @shopping_v1.marshal_with(article,code=200)
    @shopping_v1.expect(article)
    @secured
    def post(self):
        adm = ShoppingAdministration()
        
        proposal = Article.from_dict(api.payload)
        
        if proposal is not None:
            print(proposal)
            article = Article()
            article.set_id(proposal.get_id())
            article.set_name(proposal.get_name())
            article.set_category(proposal.get_category())
            if (proposal.get_id() == 0):
                c = adm.create_article(article)
            else: 
                c = adm.save_article(article)
            return c, 200
        else:
            return "",500  


@shopping_v1.route('/Article/<int:id>')
@shopping_v1.response(500, 'If an server sided error occures')
@shopping_v1.param('id', "Article object id")
class ArticleOperations(Resource):
    @shopping_v1.marshal_with(article)
    @secured
    def get(self, id):
        """
        Gets an specific Article object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        return adm.get_article_by_id(id)

    @secured
    def delete(self, id):
        """
        Deletes an specific Article object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        ar = adm.get_article_by_id(id)
        adm.delete_article(ar)
        return 'deleted', 200


@shopping_v1.route('/Article/<string:name>')
@shopping_v1.response(500, 'If an server sided error occures')
@shopping_v1.param('name', "Article object name")
class ArticleOperations(Resource):
    @shopping_v1.marshal_with(article)
    @secured
    def get(self, name):
        """
        Gets an specific Article object.

        The object is determined by the ``name`` in the URI.
        """
        adm = ShoppingAdministration()
        return adm.get_article_by_name(name)



# @Author: Christopher Böhm
@shopping_v1.route('/shoppinglist/')
@shopping_v1.response(500, 'Server side error occured')
class ShoppingListOperations(Resource):
    @shopping_v1.marshal_list_with(shoppingList)
    @shopping_v1.param('group_id', 'ID of group to get')
    @secured
    def get(self):
        """
        Gets an specific ShoppingList object.

        The object is determined by the query parameter group_id.
        """
        group_id = request.args.get('group_id')
        adm = ShoppingAdministration()
        return adm.get_shoppinglists_by_group_id(group_id)

    @shopping_v1.marshal_with(shoppingList)
    @shopping_v1.expect(shoppingList, validate=True)
    @secured
    def post(self):
        """
        Creates an new shoppinglist object.
        """
        adm = ShoppingAdministration()
        proposal = ShoppingList.from_dict(api.payload)

        if proposal is not None:
            c = adm.insert_shoppinglist(proposal)
            return c, 200
        else:
            return "", 500

    @shopping_v1.marshal_with(shoppingList)
    @shopping_v1.expect(shoppingList, validate=True)
    @secured
    def put(self):
        """
        Update an specific shoppinglist object.
        """
        adm = ShoppingAdministration()
        proposal = ShoppingList.from_dict(api.payload)

        if proposal is not None:
            c = adm.update_shoppinglist(proposal)
            return c, 200
        else:
            return "", 500


# @Author: Christopher Boehm
@shopping_v1.route('/shoppinglist/<int:id>')
@shopping_v1.response(500, 'Server side error occured')
class ShoppingListOperations(Resource):
    @secured
    def delete(self, id):
        """
        Deletes an specific ShoppingList object.

        The object is determined by the ``id`` in the URI.
        """

        adm = ShoppingAdministration()
        slist = adm.get_shoppinglist_by_id(id)
        adm.delete_shoppinglist(slist)
        return '', 200


@shopping_v1.route('/shoppinglist/all')
@shopping_v1.response(500, 'Server side error occured')
class ShoppingListOperations(Resource):
    @secured
    def get(self):
        """Abfragen aller Shoppinglists
        """
        adm = ShoppingAdministration()
        slist = adm.get_shoppinglists()
        return slist



#FavoriteArticle:
@shopping_v1.route('/favoriteArticle')
@shopping_v1.response(500,'Server side error occured')
class FavoriteArticleListOperations(Resource):
    @secured
    @shopping_v1.marshal_with(favoriteArticle)
    def get(self):
        """
        Gets an specific favoriteArticle object.
        """
        adm = ShoppingAdministration()
        return adm.get_all_FavoriteArticles()

    @secured
    @shopping_v1.marshal_with(favoriteArticle)
    @shopping_v1.expect(favoriteArticle, validate=True)
    def post(self):
        """
        creates an new specific group object or updates an exisiting group object. 
        """
        adm = ShoppingAdministration()
        try:
            print(str(api.payload))
            proposal = FavoriteArticle.from_dict(api.payload)
            if proposal is not None:
                fav = FavoriteArticle()
                fav.set_id(proposal.get_id())
                fav.set_Group_ID(proposal.get_Group_ID())
                fav.set_Article_ID(proposal.get_Article_ID())
                fav.set_amount(proposal.get_amount())
                fav.set_unit(proposal.get_unit())
                fav.set_Retailer_ID(proposal.get_Retailer_ID())
                fav.set_creationdate(proposal.get_creationdate())
                
                """ Upadates if proposal id != 0 """ 

                if (proposal.get_id() == 0):
                    c = adm.insert_FavoriteArticle(fav)
                   
                else:
                    c = adm.update_FavoriteArticle(fav)
                    
                return c, 200
            else:
                return "", 500

        except Exception as e:
            print(str(e))
            return str(e), 500


@shopping_v1.route('/favoriteArticle/groupid/<int:id>')
@shopping_v1.response(500,'Server side error occured')
@shopping_v1.param('id', 'Group objects id')
class FavoriteArticleGroupOperations(Resource):
    @secured
    @shopping_v1.marshal_with(favoriteArticle)
    def get(self,id):
        """
        Gets an specific FavoriteArticle object.

        The object is determined by the ``group_id`` in the URI.
        """

        adm = ShoppingAdministration()
        return adm.get_FavoriteArticles_by_groupid(id)


@shopping_v1.route('/favoriteArticle/id/<int:id>')
@shopping_v1.response(500,'Server side error occured')
@shopping_v1.param('id', 'FA objects id')
class FavoriteArticleOperations(Resource):
    @secured
    @shopping_v1.marshal_with(favoriteArticle)
    def get(self,id):
        """
        Gets an specific FavoriteArticle object.

        The object is determined by the ``id`` in the URI.
        """

        adm = ShoppingAdministration()
        return adm.get_FavoriteArticle_by_id(id)

    @secured
    @shopping_v1.marshal_with(favoriteArticle)
    def delete(self,id):
        """
        Deletes an specific FavoriteArticle object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        fa = adm.get_FavoriteArticle_by_id(id)
        adm.delete_FavoriteArticle(fa)



#ListEntry
#author Niklas Denneler, Pascal Illg
@shopping_v1.route('/Listentry/allListEntry')
@shopping_v1.response(500, 'If an server sided error occures')
class testListEntry(Resource):
    @shopping_v1.marshal_with(listentry)
    @secured
    def get(self):
        """
        Read out all the listentry objects.
        
        If no listentry objects are available, an empty sequence is returned.
        """

        adm = ShoppingAdministration()
        result = adm.get_all_listentries()
        return result


@shopping_v1.route('/Listentry/byKey/<int:key>')
@shopping_v1.response(500, 'If an server sided error occures')
@shopping_v1.param('key', "Listentry object id")
class testListEntry(Resource):
    @shopping_v1.marshal_with(listentry)
    @secured
    def get(self, key):
        """
        Gets an specific ListEntry object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        result = adm.find_listentry_by_key(key)
        return result


@shopping_v1.route('/Listentry/find_by_retailer/<int:retailer>')
@shopping_v1.response(500, 'Mach me so hamme kein stress')
@shopping_v1.param('retailer', "Listentry retailer id")
class testListEntry(Resource):
    @shopping_v1.marshal_with(listentry)
    @secured
    def get(self, retailer): 
        """
        Gets an specific ListEntry object.

        The object is determined by the ``retailer_id`` in the URI.
        """

        adm = ShoppingAdministration()
        result = adm.find_listentry_by_retailer(retailer)
        return result


@shopping_v1.route('/Listentry/find_by_date/<int:user>')
@shopping_v1.response(500, 'If an server sided error occures')
@shopping_v1.param('key', "User object id")
class testListEntry(Resource):
    @shopping_v1.marshal_with(listentry)
    @secured
    def get(self, user):
        """
        Gets an specific ListEntry object.

        The object is determined by the ``user_id`` in the URI.
        """

        adm = ShoppingAdministration()
        result = adm.find_listentry_by_purchaser(user)
        return result


@shopping_v1.route('/Listentry/find_by_purchaser/ <int:purchaser>')
@shopping_v1.response(500, 'Mach me so hamme kein stress')
@shopping_v1.param('purchaser', "Listentry purchaser id")
class testListEntry(Resource):
    @shopping_v1.marshal_list_with(listentry)
    @secured
    def get(self, purchaser):
        """
        Gets an specific ListEntry object.

        The object is determined by the ``purchaser_id`` in the URI.
        """

        adm = ShoppingAdministration()
        result = adm.find_listentry_by_purchaser(purchaser)
        return result


@shopping_v1.route('/Listentry')
@shopping_v1.response(500, 'Server side error occured')
class ShoppingListOperations(Resource):
    @secured
    def delete(self):
        """
        Delete an specific Listentry 

        """
        idl = request.args.get('id')
        adm = ShoppingAdministration()
        Listentry = adm.find_listentry_by_key(idl)
        adm.delete_listentry(Listentry)
        return '', 200


@shopping_v1.route('/Listentry/insert')
@shopping_v1.response(500, 'If an server sided error occures')
#@shopping_v1.param('obj', "Listentry object id")
class testListEntry(Resource):
    @shopping_v1.marshal_with(listentry, skip_none=True)
    @secured
    def post(self):
        """
        Creates an specific ListEntry object.

        """
        adm = ShoppingAdministration()
        proposal = ListEntry.from_dict(api.payload)
      
        if proposal is not None: 
            le = ListEntry()
            le.set_id(proposal.get_id())
            le.set_article(proposal.get_article())
            le.set_retailer(proposal.get_retailer())
            le.set_user(proposal.get_user())
            le.set_amount(proposal.get_amount())
            le.set_unit(proposal.get_unit())
            le.set_buy_date(proposal.get_buy_date())
            le.set_group(proposal.get_group())
            le.set_shoppinglist(proposal.get_shoppinglist())
         
            res = adm.insert_listentry(le)
        
            return res, 200
        else:
            return "", 500


@shopping_v1.route('/Listentry/get_personal_items_of_group')
@shopping_v1.response(500, 'If an server sided error occures')
@shopping_v1.param('user_id', "User_ID")
@shopping_v1.param('group_id', "Group_ID")
class testListEntry(Resource):
    @shopping_v1.marshal_list_with(listentry)
    @secured
    def get(self):
        """
        Gets an specific ListEntry object.

        The object is determined by the query parameters group_id and user_id.
        """

        user_id = request.args.get('user_id')
        group_id = request.args.get('group_id')
        adm = ShoppingAdministration()
        return adm.get_personal_items_of_group(user_id, group_id)


@shopping_v1.route('/Listentry/get_items_of_group')
@shopping_v1.response(500, 'If an server sided error occures')
@shopping_v1.param('group_id', "Group_ID")
@shopping_v1.param('shoppinglist_id', "Shoppinglist_ID")
class testListEntry(Resource):
    @shopping_v1.marshal_with(listentry)
    @secured
    def get(self):
        """
        Gets an specific ListEntry object.

        The object is determined by the query parameters group_id and shoppinglist_id.
        """

        group_id = request.args.get('group_id')
        shoppinglist_id = request.args.get('shoppinglist_id')
        adm = ShoppingAdministration()
        result = adm.get_items_of_group(group_id, shoppinglist_id)
        return result


@shopping_v1.route('/Listentry/update')
@shopping_v1.response(500, 'If an server sided error occures')
@testing.param('listentry', "Listentry object")
class testListEntry(Resource):
    @shopping_v1.marshal_with(listentry, code= 200, skip_none=True)
    @shopping_v1.expect(listentry)
    @secured
    def post(self):
        """
        updates an exisiting ListEntry object.

        """
        
        adm = ShoppingAdministration()
        proposal = ListEntry.from_dict(api.payload)
        print(proposal)
        
        if proposal is not None: 
            le = ListEntry()
            le.set_id(proposal.get_id())
            le.set_article(proposal.get_article())
            le.set_retailer(proposal.get_retailer())
            le.set_user(proposal.get_user())
            le.set_amount(proposal.get_amount())
            le.set_unit(proposal.get_unit())
            le.set_buy_date(proposal.get_buy_date())
            le.set_group(proposal.get_group())
            le.set_shoppinglist(proposal.get_shoppinglist())
         
            if (proposal.get_id() == 0):
                res = adm.insert_listentry(le)
            else: 
                res = adm.update_listentry(le)
            print(res)
            return res, 200
        else:
            return "", 500



# TESTING AREA:
@testing.route('/testSecured')
class testSecured(Resource):
    #@secured
    def get(self):
        res = "if you can see this without beeing logged in.. backend dev has got a problem."
        return res


#GroupListTests

@testing.route('/testGroup')
@testing.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class testGroupListOperations(Resource):
    @testing.marshal_with(group)
    #@secured
    def get(self):
        adm = ShoppingAdministration()
        result = adm.get_all_groups(id) # hier dann die id aus der payload
        return result


@testing.route('/testGroup/<int:id>')
@testing.param('id', "Group object id")
class testGroupOperations(Resource):
    @testing.marshal_with(group)
    #@secured
    def get(self,id):
        """
        Gets an specific ListEntry object.

        The object is determined by the ``id`` in the URI.
        """
        adm = ShoppingAdministration()
        return adm.get_group_by_id(id)

    def delete(self,id):
        """
        deletes an specific ListEntry object.

        The object is determined by the ``id`` in the URI.
        """

        adm = ShoppingAdministration()
        gr = adm.get_group_by_id(id)
        adm.delete_group(gr)
            
if __name__ == '__main__':
    app.run(debug=True)