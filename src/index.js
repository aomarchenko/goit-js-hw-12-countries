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

import { Spinner } from 'spin.js';

const _ = require('lodash');
const Handlebars = require('handlebars');
const debounceFunction = _.debounce(searchQuery, 500);
const input = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');
input.addEventListener('input', debounceFunction);

// ======================================================Spinner================================================
const opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: 'gray', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '80%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};
const spinner = new Spinner(opts);
const target = cardContainer;
// =========================================================================================

function searchQuery(e) {
  spinner.spin(target);

  let query;
  console.log(e.target.value);
  query = e.target.value;
  fetchCountries(query).then(data => {
    spinner.stop();
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
