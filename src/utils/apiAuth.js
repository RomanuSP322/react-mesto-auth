export const BASE_URL = 'https://api.mesto.prs.nomoredomains.monster';

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject();
}


export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then(res => checkResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json;  charset=utf-8",
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => checkResponse(res));
};
