from server.bo import BusinessObject as bo


class Report(bo.BusinessObject):
    """
    author: Kevin Eberhardt
    """
    def __init__(self, report_group, report_retailer, report_listentries):
        super().__init__()
        self._report_group = report_group
        self._report_retailer = report_retailer
        self._report_listentries = report_listentries

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