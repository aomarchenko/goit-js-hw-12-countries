import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countryCardTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/countries-list.hbs';

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

function searchQuery(e) {
  let query;
  console.log(e.target.value);
  query = e.target.value;
  fetchCountries(query).then(data => {
    let markup = countryCardTemplate(data);
    if (data.length === 1) cardContainer.innerHTML = markup;
    else if (data.length <= 10) {
      markup = countryListTemplate(data);
      cardContainer.innerHTML = markup;
    } else if (data.length > 10) {
      alert({ text: 'Too many matches found. Please enter a more specific query!' });
    } else if (data.status === 404) {
      error({ text: 'There is no country exist with such name. Check your input' });
    }
  });
}
