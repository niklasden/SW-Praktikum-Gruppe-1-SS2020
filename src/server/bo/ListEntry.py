from server.bo import BusinessObject as bo


class ListEntry(bo.BusinessObject):
    """
    author: Pascal & Niklas
    @passer Teilweise sind die Methoden nicht mit dennen im Klassendiagramm konsistent, das müssen wir noch erweitern
    Außerdem müssen wir uns bei amount irgendwas einfallen lassen, wird dort einfach eine Zahl gespeichert, dann brauchen wir noch ein Spalte für die Einheit
    
    ToDo: Kommentieren, Klassendiagramm aktualisieren, Spalte "Einheit/Unit" hinzufügen?
    """
    def __init__(self):
        super().__init__()
        self._id = ""
        self._article_id = ""
        self._retailer_id = ""
        self._shoppinglist_id = ""
        self._user_id = ""
        self._group_id = ""
        self._amount = ""
        self._bought = ""

    #this was renamed from get name to article, makes more sense imho
    def get_id():
        return self._id
    #this needs some more thinking
    def set_id(self, id):
        self._id = id

    def get_article():
        """
        Niklas
        """
        return self._article_id
    
    def set_article(self, article):
        """
        Niklas
        """
        self._article_id = article

    def get_retailer():
        """
        Niklas
        """
        return self._retailer_id

    def set_retailer(self, retailer):
        """
        Pascal retailer:Retailer
        """
        self._retailer_id = retailer

    def get_purchaser():
        """
        Pascal
        """
        return self._purchaser

    def set_purchaser(self, purchaser):
        """
        Niklas purchaser:User
        """
        self._user_id = purchaser

    #renamed from class diagramm quantity to amount to have the same words ;)
    def get_amount():
        """
        Pascal amount:int
        """
        return self._amount

    def set_amount(self, amount):
        """
        Niklas amount:int
        """
        self._amount = amount

    def get_checkout():
        """
        Pascal setcheck bool to true? or set date
        """
        return self._checkout

    def set_checkout(self, checkout):
        """
        Pascal setcheck bool to true? or set date
        """
        self._checkout = checkout

    def get_buy_date():
        """
        Niklas quantity:int
        """
        return self._bought
    
    def set_buy_date(self, date):
        """
        Pascal date:Date
        """
        self._bought = date

    def get_group():
        """
        Niklas 
        """
        return self._group_id

    def set_group(self, group):
        """
        Pascal
        """
        self._group_id = group

    def get_user():
        """
        Niklas
        """
        return self._user_id

    def set_user(self, user):
        """
        Niklas
        """
        self._user_id = user
    
    def get_shoppinglist():
        """
        Niklas
        """
        return self._shoppinglist_id
    
    def set_shoppinglist(self, shoppinglist):
        """
        Pascal
        """
        self._shoppinglist_id = shoppinglist
    

        