SET FOREIGN_KEY_CHECKS=0;
/***********************************************************************************************
REFERENCE TABLES
***********************************************************************************************/

DROP TABLE IF EXISTS GenderType;
CREATE TABLE GenderType
(
  GenderID INT NOT NULL AUTO_INCREMENT,
  GenderType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_GenderType_GenderID PRIMARY KEY (GenderID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS EducationType;
CREATE TABLE EducationType
(
  EducationID INT NOT NULL AUTO_INCREMENT,
  EducationType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_EducationType_EducationID PRIMARY KEY (EducationID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS ReligionType;
CREATE TABLE ReligionType
(
  ReligionID INT NOT NULL AUTO_INCREMENT,
  ReligionType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_ReligionType_ReligionID PRIMARY KEY (ReligionID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS InterestsType;
CREATE TABLE InterestsType
(
  InterestID INT NOT NULL AUTO_INCREMENT,
  InterestType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_InterestsType_InterestID PRIMARY KEY (InterestID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/***********************************************************************************************
USER TABLES
***********************************************************************************************/

DROP TABLE IF EXISTS Users;
CREATE TABLE Users
(
  UserID INT NOT NULL AUTO_INCREMENT,
  UserEmail VARCHAR(254) NOT NULL,
  UserPassword VARCHAR(254) NOT NULL,
  CONSTRAINT PK_Users_UserID PRIMARY KEY (UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS UsersInfo;
CREATE TABLE UsersInfo
(
  UserID INT NOT NULL,
  UserName VARCHAR(254) NOT NULL,
  Birthday DATE NOT NULL,
  GenderID INT NOT NULL,
  Latitude DECIMAL(10, 8),
  Longitude DECIMAL(11, 8),
  Bio VARCHAR(1000),
  ReligionID INT,
  CONSTRAINT PK_UsersInfo_UserID PRIMARY KEY (UserID),
  CONSTRAINT FK_UsersInfo_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT FK_UsersInfo_GenderType_GenderID FOREIGN KEY (GenderID) REFERENCES GenderType(GenderID),
  CONSTRAINT FK_UsersInfo_ReligionType_ReligionID FOREIGN KEY (ReligionID) REFERENCES ReligionType(ReligionID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS UserPicture;
CREATE TABLE UserPicture
(
  PictureID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  PicturePath VARCHAR(2083) NOT NULL,
  PrimaryPicture TINYINT NOT NULL,
  CONSTRAINT PK_UserPicture_PictureID PRIMARY KEY (PictureID),
  CONSTRAINT FK_UserPicture_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/***********************************************************************************************
MEMBERSHIP TABLES
***********************************************************************************************/

DROP TABLE IF EXISTS Likes;
CREATE TABLE Likes
(
  User1ID INT NOT NULL,
  User2ID INT NOT NULL,
  UserAction CHAR NOT NULL,
  ActionDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT PK_Likes_User1ID_User2ID PRIMARY KEY (User1ID, User2ID),
  CONSTRAINT FK_Likes_Users_User1ID FOREIGN KEY (User1ID) REFERENCES Users(UserID),
  CONSTRAINT FK_Likes_Users_User2ID FOREIGN KEY (User2ID) REFERENCES Users(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS UserEducation;
CREATE TABLE UserEducation
(
  UserID INT NOT NULL,
  EducationID INT NOT NULL,
  CONSTRAINT PK_UserEducation_UserID_EducationID PRIMARY KEY (UserID, EducationID),
  CONSTRAINT FK_UserEducation_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT FK_UserEducation_EducationType_EducationID FOREIGN KEY (EducationID) REFERENCES EducationType(EducationID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS UserInterests;
CREATE TABLE UserInterests
(
 UserID INT NOT NULL,
 InterestID INT NOT NULL,
 CONSTRAINT PK_UserInterests_UserID_InterestID PRIMARY KEY (UserID, InterestID),
 CONSTRAINT FK_UserInterests_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
 CONSTRAINT FK_UserInterests_InterestsType_InterestID FOREIGN KEY (InterestID) REFERENCES InterestsType(InterestID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/***********************************************************************************************
FILTER TABLES
***********************************************************************************************/

DROP TABLE IF EXISTS FilterState;
CREATE TABLE FilterState
(
  UserID INT NOT NULL,
  AgeFilterState TINYINT(1) NOT NULL DEFAULT 0,
  GenderFilterState TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT PK_FilterState_UserID PRIMARY KEY (UserID),
  CONSTRAINT FK_FilterState_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS AgeFilter;
CREATE TABLE AgeFilter
(
  UserID INT NOT NULL,
  MinAge INT NOT NULL DEFAULT 18,
  MaxAge INT NOT NULL DEFAULT 150,
  CONSTRAINT PK_AgeFilter_UserID PRIMARY KEY (UserID),
  CONSTRAINT FK_AgeFilter_FilterState_UserID FOREIGN KEY (UserID) REFERENCES FilterState(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS GenderFilter;
CREATE TABLE GenderFilter
(
  UserID INT NOT NULL,
  GenderID INT NOT NULL,
  CONSTRAINT PK_GenderFilter_UserID_GenderID PRIMARY KEY (UserID, GenderID),
  CONSTRAINT FK_GenderFilter_FilterState_UserID FOREIGN KEY (UserID) REFERENCES FilterState(UserID),
  CONSTRAINT FK_GenderFilter_GenderType_GenderID FOREIGN KEY (GenderID) REFERENCES GenderType(GenderID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SET FOREIGN_KEY_CHECKS=1;