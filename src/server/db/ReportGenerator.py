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
            statement = "SELECT * FROM table WHERE group_id = {group} AND time = {time} AND retailer = {retailer}".format(group, time, retailer)
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