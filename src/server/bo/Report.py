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