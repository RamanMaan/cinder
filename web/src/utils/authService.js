class Auth {
  constructor() {
    this.loggedInUser = {
      id: 3,
      userName: 'Mac Miller',
      img: 'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b'
    };
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
}

module.exports = {
  loggedInUser: new Auth().getLoggedInUser()
};
