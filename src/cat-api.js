import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_xUXnP9dtIhZYoMI0MeJZ1pMJW8D5S01UpSvWTQaaUxpHdebojOD3OLIibxAWKUi1';

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';
export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  const SEARCH = '/images/search';
  return axios.get(`${BASE_URL}${SEARCH}?breed_ids=${breedId}`)
    .then(resp => resp.data);
}









