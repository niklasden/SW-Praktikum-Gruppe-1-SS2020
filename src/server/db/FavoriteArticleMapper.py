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
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID,Group_ID,Article_ID,amount,unit,Retailer_ID,creationdate from FavoriteArticle WHERE ID ={}".format(key))  
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


    def find_by_group(self,gid):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT ID,Group_ID,Article_ID,amount,unit,Retailer_ID,creationdate from FavoriteArticle WHERE Group_ID ={}".format(gid))  
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
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM `FavoriteArticle`")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            if maxid[0]:
                fav_article.set_id(maxid[0]+1)
            else:
                fav_article.set_id(1)
        
        command = "INSERT INTO `FavoriteArticle` (ID,Group_ID,Article_ID,amount,unit,Retailer_ID,creationdate) VALUES ({0},{1},{2},{3},{4},{5},NOW())".format(fav_article.get_id(),fav_article.get_Group_ID(),fav_article.get_Article_ID(),fav_article.get_amount(),fav_article.get_unit(),fav_article.get_Retailer_ID())
                
        try: 
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return fav_article

        except Exception as e:
            cursor.close()
            return "Error in FavoriteArticleMapper while inserting: "+str(e)
    

    def update(self, fav_article):
       
        try:
            cursor = self._cnx.cursor()
            command = "UPDATE FavoriteArticle " + "SET Group_ID={0}, SET Article_ID={1}, SET amount={2},SET unit={3},SET Retailer_ID={4}".format(fav_article.get_Group_ID(),fav_article.get_Article_ID(),fav_article.get_amount(),fav_article.get_unit(),fav_article.get_Retailer_ID())

            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return fav_article

        except Exception as e:
            return "Error in update FavoriteArticle FavoriteArticleMapper: " + str(e)

    def delete(self, fa):
        
        try:
            cursor = self._cnx.cursor()
            command = "DELETE FROM `FavoriteArticle` WHERE ID={0}".format(fa.get_id())
            cursor.execute(command)

            self._cnx.commit()
            cursor.close()

            return "FavoriteARticle deleted"

        except Exception as e:
            return "Error in delete FavArticle FavoriteArticleMapper: " + str(e)

    