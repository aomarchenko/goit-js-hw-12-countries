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

function fetchCountries(query) {
  return fetch(
    `https://api.themoviedb.org/3/movie/550?api_key=4099dde96914c3c817414c197d5e195d`,
  ).then(response => {
    return response.json().then(console.log);
  });
}
fetchCountries();
