from server.db.Mapper import Mapper
from server.bo.Report import Report

class ReportGenerator(Mapper):
    """
    Author: Kevin Eberhardt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_key(self, key):
        pass

    def insert(self, object):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass

    def get_report(self, group_id):
        """
        Author: Kevin Eberhardt
        """
        result = []
        retailers = []
        articles = []
        cursor = self._cnx.cursor()
        statement = "SELECT r.name as 'Retailer Name', r.location as 'Retailer Location',  s.name as 'Shoppinglist Name', u.name as 'Username', g.name as 'Group Name', l.amount as 'Amount', l.bought as 'Bought', a.name as 'Article Name' FROM dev_shoppingproject.Listentry as l INNER JOIN dev_shoppingproject.Article as a ON l.Article_ID = a.ID INNER JOIN dev_shoppingproject.Retailer as r ON l.Retailer_ID = r.ID INNER JOIN dev_shoppingproject.Shoppinglist as s ON l.Shoppinglist_ID = s.ID INNER JOIN dev_shoppingproject.User as u ON l.User_ID = u.ID INNER JOIN dev_shoppingproject.Group as g ON l.Group_ID = g.ID WHERE l.Group_ID = {0}".format(group_id)
        cursor.execute(statement)
        tuples = cursor.fetchall()
        try:
            for(retailer, retailer_location, shoppinglist_name, username, group_name, amount, bought, article_name) in tuples:
                article = {"name": article_name, "amount": amount, "bought": bought}
                articles.append(article)
                if(retailer not in retailers):
                    retailer = {"name": retailer, "location": retailer_location}
                    retailers.append(retailer)
                report = Report(group_name, retailers, articles)
                result.append(report)
            self._cnx.commit()
        except:
            print("Error while fetching report tuple! Something's wrong with the database-result!")
        finally:
            cursor.close()
            return result

    def get_top3_retailer(self, group_id):
        result = []
        cursor = self._cnx.cursor()
        statement = "SELECT r.name, r.location, amount, bought FROM dev_shoppingproject.Listentry as l INNER JOIN dev_shoppingproject.Retailer as r ON l.Retailer_ID = r.ID WHERE l.Group_ID = {0} ORDER BY amount DESC LIMIT 3;".format(group_id)
        cursor.execute(statement)
        tuples = cursor.fetchall()
        try:
            for (retailer_name, retailer_location, amount, bought) in tuples:
                retailer_json = {"retailer_name": retailer_name, "retailer_location": retailer_location, "amount": str(amount), "bought": bought}
                result.append(retailer_json)
            self._cnx.commit()
        finally:
            cursor.close()
            print(result)
            return result
    def get_top3_products(self, group_id):
        pass