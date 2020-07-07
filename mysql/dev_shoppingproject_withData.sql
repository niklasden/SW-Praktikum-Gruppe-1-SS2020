-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: dev_shoppingproject
-- ------------------------------------------------------
-- Server version	5.7.25-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Article`
--

DROP TABLE IF EXISTS `Article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Article` (
  `ID` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Article`
--

LOCK TABLES `Article` WRITE;
/*!40000 ALTER TABLE `Article` DISABLE KEYS */;
INSERT INTO `Article` VALUES (1,'Apple'),(2,'Banana'),(3,'Oranges'),(4,'Pork Chops'),(5,'Chicken Wings'),(6,'Steak'),(7,'Salmon'),(8,'Tomatoes'),(9,'Onions'),(10,'Potatoes'),(11,'Cucumbers'),(12,'Spinach'),(13,'Salad'),(14,'Grapes'),(15,'Strawberries');
/*!40000 ALTER TABLE `Article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Group`
--

DROP TABLE IF EXISTS `Group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Group` (
  `ID` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Group`
--

LOCK TABLES `Group` WRITE;
/*!40000 ALTER TABLE `Group` DISABLE KEYS */;
INSERT INTO `Group` VALUES (1,'Christophers WG','Böhmis WG'),(2,'Badenzer halt.','Jacbitz Crib'),(3,'oifach schwoba.','Schmid & more.'),(4,'Demokratisch organisiert.','Shorti Remser 5'),(5,'<3','Kevin + Tanja'),(6,'Illgs','Passer + Jassi');
/*!40000 ALTER TABLE `Group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listentry`
--

DROP TABLE IF EXISTS `Listentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Listentry` (
  `ID` int(11) NOT NULL,
  `Article_ID` int(11) NOT NULL,
  `Retailer_ID` int(11) NOT NULL,
  `Shoppinglist_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Group_ID` int(11) NOT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `bought` date DEFAULT NULL,
  PRIMARY KEY (`ID`,`Article_ID`,`Retailer_ID`,`Shoppinglist_ID`,`User_ID`,`Group_ID`),
  KEY `Article_ID` (`Article_ID`),
  KEY `Retailer_ID` (`Retailer_ID`),
  KEY `Shoppinglist_ID` (`Shoppinglist_ID`,`Group_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `Listentry_ibfk_1` FOREIGN KEY (`Article_ID`) REFERENCES `Article` (`ID`),
  CONSTRAINT `Listentry_ibfk_2` FOREIGN KEY (`Retailer_ID`) REFERENCES `Retailer` (`ID`),
  CONSTRAINT `Listentry_ibfk_3` FOREIGN KEY (`Shoppinglist_ID`, `Group_ID`) REFERENCES `Shoppinglist` (`ID`, `Group_ID`),
  CONSTRAINT `Listentry_ibfk_4` FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listentry`
--

LOCK TABLES `Listentry` WRITE;
/*!40000 ALTER TABLE `Listentry` DISABLE KEYS */;
INSERT INTO `Listentry` VALUES (1,1,1,1,1,1,5,NULL),(2,7,2,1,2,1,1,NULL),(3,4,4,2,2,2,5,NULL),(4,12,4,2,1,2,5,NULL),(5,4,6,3,3,3,2,NULL),(6,11,7,4,3,4,10,NULL),(7,4,6,3,4,3,4,NULL),(8,12,7,5,6,5,7,NULL),(9,14,8,5,5,5,1,NULL),(10,15,9,6,6,6,500,NULL);
/*!40000 ALTER TABLE `Listentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Membership`
--

DROP TABLE IF EXISTS `Membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Membership` (
  `User_ID` int(11) NOT NULL,
  `Group_ID` int(11) NOT NULL,
  PRIMARY KEY (`User_ID`,`Group_ID`),
  KEY `Group_ID` (`Group_ID`),
  CONSTRAINT `Membership_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`),
  CONSTRAINT `Membership_ibfk_2` FOREIGN KEY (`Group_ID`) REFERENCES `Group` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Membership`
--

LOCK TABLES `Membership` WRITE;
/*!40000 ALTER TABLE `Membership` DISABLE KEYS */;
INSERT INTO `Membership` VALUES (1,1),(2,1),(1,2),(2,2),(3,3),(4,3),(3,4),(4,4),(5,5),(6,5),(5,6),(6,6);
/*!40000 ALTER TABLE `Membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Retailer`
--

DROP TABLE IF EXISTS `Retailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Retailer` (
  `ID` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Retailer`
--

LOCK TABLES `Retailer` WRITE;
/*!40000 ALTER TABLE `Retailer` DISABLE KEYS */;
INSERT INTO `Retailer` VALUES (1,'Rewe Esslingen','Ritterstraße 5'),(2,'Kaufland Esslingen','Alleenstraße 1'),(3,'Kaufland Vaihingen','Gottlieb-Daimler-Straße 5'),(4,'Lidl Freiburg','Ludwig-Badenzer-Weg 2'),(5,'Bauer Müller','Im Riedlinger 7'),(6,'Aldi am Obertor','Obertorstraße 122'),(7,'Getränkemarkt Bayha','In Wurstner 77'),(8,'Shop an der Uni Vahingen','Unter der Besten Mensa 2'),(9,'Marktstand Cengiz','Neben dem Roten Wagen'),(10,'Rewe Biethigheim','Bietigheimer Straße 54');
/*!40000 ALTER TABLE `Retailer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shoppinglist`
--

DROP TABLE IF EXISTS `Shoppinglist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shoppinglist` (
  `ID` int(11) NOT NULL,
  `Group_ID` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`,`Group_ID`),
  KEY `Group_ID` (`Group_ID`),
  CONSTRAINT `Shoppinglist_ibfk_1` FOREIGN KEY (`Group_ID`) REFERENCES `Group` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shoppinglist`
--

LOCK TABLES `Shoppinglist` WRITE;
/*!40000 ALTER TABLE `Shoppinglist` DISABLE KEYS */;
INSERT INTO `Shoppinglist` VALUES (1,1,'Für Nala'),(2,2,'Julius + Schwester '),(3,3,'Für den Blacky'),(4,4,'Defintiv kein Bier'),(5,5,'Kevin - Rewe'),(6,6,'Kaufland Vaihingen\r\n');
/*!40000 ALTER TABLE `Shoppinglist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `ID` int(11) NOT NULL,
  `e-mail` varchar(100) DEFAULT NULL,
  `firebase-id` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'chrisjb@webforeveryone.de','iHqjnBdSCnXiYR0I6wHxpNH2nRB3','Christopher Böhm'),(2,'juliusjacobitz@gmail.com','XdZ495sWeHWeA2UBAmgsHDGQnht1','Julius Jacobitz'),(3,'pia.schmid@freenet.de','bYhY3mrVn1PLuIBNmd1isPaZ1ny2','Pia Schmid'),(4,'niklas.denneler@googlemail.c','aSs7UPCx1VgFq8s6nbS14edV1QO2','Niklas Denneler'),(5,'kevin96e@live.de','WjKs0iqfAfbTakW1qgvcJEAZ8vF3','Kevin Eberhardt'),(6,'pi004hdm@gmail.com','5zsqxpKCwhfqv0oKgyavtwTL9ad2','Pascal Illg');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dev_shoppingproject'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-06 20:01:51
