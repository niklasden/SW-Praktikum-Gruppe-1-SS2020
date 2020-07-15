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
        self._unit = ""
        self._bought = ""
        self._name = ""
        self._category = ""
        self._retailer = ""
        self._creationdate = None

    def get_creationdate(self):
        return self._creationdate
    
    def set_creationdate(self, cd):
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
        return self._retailer

    def set_retailer(self, retailer):
        """
        Pascal retailer:Retailer
        """
        self._retailer = retailer

    def get_retailer_id(self):
        """
        Niklas
        """
        return self._retailer_id

    def set_retailer_id(self, retailer):
        """
        Pascal retailer:Retailer
        """
        self._retailer_id = retailer

    def get_purchaser(self):
        """
        Pascal
        """
        return self._user_id

    def set_purchaser(self, purchaser):
        """
        Niklas purchaser:User
        """
        self._user_id = purchaser
    
    def get_name(self):
        """
        Pascal
        """
        return self._name

    def set_name(self, article):
        """
        Niklas 
        """
        self._name = article
    
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
        Pascal unit:str
        """
        return self._unit
    
    def set_unit(self, unit):
        """
        Niklas unit:str
        """
        self._unit = str(unit)

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
    
    def set_buy_date(self, bought):
        """
        Pascal date:Date
        """
        self._bought = bought

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
        return str(self._id)
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein ListEntry()."""
        obj = ListEntry()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_article(dictionary["article_id"])
        obj.set_retailer(dictionary["retailer_id"])
        obj.set_shoppinglist(dictionary["shoppinglist_id"])
        obj.set_user(dictionary["user_id"])
        obj.set_group(dictionary["group_id"])
        obj.set_amount(dictionary["amount"])
        obj.set_unit(dictionary["unit"])
        obj.set_buy_date(dictionary["bought"])
        obj.set_name(dictionary["name"])
        obj.set_category(dictionary["category"])

        return obj

    
