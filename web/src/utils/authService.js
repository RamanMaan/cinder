import jwt from 'jsonwebtoken';

class Auth {
  constructor() {
    this.token = localStorage.getItem('token') || null;
    this.userID = this.getUserID(this.token);
  }

  getUserID(token) {
    let id = -1;
    if (token) {
      const decoded = jwt.decode(token);
      id = decoded.id;
    }
    return id;
  }

  getAuth() {
    const token = this.token;
    const userID = this.userID;
    return { token, userID };
  }
}

// const getAuth = () => {
//   let userID = -1;
//   let token = localStorage.getItem('token') || null;
//   if (token) {
//     const decoded = jwt.decode(token);
//     console.log(decoded);
//     userID = decoded.id;
//   }
//   return { token, userID };
// };

export default new Auth().getAuth();
