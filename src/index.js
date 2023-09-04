import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
axios.defaults.headers.common['x-api-key'] =
  'live_qzGt6DwSbX7USuLtfcHK2q9rBaX7QSV3O3DkXdDkGWwUaezd4VgnEzANqWvYbM6U';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  picture: document.querySelector('.picture'),
  description: document.querySelector('.desc'),
};

document.addEventListener('DOMContentLoaded', renderPage);

function renderPage() {
  fetchBreeds()
    .then(breeds => {
      refs.select.insertAdjacentHTML('beforeend', createSelect(breeds));
      new SlimSelect({
        select: '#selectElement',
      });
      refs.loader.classList.add('unvisible');
      refs.select.classList.remove('unvisible');
    })
    .catch(err => {
      refs.loader.classList.add('unvisible');
      console.log(err);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function createSelect(breeds) {
  return breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

refs.select.addEventListener('change', handlerChange);

function handlerChange(evt) {
  refs.loader.classList.remove('unvisible');
  const breedId = evt.target.value;
  refs.picture.innerHTML = '';
  refs.description.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(breed => createCatPage(breed))
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.loader.classList.add('unvisible');
    });
}

function createCatPage(arr) {
  const picture = `<img class="cat-picture" src="${arr[0].url}" alt="${arr[0].breeds[0].id}" width="800" height="500">`;
  const descript = `<h2 class="cat-title">${arr[0].breeds[0].name}</h2>
  <p class="cat-descript">${arr[0].breeds[0].description}</p>
  <p class="cat-temp"><b>Temperament: </b>${arr[0].breeds[0].temperament}</p>`;
  refs.picture.insertAdjacentHTML('beforeend', picture);
  refs.description.insertAdjacentHTML('beforeend', descript);
}