/***********************************************************************************************
INITIALIZE REFERENCE TABLES
***********************************************************************************************/

INSERT INTO GenderType (GenderID, GenderType) VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'Other');

INSERT INTO EducationType (EducationID, EducationType) VALUES
(1, 'High School'),
(2, 'College Diploma'),
(3, 'Bachelors'),
(4, 'Masters'),
(5, 'Ph.D');

INSERT INTO StudyType (StudyID, StudyType) VALUES
(1, 'Computer Science'),
(2, 'English'),
(3, 'Economics'),
(4, 'Law'),
(5, 'Mathematics');

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
(8, 'cersei@gmail.com', 'password8'),
(9, 'mac@miller.com', 'password'),
(10, 'k@dot.com', 'password'),
(11, 'kevin@brockhampton.io', 'password'),
(12, 'j@smith.com', 'password');


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
is her desire for power and her ambition.'),

(9, 'Mac Miller', '1992-01-19', 1, 49.8150033, -97.1488722, 'aka Larry Fish aka Delusional Thomas aka that dude who raps.'),
(10, 'Kendrick Lamar', '1985-04-10', 1, 49.8150033, -97.1488722, 'Call me Kenny.'),
(11, 'Ian Simpson', '1995-03-30', 1, 49.8150033, -97.1488722, 'Ask me about my boyband.'),
(12, 'Jaden Smith', '1999-02-23', 1, 49.8150033, -97.1488722, 'Icon tatted on my torso. (Note: icon is not, in fact, tatted on my torso.) ');

INSERT INTO UserStudy (UserID, StudyID, EducationID) VALUES
(1, 2, 1),
(2, 4, 2),
(2, 3, 1),
(3, 3, 3),
(4, 5, 1),
(4, 4, 1),
(4, 2, 2),
(5, 3, 1),
(6, 1, 1),
(7, 4, 1),
(8, 3, 1),
(9, 2, 1),
(10, 1, 1),
(11, 1, 1),
(12, 1, 1);

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
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1);

INSERT INTO UserPicture (PictureID, UserID, PicturePath, PrimaryPicture) VALUES 
(1, 1, 'https://iscale.iheart.com/v3/url/aHR0cDovL2ltYWdlLmloZWFydC5jb20vaW1hZ2VzL3JvdmkvMTA4MC8wMDA0LzAwNy9NSTAwMDQwMDczMDYuanBn', 1),
(2, 2, 'http://www.espnsa.com/wp-content/uploads/2016/10/kwahi-e1477939536325.jpg', 1),
(3, 3, 'https://www.alux.com/wp-content/uploads/2017/03/Hugh-Jackman-Net-Worth.jpg', 1),
(4, 4, 'http://s3.amazonaws.com/hiphopdx-production/2015/03/Screen-Shot-2015-03-26-at-10.43.59-AM.png', 1),
(5, 5, 'https://static01.nyt.com/images/2015/10/12/t-magazine/12tmag-rihanna-toc-t/12tmag-rihanna-toc-t-blog427.jpg', 1),
(6, 6, 'https://pbs.twimg.com/profile_images/902653914465550336/QE3287ZJ_400x400.jpg', 1),
(7, 7, 'https://www.biography.com/.image/t_share/MTQ3NTI2ODcxNDU2Njg3NTk4/nicki_minaj_photo_by_kevin_mazur_wireimage_getty_498353136.jpg', 1),
(8, 8, 'https://typeset-beta.imgix.net/elite-daily/2017/07/11112059/cersei-kit-harrington.png', 1),

(9, 9, 'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b', 1),
(10, 10, 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg', 1),
(11, 11, 'http://images.genius.com/23dcab57a5e4a0d292a694f78a608fe5.966x966x1.jpg', 1),
(12, 12, 'https://i0.wp.com/www.uselessdaily.com/wp-content/uploads/2016/01/Jaden-Smith-In-Sunglasses.jpg?resize=550%2C550&ssl=1', 1);

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
(7, 1, 'L', '2018-02-11 08:02:48'),
(9, 1, 'L', '2018-02-03 12:09:05'),
(1, 9, 'L', '2018-02-05 12:09:05');
