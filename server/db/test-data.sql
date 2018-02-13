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

INSERT INTO UsersInfo (UserID, UserName, Birthday, GenderID, Latitude, Longitude, Bio) VALUES
(1, 'Wiz', '1985-05-05', 1, 49.880488, -97.161546, 
'Cameron Jibril Thomaz (born September 8, 1987), known professionally as Wiz Khalifa, is an American 
rapper, singer-songwriter and actor. He released his debut album, Show and Prove, in 2006, and signed 
to Warner Bros. Records in 2007. His Eurodance-influenced single, "Say Yeah", received urban radio airplay, 
charting on the Rhythmic Top 40 and Hot Rap Tracks charts in 2008.'),

(2, 'Kawhi', '1992-06-30', 1, 49.8150033, -97.1488722, 
'Kawhi Anthony Leonard (born June 29, 1991) is an American professional basketball player for the 
San Antonio Spurs of the National Basketball Association (NBA). He played two seasons of college 
basketball for San Diego State University before being selected with the 15th overall pick in the 
2011 NBA draft by the Indiana Pacers. He was then traded to San Antonio on draft night. Leonard won 
an NBA Championship with the Spurs in 2014 and was named the NBA Finals Most Valuable Player. 
He is a two-time NBA Defensive Player of the Year, having won in 2015 and 2016, and is a two-time 
All-NBA First Team member.'),

(3, 'Logan', '1895-02-15', 1, 49.8150033, -97.1488722, 
'Old Man Logan is an alternative version of the Marvel Comics character Wolverine. This character 
is an aged Wolverine set in an alternate future universe designated Earth-807128, where the 
supervillains overthrew the superheroes. Introduced as a self-contained story arc within the 
Wolverine ongoing series by writer Mark Millar and artist Steve McNiven, the character became 
popular with fans. After the Death of Wolverine, X-23 took the mantle of Wolverine, but Old Man 
Logan was brought in to serve as an X-Man and featured in his own ongoing series.'),

(4, 'Eazy-E', '1975-04-12', 1, 49.8150033, -97.1488722, 'Eric Lynn Wright (September 7, 1963 – 
March 26, 1995), better known by his stage name Eazy-E, was an American rapper who performed solo 
and in the hip hop group N.W.A. Wright is affectionately called "The Godfather of Gangsta rap". 
He was born to Richard and Kathie Wright in Compton, California. After dropping out of high school 
in the tenth grade, he supported himself primarily by selling drugs before founding Ruthless Records 
and becoming a rapper. Arabian Prince, Eazy-E, Dr. Dre and Ice Cube formed N.W.A. After DJ Yella 
and MC Ren joined the group, N.W.A released their debut single Panic Zone. In 1988, they released 
their most controversial album, Straight Outta Compton. The group released two more albums and then 
disbanded after Eazy released Dr. Dre from his contract. Eazy-E died in March 1995 after a brief battle with AIDS.'),

(5, 'Ri-Ri', '1990-04-12', 2, 49.8150033, -97.1488722, 'Robyn Rihanna Fenty (February 20, 1988) is a 
Barbadian singer, songwriter, and actress. Born in Saint Michael, Barbados and raised in Bridgetown, 
during 2003 she recorded demo tapes under the direction of record producer Evan Rogers and signed 
a recording contract with Def Jam Recordings after auditioning for its then-president, hip hop 
producer and rapper Jay Z. In 2005, Rihanna rose to fame with the release of her debut studio album 
Music of the Sun and its follow-up A Girl like Me (2006), which charted on the top 10 of the US 
Billboard 200 and respectively produced the successful singles "Pon de Replay", "SOS" and "Unfaithful".'),

(6, 'Katy', '1987-04-12', 2, 49.8150033, -97.1488722, 'Katheryn Elizabeth Hudson (born October 25, 1984), 
known professionally as Katy Perry, is an American singer and songwriter. After singing in church during 
her childhood, she pursued a career in gospel music as a teenager. Perry signed with Red Hill Records 
and released her debut studio album Katy Hudson under her birth name in 2001, which was commercially 
unsuccessful. She moved to Los Angeles the following year to venture into secular music after Red Hill 
ceased operations and she subsequently began working with producers Glen Ballard, Dr. Luke, and Max 
Martin. After adopting the stage name Katy Perry and being dropped by The Island Def Jam Music Group 
and Columbia Records, she signed a recording contract with Capitol Records in April 2007.'),

(7, 'Nicki', '1995-04-12', 2, 49.8150033, -97.1488722, 
'Onika Tanya Maraj (born December 8, 1982), known professionally as Nicki Minaj, is a 
Trinidadian-American rapper, singer, songwriter, and actress. Born in Saint James, Trinidad and Tobago 
and raised in Queens, New York, she gained public recognition after releasing three mixtapes between 
2007 to 2009 and subsequently signed to Young Money Entertainment in 2009.'),

(8, 'Cersei', '1969-04-12', 2, 49.8150033, -97.1488722, 'Cersei Lannister, Queen of the Seven Kingdoms 
of Westeros, is the wife of King Robert Baratheon. Her father arranged the marriage after his attempt 
to betroth her to Prince Rhaegar Targaryen, as she wanted, failed. The Targaryen dynasty lost the war, 
and her father schemed his way into the role of a political counselor for the newly crowned King Robert. 
The Lannisters are the richest family in Westeros and helped him to win the Throne, which is why Robert 
agreed to a marriage between them. Cersei has a twin brother, Jaime, with whom she has been involved in 
an incestuous affair. All three of Cersei''s children are Jaime''s. Cersei''s main character attribute 
is her desire for power and her ambition.');

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

INSERT INTO Likes (User1ID, User2ID, UserAction, ActionDate) VALUES
(1, 2, 'P', '2018-02-03 12:09:05'),
(1, 3, 'L', '2018-02-04 15:03:02'),
(1, 4, 'L', '2018-02-01 08:02:48'),
(2, 1, 'L', '2018-02-05 08:02:48'),
(2, 4, 'L', '2018-02-06 08:02:48'),
(4, 1, 'L', '2018-02-08 08:02:48'),
(3, 1, 'L', '2018-02-07 08:02:48'),
(4, 2, 'L', '2018-02-10 08:02:48'),
(7, 1, 'L', '2018-02-11 08:02:48');
