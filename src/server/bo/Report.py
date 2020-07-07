from server.bo import BusinessObject as bo


class Report(bo.BusinessObject):
    """
    author: Kevin Eberhardt
    """
    def __init__(self, report_group, time_period, report_retailer, report_listentries):
        super().__init__()
        self.report_group = report_group
        self.time_period = time_period
        self.report_retailer = report_retailer
        self.report_listentries = report_listentries

    def get_group(self):
        pass

    def set_group(self, group):
        pass

    def get_time_period(self):
        pass

    def set_time_period(self, tp):
        pass

    def get_retailer(self):
        pass

    def set_retailer(self, rt):
        pass

    def get_listentries(self):
        pass

    def set_listentries(self, liste):
        pass
    def append_listentries(self, entry):
        pass