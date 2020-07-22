from server.bo.FavoriteArticle import FavoriteArticle
from server.db.Mapper import Mapper 

class FavoriteArticleMapper(Mapper):
    """
    Mapper for the FavoriteArticle BO  
    By: Julius
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        get all favorite articles from database
        :return: a list of of favorite articles bos
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID,Group_ID,Article_ID,amount,unit,Retailer_ID,creationdate from FavoriteArticle")
        tuples = cursor.fetchall()
        try:
            for(id,groupid,articleid,amount,unit,retailer,cd) in tuples:
                fa = FavoriteArticle()
                fa.set_id(id)
                fa.set_Group_ID(groupid)
                fa.set_Article_ID(articleid)
                fa.set_amount(amount)
                fa.set_unit(unit)
                fa.set_Retailer_ID(retailer)
                fa.set_creationdate(cd)
                result.append(fa)

        except IndexError:
            result = None
        self._cnx.commit()
        cursor.close()
        return result


    def find_by_key(self, key):
        """
        get a specific favorite article by id from database
        :return: a favorite articles bo
        """
        result = None 
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID,Group_ID,Article_ID,amount,unit,Retailer_ID,creationdate from FavoriteArticle WHERE ID={0}".format(key))  
        tuples = cursor.fetchall()
        
        try:
            (id,groupid,articleid,amount,unit,retailer,cd) = tuples[0]
            fa = FavoriteArticle()
            fa.set_id(id)
            fa.set_Group_ID(groupid)
            fa.set_Article_ID(articleid)
            fa.set_amount(amount)
            fa.set_unit(unit)
            fa.set_Retailer_ID(retailer)
            fa.set_creationdate(cd)
            result = fa

        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def find_by_group(self,gid):
        """
        get all favorite articles with of one group from database
        :return: a list of of favorite articles bos
        """
        
        result = []
        cursor = self._cnx.cursor()
        
        cursor.execute("SELECT ID,Group_ID,Article_ID,amount,unit,Retailer_ID,creationdate from FavoriteArticle WHERE `Group_ID`={0}".format(gid))   
        
        tuples = cursor.fetchall()
        
        try:
            for(id,groupid,articleid,amount,unit,retailer,cd) in tuples:
                fa = FavoriteArticle()
                fa.set_id(id)
                fa.set_Group_ID(groupid)
                fa.set_Article_ID(articleid)
                fa.set_amount(amount)
                fa.set_unit(unit)
                fa.set_Retailer_ID(retailer)
                fa.set_creationdate(cd)
                result.append(fa)

        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def insert(self,fav_article):
        """
        write a favorite article into the db
        :return: a favorite articles bo
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM `FavoriteArticle`")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            if maxid[0]:
                fav_article.set_id(maxid[0]+1)
            else:
                fav_article.set_id(1)
        
        command = "INSERT INTO FavoriteArticle (`ID`,`Group_ID`,`Article_ID`,`amount`,`unit`,`Retailer_ID`,`creationdate`) VALUES ({0},{1},{2},{3},'{4}',{5},NOW())".format(fav_article.get_id(),fav_article.get_Group_ID(),fav_article.get_Article_ID(),fav_article.get_amount(),fav_article.get_unit(),fav_article.get_Retailer_ID())
          
        try: 
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return fav_article

        except Exception as e:
            cursor.close()
            return "Error in FavoriteArticleMapper while inserting: "+str(e)
    

    def update(self, fav_article):
        """
        update a favorite article in the db 
        :return: a favorite articles bo
        """

        try:
            cursor = self._cnx.cursor()
            command = "UPDATE FavoriteArticle " + "SET Group_ID={0}, Article_ID={1}, amount={2}, unit='{3}', Retailer_ID={4} WHERE ID={5}".format(fav_article.get_Group_ID(),fav_article.get_Article_ID(),fav_article.get_amount(),fav_article.get_unit(),fav_article.get_Retailer_ID(),fav_article.get_id())
            
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return fav_article

        except Exception as e:
            return "Error in update FavoriteArticle FavoriteArticleMapper: " + str(e)

    def delete(self, fa):
        """
        delete a favorite article from the db
        :return: str
        """
        print(str(fa))
        try:
            cursor = self._cnx.cursor()
            command = "DELETE FROM `FavoriteArticle` WHERE ID={0}".format(fa.get_id())
            cursor.execute(command)

            self._cnx.commit()
            cursor.close()

            return "FavoriteARticle deleted"

        except Exception as e:
            return "Error in delete FavArticle FavoriteArticleMapper: " + str(e)

    