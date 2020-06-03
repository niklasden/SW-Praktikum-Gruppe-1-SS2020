CREATE TABLE `Article` (
 `ID` INT NOT NULL,
 `name` VARCHAR(200) NOT NULL
);

ALTER TABLE `Article` ADD CONSTRAINT PK_Article PRIMARY KEY (`ID`);


CREATE TABLE `Group` (
 `ID` INT NOT NULL,
 `description` VARCHAR(200),
 `name` VARCHAR(200)
);

ALTER TABLE `Group` ADD CONSTRAINT PK_Group PRIMARY KEY (`ID`);


CREATE TABLE `Retailer` (
 `ID` INT NOT NULL,
 `name` VARCHAR(200),
 `location` VARCHAR(200)
);

ALTER TABLE `Retailer` ADD CONSTRAINT PK_Retailer PRIMARY KEY (`ID`);


CREATE TABLE `Shoppinglist` (
 `ID` INT NOT NULL,
 `Listentry_ID` INT NOT NULL,
 `name` VARCHAR(10)
);

ALTER TABLE `Shoppinglist` ADD CONSTRAINT PK_Shoppinglist PRIMARY KEY (`ID`,`Listentry_ID`);


CREATE TABLE `User` (
 `ID` INT NOT NULL,
 `e-mail` VARCHAR(100),
 `firebase-id` VARCHAR(200),
 `name` VARCHAR(200)
);

ALTER TABLE `User` ADD CONSTRAINT PK_User PRIMARY KEY (`ID`);


CREATE TABLE `Listentry` (
 `ID` INT NOT NULL,
 `Article_ID` INT NOT NULL,
 `Retailer_ID` INT NOT NULL,
 `Shoppinglist_ID` INT NOT NULL,
 `Listentry_ID` INT NOT NULL,
 `User_ID` INT NOT NULL,
 `amount` NUMERIC(10),
 `bought` DATE
);

ALTER TABLE `Listentry` ADD CONSTRAINT PK_Listentry PRIMARY KEY (`ID`,`Article_ID`,`Retailer_ID`,`Shoppinglist_ID`,`Listentry_ID`,`User_ID`);


CREATE TABLE `Membership` (
 `User_ID` INT NOT NULL,
 `Group_ID` INT NOT NULL
);

ALTER TABLE `Membership` ADD CONSTRAINT PK_Membership PRIMARY KEY (`User_ID`,`Group_ID`);


ALTER TABLE `Shoppinglist` ADD CONSTRAINT FK_Shoppinglist_0 FOREIGN KEY (`Listentry_ID`) REFERENCES `Group` (`ID`);


ALTER TABLE `Listentry` ADD CONSTRAINT FK_Listentry_0 FOREIGN KEY (`Article_ID`) REFERENCES `Article` (`ID`);
ALTER TABLE `Listentry` ADD CONSTRAINT FK_Listentry_1 FOREIGN KEY (`Retailer_ID`) REFERENCES `Retailer` (`ID`);
ALTER TABLE `Listentry` ADD CONSTRAINT FK_Listentry_2 FOREIGN KEY (`Shoppinglist_ID`,`Listentry_ID`) REFERENCES `Shoppinglist` (`ID`,`Listentry_ID`);
ALTER TABLE `Listentry` ADD CONSTRAINT FK_Listentry_3 FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`);


ALTER TABLE `Membership` ADD CONSTRAINT FK_Membership_0 FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`);
ALTER TABLE `Membership` ADD CONSTRAINT FK_Membership_1 FOREIGN KEY (`Group_ID`) REFERENCES `Group` (`ID`);


