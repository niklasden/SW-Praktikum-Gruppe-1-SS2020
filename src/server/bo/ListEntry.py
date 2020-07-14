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
        self._id = 0
        self._article_id = 0
        self._retailer_id = 0
        self._shoppinglist_id = 0
        self._user_id = 0
        self._group_id = 0
        self._amount = 0
        self._unit = 0
        self._bought = ""
        self._article_name = ""
        self._category = ""
        self._retailer = ""
        self._creationdate = None

    def get_creationdate(self):
        return self._creationdate
    def set_creationdate(self,cd):
        self._creationdate = cd

    def get_id(self):
        return self._id
    #this needs some more thinking
    def set_id(self, id):
        self._id = id

    def get_article(self):
        """
        Niklas
        """
        return self._article_id
    
    def set_article(self, article):
        """
        Niklas
        """
        self._article_id = article

    def get_retailer(self):
        """
        Niklas
        """
        return self._retailer_id

    def set_retailer(self, retailer):
        """
        Pascal retailer:Retailer
        """
        self._retailer_id = retailer

    def get_purchaser(self):
        """
        Pascal
        """
        return self._purchaser

    def set_purchaser(self, purchaser):
        """
        Niklas purchaser:User
        """
        self._user_id = purchaser
    
    def get_article_name(self):
        """
        Pascal
        """
        return self._article_name

    def set_article_name(self, article):
        """
        Niklas 
        """
        self._article_name = article
    
    def get_category(self):
        """
        Pascal
        """
        return self._category
    
    def set_category(self, category):
        """
        Niklas 
        """
        self._category = category
    
    def get_retailer(self):
        """
        Pascal
        """
        return self._retailer
    
    def set_retailer(self, retailer):
        """
        Niklas 
        """
        self._retailer = retailer


    #renamed from class diagramm quantity to amount to have the same words ;)
    def get_amount(self):
        """
        Pascal amount:int
        """
        return self._amount

    def set_amount(self, amount):
        """
        Niklas amount:int
        """
        self._amount = amount
    
    def get_unit(self):
        """
        Pascal unit:int
        """
        return self._unit
    
    def set_unit(self, unit):
        """
        Niklas unit:int
        """
        self._unit = unit

    def get_checkout(self):
        """
        Pascal setcheck bool to true? or set date
        """
        return self._checkout

    def set_checkout(self, checkout):
        """
        Pascal setcheck bool to true? or set date
        """
        self._checkout = checkout

    def get_buy_date(self):
        """
        Niklas quantity:int
        """
        return self._bought
    
    def set_buy_date(self, date):
        """
        Pascal date:Date
        """
        self._bought = date

    def get_group(self):
        """
        Niklas 
        """
        return self._group_id

    def set_group(self, group):
        """
        Pascal
        """
        self._group_id = group

    def get_user(self):
        """
        Niklas
        """
        return self._user_id

    def set_user(self, user):
        """
        Niklas
        """
        self._user_id = user
    
    def get_shoppinglist(self):
        """
        Niklas
        """
        return self._shoppinglist_id
    
    def set_shoppinglist(self, shoppinglist):
        """
        Pascal
        """
        self._shoppinglist_id = shoppinglist
    
    def __str__(self):
        return str(self._id) + " " + self._article_id
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = ListEntry()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_article(dictionary["article_id"])
        obj.set_retailer(dictionary["retailer_id"])
        obj.set_shoppinglist(dictionary["shoppinglist_id"])
        obj.set_user(dictionary["user_id"])
        obj.set_group(dictionary["group_id"])
        obj.set_amount(dictionary["amount"])
        obj.set_buy_date(dictionary["bought"])

        return obj