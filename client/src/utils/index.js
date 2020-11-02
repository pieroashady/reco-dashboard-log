const TOKEN_KEY = 'jwt';

export const login = () => {
  localStorage.setItem(TOKEN_KEY, 'TestLogin');
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    console.log('true');
    return true;
  }
  console.log('false');
  return false;
};
