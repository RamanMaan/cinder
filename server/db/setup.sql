/***********************************************************************************************
REFERENCE TABLES
***********************************************************************************************/

CREATE TABLE IF NOT EXISTS GenderType
(
  GenderID INT NOT NULL AUTO_INCREMENT,
  GenderType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_GenderType_GenderID PRIMARY KEY (GenderID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS EducationType
(
  EducationID INT NOT NULL AUTO_INCREMENT,
  EducationType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_EducationType_EducationID PRIMARY KEY (EducationID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS StudyType
(
  StudyID INT NOT NULL AUTO_INCREMENT,
  StudyType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_StudyType_StudyID PRIMARY KEY (StudyID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS ReligionType
(
  ReligionID INT NOT NULL AUTO_INCREMENT,
  ReligionType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_ReligionType_ReligionID PRIMARY KEY (ReligionID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS InterestsType
(
  InterestID INT NOT NULL AUTO_INCREMENT,
  InterestType VARCHAR(254) NOT NULL,
  CONSTRAINT PK_InterestsType_InterestID PRIMARY KEY (InterestID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/***********************************************************************************************
USER TABLES
***********************************************************************************************/

CREATE TABLE IF NOT EXISTS Users
(
  UserID INT NOT NULL AUTO_INCREMENT,
  UserEmail VARCHAR(254) NOT NULL,
  UserPassword VARCHAR(254) NOT NULL,
  CONSTRAINT PK_Users_UserID PRIMARY KEY (UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS UsersInfo
(
  UserID INT NOT NULL,
  UserName VARCHAR(254) NOT NULL,
  Birthday DATE NOT NULL,
  GenderID INT NOT NULL,
  Latitude DECIMAL(10, 8) NOT NULL,
  Longitude DECIMAL(11, 8) NOT NULL,
  Bio VARCHAR(1000),
  ReligionID INT,
  CONSTRAINT PK_UsersInfo_UserID PRIMARY KEY (UserID),
  CONSTRAINT FK_UsersInfo_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT FK_UsersInfo_GenderType_GenderID FOREIGN KEY (GenderID) REFERENCES GenderType(GenderID),
  CONSTRAINT FK_UsersInfo_ReligionType_ReligionID FOREIGN KEY (ReligionID) REFERENCES ReligionType(ReligionID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/***********************************************************************************************
MEMBERSHIP TABLES
***********************************************************************************************/

CREATE TABLE IF NOT EXISTS Matches
(
  MatchID INT NOT NULL AUTO_INCREMENT,
  MatchDate DATETIME NOT NULL,
  MatchInfo VARCHAR(1000),
  CONSTRAINT PK_Matches_MatchID PRIMARY KEY (MatchID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS UserPicture
(
  PictureID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  PicturePath VARCHAR(2083) NOT NULL,
  PrimaryPicture TINYINT NOT NULL,
  CONSTRAINT PK_UserPicture_PictureID PRIMARY KEY (PictureID),
  CONSTRAINT FK_UserPicture_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS UserPreference
(
  UserID INT NOT NULL,
  GenderID INT NOT NULL,
  CONSTRAINT FK_Preference_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT FK_Preference_GenderType_GenderID FOREIGN KEY (GenderID) REFERENCES GenderType(GenderID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS UserStudy
(
  UserID INT NOT NULL,
  StudyID INT NOT NULL,
  EducationID INT NOT NULL,
  CONSTRAINT FK_UserStudy_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT FK_UserStudy_StudyType_StudyID FOREIGN KEY (StudyID) REFERENCES StudyType(StudyID)，
  CONSTRAINT FK_UserStudy_EducationType_EducationID FOREIGN KEY (EducationID) REFERENCES EducationType(EducationID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS Likes
(
  User1ID INT NOT NULL,
  User2ID INT NOT NULL,
  UserAction TINYINT NOT NULL,
  CONSTRAINT FK_Likes_Users_User1ID FOREIGN KEY (User1ID) REFERENCES Users(UserID),
  CONSTRAINT FK_Likes_Users_User2ID FOREIGN KEY (User2ID) REFERENCES Users(UserID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS UserInterests
(
 UserID INT NOT NULL,
 InterestID INT NOT NULL,
 CONSTRAINT FK_UserInterests_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
 CONSTRAINT FK_UserInterests_InterestsType_InterestID FOREIGN KEY (InterestID) REFERENCES InterestsType(InterestID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS UserMatches
(
 UserID INT NOT NULL,
 MatchID INT NOT NULL,
 CONSTRAINT FK_UserMatches_Users_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID),
 CONSTRAINT FK_UserMatches_Matches_MatchID FOREIGN KEY (MatchID) REFERENCES Matches(MatchID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;