from server.db.Mapper import Mapper
from server.bo.Report import Report

class ReportGenerator(Mapper):
    """
    Author: Kevin Eberhardt
    """

    def __init__(self):
        super().__init__()

    def get_list_entries(self, group, time, retailer):
        """
        Author: Kevin Eberhardt
        """
        result = []
        cursor = self._cnx.cursor()
        try:
            statement = "SELECT l.ID, r.name as 'Retailer Name', s.name as 'Shoppinglist Name', u.name as 'Username', g.name as 'Group Name', l.amount, l.bought, a.name as 'Article Name'" \
                        "FROM dev_shoppingproject.Listentry as l" \
                        "INNER JOIN dev_shoppingproject.Article as a ON l.Article_ID = a.ID" \
                        "INNER JOIN dev_shoppingproject.Retailer as r ON l.Retailer_ID = r.ID" \
                        "INNER JOIN dev_shoppingproject.Shoppinglist as s ON l.Shoppinglist_ID = s.ID" \
                        "INNER JOIN dev_shoppingproject.User as u ON l.User_ID = u.ID" \
                        "INNER JOIN dev_shoppingproject.Group as g ON l.Group_ID = g.ID" \
                        "WHERE l.Group_ID = 1 AND Retailer_ID = 2"
            """statement = "select * from dev_shoppingproject.listentry where group_id = {group} and time = {time} and retailer = {retailer}".format(group, time, retailer) """
            cursor.execute(statement)
        except:
            print("An error has occured while fetching list_entries!")

    def generate_report(self, entries):
        """
        Author: Kevin Eberhardt
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from statistic")
        tuples = cursor.fetchall()
        try:
            for (id, group, time_period, retailer, products) in tuples:
                report = Report(group, time_period, retailer, products)
                result.append(report)
            self._cnx.commit()
        except:
            print("Error while fetching report tuple! Something's wrong with the database-result!")
        finally:
            cursor.close()
            return result