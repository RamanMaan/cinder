/**
 * This is where we define the data for reference tables
 * Note: we assign ID's to these elements by their index in the array
 * As such when making changes to data be aware of this change
*/
const gender = ['Male', 'Female', 'Other'];
const education = ['High School', 'College Diploma', 'Bachelors', 'Masters', 'Ph.D'];
const study = ['Computer Science', 'English', 'Economics', 'Law', 'Mathematics'];
const religion = ['Pastafarnianism', 'Scientology', 'Agnostic', 'Athiest'];
const interests = ['Base Jumping', 'Basket Weaving', 'Wine Tasting', 'Video Games'];

module.exports = {
  gender, education, study, religion, interests,
};
