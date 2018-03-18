import jwt from 'jsonwebtoken';

const getAuth = () => {
  let userID = -1;
  let token = localStorage.getItem('token') || null;
  if (token) {
    const decoded = jwt.decode(token);
    console.log(decoded);
    userID = decoded.id;
  }
  return { token, userID };
};

export const logout = () => {
  console.log('Logging out!');
};

export default getAuth();
