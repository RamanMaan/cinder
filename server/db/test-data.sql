INSERT INTO Gender_Type (Gender_ID, Gender_Type) VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'Other');

INSERT INTO Education_Type (Education_ID, Education_Type) VALUES
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

INSERT INTO Religion_Type (Religion_ID, Religion_Type) VALUES
(1, 'Pastafarianism'),
(2, 'Scientology');

INSERT INTO Interests (Interest_ID, Interest_Type) VALUES
(1, 'a'),
(2, 'b'),
(3, 'c'),
(4, 'd');

INSERT INTO Study_Type (Study_ID, Study_Type) VALUES
(1, 'Bachelor'),
(2, 'Master Degree'),
(3, 'Ph.D'),
(4, 'High School');

INSERT INTO Location (Location_ID, Latitude, Longitude) VALUES
(1, 49.880488, -97.161546),
(2, 49.8150033, -97.1488722),
(3, 49.8150033, -97.1488722),
(4, 49.8150033, -97.1488722);

INSERT INTO Users (User_ID, User_Email, User_Name, User_Password, Birthday, Age, Gender_ID, Location_ID) VALUES
(1, '123@abc.com', 'Test1', 'test123', '1995-05-05', 23, 1, 1),
(2, '321@abc.com', 'Test2', 'haha123', '1995-06-30', 23, 2, 2),
(3, '112233@abc.com', 'Test3', 'qwert12345', '1995-02-15', 23, 2, 3),
(4, 'abc3@123.com', 'Test4', '4tester', '1995-04-12', 23, 1, 4);

INSERT INTO Users_Info (User_ID, User_Info) VALUES
(1, 'I am test 1'),
(2, 'Hello guys'),
(3, 'Test Test Test!'),
(4, 'I am Computer Science Student');

INSERT INTO Matches (Match_ID, Match_Date) VALUES
(1, '2018-02-03 12:09:05'),
(2, '2018-02-04 15:03:02'),
(3, '2018-02-01 08:02:48');

INSERT INTO Likes (User1_ID, User2_ID, User_Action, Match_ID) VALUES
(1, 1, 0, NULL),
(1, 2, 0, NULL),
(1, 3, 1, 2),
(1, 4, 1, 1),
(2, 1, 1, NULL),
(2, 4, 1, 3),
(4, 1, 1, 1),
(3, 1, 1, 2),
(4, 2, 1, 3);

INSERT INTO Education (User_ID, Education_ID) VALUES
(1, 15),
(2, 4),
(3, 31),
(4, 25);

INSERT INTO Preference (User_ID, Gender_ID) VALUES
(1, 2),
(2, 1),
(3, 1),
(4, 2),
(4, 1);