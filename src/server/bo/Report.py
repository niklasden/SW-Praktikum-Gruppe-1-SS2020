from server.bo import BusinessObject as bo

class Report(bo.BusinessObject):
    """
    author: Kevin Eberhardt
    """
    def __init__(self, report_group, report_retailer, report_listentries):
        super().__init__()
        self._report_group = report_group #name of the group
        self._report_retailer = report_retailer #retailer 
        self._report_listentries = report_listentries #
        self._top_articles = []
        self._top_retailers = []

    def set_top_articles(self, articles):
        self._top_articles = articles

    def set_top_retailers(self, retailers):
        self._top_retailers = retailers

    def get_top_articles(self):
        return self._top_articles

    def get_top_retailers(self):
        return self._top_retailers

    def get_group(self):
        return self._report_group

    def set_group(self, group):
        self._report_group = group

    def get_retailer(self):
        return self._report_retailer

    def set_retailer(self, rt):
        self._report_retailer = rt

    def get_listentries(self):
        return self._report_listentries

    def set_listentries(self, liste):
        self._report_listentries = liste

    def append_listentries(self, entry):
        self._report_listentries.append(entry)
