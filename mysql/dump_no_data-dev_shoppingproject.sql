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
  `CategoryID` int(11) DEFAULT NULL,
  `standard_article` tinyint(1) DEFAULT NULL,
  `creationdate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CategoryID` (`CategoryID`),
  CONSTRAINT `Article_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `FavoriteArticle`
--

DROP TABLE IF EXISTS `FavoriteArticle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FavoriteArticle` (
  `ID` int(11) NOT NULL,
  `Group_ID` int(11) DEFAULT NULL,
  `Article_ID` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `Retailer_ID` int(11) DEFAULT NULL,
  `creationdate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Group_ID` (`Group_ID`),
  KEY `Article_ID` (`Article_ID`),
  KEY `Retailer_ID` (`Retailer_ID`),
  CONSTRAINT `FavoriteArticle_ibfk_1` FOREIGN KEY (`Group_ID`) REFERENCES `Group` (`ID`),
  CONSTRAINT `FavoriteArticle_ibfk_2` FOREIGN KEY (`Article_ID`) REFERENCES `Article` (`ID`),
  CONSTRAINT `FavoriteArticle_ibfk_3` FOREIGN KEY (`Retailer_ID`) REFERENCES `Retailer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `creationdate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Listentry`
--

DROP TABLE IF EXISTS `Listentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Listentry` (
  `ID` int(11) NOT NULL,
  `Article_ID` int(11) NOT NULL,
  `Retailer_ID` int(11) DEFAULT NULL,
  `Shoppinglist_ID` int(11) NOT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `Group_ID` int(11) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `bought` date DEFAULT NULL,
  `creationdate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
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
-- Table structure for table `Retailer`
--

DROP TABLE IF EXISTS `Retailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Retailer` (
  `ID` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `creationdate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `creationdate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`,`Group_ID`),
  KEY `Group_ID` (`Group_ID`),
  CONSTRAINT `Shoppinglist_ibfk_1` FOREIGN KEY (`Group_ID`) REFERENCES `Group` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `creationdate` datetime DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2020-07-25 22:27:27
