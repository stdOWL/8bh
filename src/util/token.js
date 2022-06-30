class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.tokens?.refresh?.token;
  }
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.tokens?.access?.token;
  }
  updateLocalAccessToken(token, refresh) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.tokens.access.token = token;
      if (refresh)
        user.tokens.refresh.token = refresh;
    }

    localStorage.setItem("user", JSON.stringify(user));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  removeUser() {
    localStorage.removeItem("user");
  }
}
export default new TokenService();
