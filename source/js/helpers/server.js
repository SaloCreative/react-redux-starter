import Cookies from 'universal-cookie';

export function getToken(req) {
  const token = {
    JWT: '',
    expire: ''
  };
  const cookies = new Cookies(req.headers.cookie).cookies;
  const authToken = cookies && cookies.authToken ? cookies.authToken : {};
  if (Object.keys(authToken).length > 0) {
    token.JWT = JSON.parse(authToken).token;
    token.expire = JSON.parse(authToken).token_start
  }
  return token;
}