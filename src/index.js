import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
const debounceFunction = _.debounce(fetchCountries, 500);
const input = document.querySelector('.search-input');
input.addEventListener('input', debounceFunction);
let searchQuery;

// function fetchCountries(searchQuery) {
//   console.log(searchQuery.target.value);
//   searchQuery = searchQuery.target.value;
//   console.log(searchQuery);
//   fetch(`https://restcountries.com/v2/name/${searchQuery}`).then(r => r.json().then(console.log));
// }
