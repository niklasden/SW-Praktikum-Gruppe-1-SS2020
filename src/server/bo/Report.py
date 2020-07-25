from server.bo import BusinessObject as bo

class Report(bo.BusinessObject):
    """
    author: Kevin Eberhardt
    """
    def __init__(self, report_group, report_retailer, report_listentries):
        super().__init__()
        self._report_group = report_group #name of the group
        self._report_retailer = report_retailer #array of retailers
        self._report_listentries = report_listentries # array of listentries
        self._top_articles = [] # top 3 articles
        self._top_retailers = [] # top 3 retailers

    def set_top_articles(self, articles):
        """
        setter for top_articles
        """
        self._top_articles = articles

    def set_top_retailers(self, retailers):
        """
        setter for top_retailers
        """
        self._top_retailers = retailers

    def get_top_articles(self):
        """
        Getter for top_articles of group
        :return: array of articles
        """
        return self._top_articles

    def get_top_retailers(self):
        """
        Getter for top_retailers of group
        :return: array of retailers
        """
        return self._top_retailers

    def get_group(self):
        """
        Getter for group
        :return: string name of group
        """
        return self._report_group

    def set_group(self, group):
        """
        setter for name of group
        """
        self._report_group = group

    def get_retailer(self):
        """
        Getter for retailers of group
        :return: array of retailers
        """
        return self._report_retailer

    def set_retailer(self, rt):
        """
        setter for retailers of group
        """
        self._report_retailer = rt

    def get_listentries(self):
        """
        Getter for listentries of group
        :return: array of listentries
        """
        return self._report_listentries

    def set_listentries(self, liste):
        """
        setter for listentries
        """
        self._report_listentries = liste

    def append_listentries(self, entry):
        """
        append listentries with one entry
        """
        self._report_listentries.append(entry)
