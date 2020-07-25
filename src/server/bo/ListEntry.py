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
        self._article_id = None # Foreign key relationship to the ID of the article
        self._retailer_id = None # Foreign key relationship to the ID of the retailer
        self._shoppinglist_id = None # Foreign key relationship to the ID of the shoppinglist
        self._user_id = None # Foreign key relationship to the ID of the user
        self._group_id = None # Foreign key relationship to the ID of the group
        self._amount = None # Amount of the article 
        self._unit = None # Unit of the article 
        self._bought = None # date on which the article was purchased
        self._name = None # Foreign key relationship to the name of the article
        self._category = None # Foreign key relationship to the category of the article
        self._retailer = None #Foreign key relationship to the name of the retailer
        self._creationdate = None # creation date of the ListEntry 

    def get_creationdate(self):
        """
        Pascal
        gets the creationdate of the ListEntry
        """
        return self._creationdate
    
    def set_creationdate(self, cd):
        """
        Niklas
        sets the creationdate of the ListEntry
        """
        self._creationdate = cd

    def get_article(self):
        """
        Pascal
        gets the ID of the article
        """
        return self._article_id
    
    def set_article(self, article):
        """
        Niklas
        sets the ID of the article
        """
        self._article_id = article

    def get_retailer(self):
        """
        Niklas
        gets the name of the retailer
        """
        return self._retailer

    def set_retailer(self, retailer):
        """
        Pascal retailer:Retailer
        sets the name of the retailer
        """
        self._retailer = retailer

    def get_retailer_id(self):
        """
        Niklas
        gets the ID of the retailer
        """
        return self._retailer_id

    def set_retailer_id(self, retailer):
        """
        Pascal retailer:Retailer
        sets the id of the retailer
        """
        self._retailer_id = retailer

    def get_purchaser(self):
        """
        Pascal
        gets the name of the purchaser
        """
        return self._user_id

    def set_purchaser(self, purchaser):
        """
        Niklas purchaser:User
        sets the name of the purchaser
        """
        self._user_id = purchaser
    
    def get_name(self):
        """
        Pascal
        gets the name of the article
        """
        return self._name

    def set_name(self, article):
        """
        Niklas 
        sets the name of the article
        """
        self._name = article
    
    def get_category(self):
        """
        Pascal
        gets the name of the category 
        """
        return self._category
    
    def set_category(self, category):
        """
        Niklas 
        set the name of the category 
        """
        self._category = category
    

    #renamed from class diagramm quantity to amount to have the same words ;)
    def get_amount(self):
        """
        Pascal amount:int
        get the amount of the article
        """
        return self._amount

    def set_amount(self, amount):
        """
        Niklas amount:int
        sets the amount of the article
        """
        self._amount = amount
    
    def get_unit(self):
        """
        Pascal unit:str
        gets the unit of the article 
        """
        return self._unit
    
    def set_unit(self, unit):
        """
        Niklas unit:str
        sets the unit of the article
        """
        self._unit = str(unit)

    def get_buy_date(self):
        """
        Niklas date:Date
        gets the date on which the article was purchased
        """
        return self._bought
    
    def set_buy_date(self, bought):
        """
        Pascal date:Date
        sets the date on which the article was purchased
        """
        self._bought = bought

    def get_group(self):
        """
        Niklas 
        gets the ID of the group which the listentry is assigned to
        """
        return self._group_id

    def set_group(self, group):
        """
        Pascal
        sets the ID of the group which the listentry is assigned to
        """
        self._group_id = group

    def get_user(self):
        """
        Niklas
        gets the ID of the User which the Listentry is assigned to
        """
        return self._user_id

    def set_user(self, user):
        """
        Niklas
        sets the ID of the User which the Listentry is assigned to
        """
        self._user_id = user
    
    def get_shoppinglist(self):
        """
        Niklas
        gets the ID of the shoppinglist which the Listentry is assigned to
        """
        return self._shoppinglist_id
    
    def set_shoppinglist(self, shoppinglist):
        """
        Pascal
        sets the ID of the shoppinglist which the Listentry is assigned to
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
        obj.set_buy_date(None)
        obj.set_name(dictionary["name"])
        obj.set_category(dictionary["category"])

        return obj

    
