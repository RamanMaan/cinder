/***********************************************************************************************
INITIALIZE REFERENCE TABLES
***********************************************************************************************/

INSERT INTO GenderType (GenderID, GenderType) VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'Other');

INSERT INTO EducationType (EducationID, EducationType) VALUES
(1, 'Bachelor''s Degree'),
(2, 'Master''s Degree'),
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
(1, 'BASE Jumping'),
(2, 'Basket Weaving'),
(3, 'Wine Tasting'),
(4, 'Video Games');

/***********************************************************************************************
INITIALIZE USER RECORDS
***********************************************************************************************/

INSERT INTO Users (UserID, UserEmail, UserPassword) VALUES
(1, 'wizkhalifa.420@myumanitoba.ca', 'password1'),
(2, 'kawhifinalsmvp@spurs.com', 'password2'),
(3, 'hugh.jackman@gmail.com', 'password3'),
(4, 'fukdapolice@nwa.com', 'password4'),
(5, 'rihanna@gmail.com', 'password5'),
(6, 'katy.perry@gmail.com', 'password6'),
(7, 'my.anaconda.dont@gmail.com', 'password7'),
(8, 'cersei@gmail.com', 'password8');

INSERT INTO UsersInfo (UserID, UserName, Birthday, GenderID, Latitude, Longitude) VALUES
(1, 'Wiz', '1995-05-05', 1, 49.880488, -97.161546),
(2, 'Kawhi', '1995-06-30', 1, 49.8150033, -97.1488722),
(3, 'Logan', '1995-02-15', 1, 49.8150033, -97.1488722),
(4, 'Eazy-E', '1995-04-12', 1, 49.8150033, -97.1488722),
(5, 'Ri-Ri', '1995-04-12', 2, 49.8150033, -97.1488722),
(6, 'Katy', '1995-04-12', 2, 49.8150033, -97.1488722),
(7, 'Nicki', '1995-04-12', 2, 49.8150033, -97.1488722),
(8, 'Cersei', '1995-04-12', 2, 49.8150033, -97.1488722);

INSERT INTO UserStudy (UserID, StudyID, EducationID) VALUES
(1, 15, 1),
(2, 4, 2),
(2, 13, 1),
(3, 31, 3),
(4, 25, 1),
(4, 27, 1),
(4, 27, 2),
(5, 18, 1),
(6, 19, 1),
(7, 20, 1),
(8, 21, 1);

INSERT INTO UserPreference (UserID, GenderID) VALUES
(1, 2),
(2, 1),
(3, 1),
(4, 2),
(4, 1),
(5, 2),
(5, 1),
(6, 2),
(6, 1),
(7, 1),
(8, 1);

INSERT INTO UserPicture (PictureID, UserID, PicturePath, PrimaryPicture) VALUES 
(1, 1, 'https://hypb.imgix.net/image/2018/02/wiz-khalifa-captain-video-1.jpg?fit=max&q=90&w=500&h=333&auto=compress%2Cformat', 1),
(2, 2, 'https://usatftw.files.wordpress.com/2017/08/kawhi-leonard.jpg?w=1000&h=600&crop=1', 1),
(3, 3, 'https://www.biography.com/.image/t_share/MTE1ODA0OTcxOTA3NTgxNDUz/hugh-jackman-16599916-1-402.jpg', 1),
(4, 4, 'https://www.billboard.com/files/styles/1024x577/public/media/Eazy-E-1990-billboard-650.jpg', 1),
(5, 5, 'https://static01.nyt.com/images/2015/10/12/t-magazine/12tmag-rihanna-toc-t/12tmag-rihanna-toc-t-blog427.jpg', 1),
(6, 6, 'http://www.radioandmusic.com/sites/www.radioandmusic.com/files/images/entertainment/2017/05/15/Katy%20Perry.jpg', 1),
(7, 7, 'https://ssli.ulximg.com/image/740x493/cover/1513518963_aabd1d9dc9cd3e8454c30400e2830078.jpg/104170a82eb42936d6fa6a153692a8f6/1513518963_09b53ba32386fb366e4419a1bc974bb4.jpg', 1),
(8, 8, 'https://orig00.deviantart.net/8907/f/2017/233/0/6/cersei_lannister_game_of_thrones_screencap_study_by_vlalizavladarose-dbkthx1.png', 1);



/***********************************************************************************************
INITIALIZE USER ACTIONS
***********************************************************************************************/

INSERT INTO Likes (User1ID, User2ID, UserAction) VALUES
(1, 2, 'L'),
(1, 3, 'R'),
(1, 4, 'R'),
(2, 1, 'R'),
(2, 4, 'R'),
(4, 1, 'R'),
(3, 1, 'R'),
(4, 2, 'R');
