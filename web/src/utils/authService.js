import jwt from 'jsonwebtoken';

const getAuth = () => {
  let userID = -1;
  const token = localStorage.getItem('token');
  if (token) {
    const date = new Date();
    const decoded = jwt.decode(token);
    const exp = decoded.exp;

    if (exp >= date.getTime() / 1000) {
      userID = decoded.id;
      return { isAuthenticated: true, token, userID };
    }
  } else return { isAuthenticated: false };
};

export const logout = () => {
  console.log('Logging out!');
};

export default getAuth();
