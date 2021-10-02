import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countryCardTemplate from './templates/country-card.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, alert } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const _ = require('lodash');
const Handlebars = require('handlebars');
const debounceFunction = _.debounce(searchQuery, 500);
const input = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');
input.addEventListener('input', debounceFunction);
// const searchQuery = input.target.value;
function searchQuery(e) {
  let query;
  console.log(e.target.value);
  query = e.target.value;
  fetchCountries(query).then(data => {
    const markup = countryCardTemplate(data);
    if (data.length === 1) cardContainer.innerHTML = markup;
    // else if (data.length > 1)const markup = countryCardTemplate(data);
  });
}
// searchQuery();
// fetchCountries(searchQuery).then(console.log);
// error({ text: 'Too many matches found. Please enter a more specific query!' });

// let array = [];
// fetchCountries(searchQuery).then(data => {
//
//   const markup = countryCardTemplate(data);
//   console.log(markup);
//   cardContainer.innerHTML = markup;
//   console.log(cardContainer);
// });
