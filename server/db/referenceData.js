/**
 * This is where we define the data for reference tables
 * Note: we assign ID's to these elements by their index in the array
 * As such when making changes to data be aware of this change
*/
const GenderType = ['Male', 'Female', 'Other'];
const EducationType = ['High School', 'College Diploma', 'Bachelors', 'Masters', 'Ph.D'];
const ReligionType = ['Pastafarnianism', 'Scientology', 'Agnostic', 'Athiest'];
const InterestsType = ['Base Jumping', 'Basket Weaving', 'Wine Tasting', 'Video Games'];

module.exports = {
  GenderType, EducationType, ReligionType, InterestsType,
};
