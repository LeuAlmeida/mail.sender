export const TOKEN_KEY = '@mailsender_token';
export const USER = '@mailsender_user';
export const setUser = user => {
  localStorage.setItem(USER, user);
};
export const getUser = () => localStorage.getItem(USER);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER);
};
