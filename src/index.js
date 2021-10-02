import './sass/main.scss';
// import fetchCountries from './js/fetchCountries';
import countryCardTemplate from './templates/country-card.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, alert } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const _ = require('lodash');
const Handlebars = require('handlebars');
const debounceFunction = _.debounce(fetchCountries, 500);
const input = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');
input.addEventListener('input', debounceFunction);

error({ text: 'Too many matches found. Please enter a more specific query!' });
let array = [];
function fetchCountries(searchQuery) {
  searchQuery = searchQuery.target.value;
  return fetch(`https://restcountries.com/v3/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const markup = countryCardTemplate(data);
      console.log(markup);
      cardContainer.innerHTML = markup;
      console.log(cardContainer);
    });
}
