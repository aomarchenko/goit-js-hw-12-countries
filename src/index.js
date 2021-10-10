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

import { opts, spinner, target } from './js/spinner';
// import { initializeApp } from 'firebase/app';
// const firebaseConfig = {
//   apiKey: 'AIzaSyARadnjT0RyMAqHDs9cXBrlKnWUVQ9ozXY',
//   authDomain: 'country-search-6f325.firebaseapp.com',
//   projectId: 'country-search-6f325',
//   storageBucket: 'country-search-6f325.appspot.com',
//   messagingSenderId: '30830775979',
//   appId: '1:30830775979:web:e8014bbcaa627346a931ee',
// };

// const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB2xwjTuLPcg1Ii8Xs7nhCN35RdyItqSHc',
  authDomain: 'country-finder-4a81e.firebaseapp.com',
  projectId: 'country-finder-4a81e',
  storageBucket: 'country-finder-4a81e.appspot.com',
  messagingSenderId: '74361696339',
  appId: '1:74361696339:web:d56bb0f98e5c4ad3e856a6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const auth = getAuth();
signInWithPopup(auth, provider)
  .then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  })
  .catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

const _ = require('lodash');
const Handlebars = require('handlebars');
const debounceFunction = _.debounce(searchQuery, 500);
const input = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');
input.addEventListener('input', debounceFunction);

// ======================================================Spinner================================================
// const opts = {
//   lines: 15, // The number of lines to draw
//   length: 38, // The length of each line
//   width: 17, // The line thickness
//   radius: 45, // The radius of the inner circle
//   scale: 0.5, // Scales overall size of the spinner
//   corners: 1, // Corner roundness (0..1)
//   speed: 1, // Rounds per second
//   rotate: 0, // The rotation offset
//   animation: 'spinner-line-shrink', // The CSS animation name for the lines
//   direction: 1, // 1: clockwise, -1: counterclockwise
//   color: '#ff6b08', // CSS color or array of colors
//   fadeColor: 'transparent', // CSS color or array of colors
//   top: '80%', // Top position relative to parent
//   left: '50%', // Left position relative to parent
//   shadow: '0 0 1px transparent', // Box-shadow for the lines
//   zIndex: 2000000000, // The z-index (defaults to 2e9)
//   className: 'spinner', // The CSS class to assign to the spinner
//   position: 'absolute', // Element positioning
// };
// const spinner = new Spinner(opts);
// const target = cardContainer;
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
