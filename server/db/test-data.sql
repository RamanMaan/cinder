/***********************************************************************************************
INITIALIZE REFERENCE TABLES
***********************************************************************************************/

INSERT INTO GenderType (GenderID, GenderType) VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'Other');

INSERT INTO EducationType (EducationID, EducationType) VALUES
(1, 'Bachelor'),
(2, 'Master Degree'),
(3, 'Ph.D'),
(4, 'High School');

INSERT INTO StudyType (StudyID, StudyType) VALUES
(1, 'Humanities'),
(2, 'Arts'),
(3, 'Performing arts'),
(4, 'Visual arts'),
(5, 'History'),
(6, 'Languages'),
(7, 'Literature'),
(8, 'Philosophy'),
(9, 'Theology'),
(10, 'Social sciences'),
(11, 'Anthropology'),
(12, 'Economics'),
(13, 'Human geography'),
(14, 'Political science'),
(15, 'Psychology'),
(16, 'Sociology'),
(17, 'Natural and social sciences'),
(18, 'Geography'),
(19, 'Natural sciences'),
(20, 'Biology'),
(21, 'Chemistry'),
(22, 'Earth sciences'),
(23, 'Space sciences'),
(24, 'Physics'),
(25, 'Formal sciences'),
(26, 'Computer Science'),
(27, 'Mathematics'),
(28, 'Statistics'),
(29, 'Professions'),
(30, 'Engineering and technology'),
(31, 'Medicine and health'),
(32, 'Law');

INSERT INTO ReligionType (ReligionID, ReligionType) VALUES
(1, 'Pastafarianism'),
(2, 'Scientology');

INSERT INTO InterestsType (InterestID, InterestType) VALUES
(1, 'a'),
(2, 'b'),
(3, 'c'),
(4, 'd');

/***********************************************************************************************
INITIALIZE USER RECORDS
***********************************************************************************************/

INSERT INTO Users (UserID, UserEmail, UserPassword) VALUES
(1, '123@abc.com', 'test123'),
(2, '321@abc.com', 'haha123'),
(3, '112233@abc.com', 'qwert12345'),
(4, 'abc3@123.com', '4tester');

INSERT INTO UsersInfo (UserID, UserName, Birthday, GenderID, Latitude, Longitude) VALUES
(1, 'Test1', '1995-05-05', 1, 49.880488, -97.161546),
(2, 'Test2', '1995-06-30', 2, 49.8150033, -97.1488722),
(3, 'Test3', '1995-02-15', 2, 49.8150033, -97.1488722),
(4, 'Test4', '1995-04-12', 1, 49.8150033, -97.1488722);

INSERT INTO UserStudy (UserID, StudyID, EducationID) VALUES
(1, 15, 1),
(2, 4, 2),
(2, 13, 1),
(3, 31, 3),
(4, 25, 1),
(4, 27, 1),
(4, 27, 2);

INSERT INTO UserPreference (UserID, GenderID) VALUES
(1, 2),
(2, 1),
(3, 1),
(4, 2),
(4, 1);

/***********************************************************************************************
INITIALIZE USER ACTIONS
***********************************************************************************************/

INSERT INTO Likes (User1ID, User2ID, UserAction) VALUES
(1, 1, 0),
(1, 2, 0),
(1, 3, 1),
(1, 4, 1),
(2, 1, 1),
(2, 4, 1),
(4, 1, 1),
(3, 1, 1),
(4, 2, 1);

INSERT INTO Matches (MatchID, MatchDate) VALUES
(1, '2018-02-03 12:09:05'),
(2, '2018-02-04 15:03:02'),
(3, '2018-02-01 08:02:48');

INSERT INTO UserMatches (UserID, MatchID) VALUES
(1, 2),
(3, 2),
(1, 1),
(4, 1),
(2, 3),
(4, 3);