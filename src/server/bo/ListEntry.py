from server.bo import BusinessObject as bo


class ListEntry(bo.BusinessObject):
    """
    author: Pascal & Niklas
    @passer Teilweise sind die Methoden nicht mit dennen im Klassendiagramm konsistent, das müssen wir noch erweitern
    Außerdem müssen wir uns bei amount irgendwas einfallen lassen, wird dort einfach eine Zahl gespeichert, dann brauchen wir noch ein Spalte für die Einheit
    ID attribute needs to be removed
    
    ToDo: Klassendiagramm aktualisieren
    Attributes
    ----------
    _article_id: int
        the id of the corresponding article object
    _retailer_id: int
        the id of the assigned retailer
    _shoppinglist_id: int
        the id of the assigned shoppinglist
    _user_id: int
        the unique id of assiged user (which is supposed to buy the article)
    _group_id: int 
        the unique id of the assigned group
    _amount: str
        the amount which should be bought of a specific article
    _unit: str
        the unit in which the product is measured
    _bought: Date
        the date when the article was bought
    _name: str
        the name of the article which the user wants to buy
    _category: str
        the category which an article is assigned to.
    _retailer: str
        the retailer which the article is supposed to be bought at
    _creationdate: DateTime
        the date the object has been created
    """
    def __init__(self):
        super().__init__()
        self._article_id = None
        self._retailer_id = None
        self._shoppinglist_id = None
        self._user_id = None
        self._group_id = None
        self._amount = None
        self._unit = None
        self._bought = None
        self._name = None
        self._category = None
        self._retailer = None
        self._creationdate = None

    def get_creationdate(self):
        """
        Niklas
        """
        return self._creationdate
    
    def set_creationdate(self, cd):
        """
        Niklas
        """
        self._creationdate = cd

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
        Niklas date:Date
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

    
