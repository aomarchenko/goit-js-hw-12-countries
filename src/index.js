import './sass/main.scss';
const debounceFunction = _.debounce(onImput, 500);
const input = document.querySelector('.search-input');
input.addEventListener('input', debounceFunction);
let searchQuery;

function onImput(e) {
  searchQuery = document.querySelector('.search-input').value;
  console.log(searchQuery);
  fetch(`https://restcountries.com/v2/name/${searchQuery}`).then(r => r.json().then(console.log));
}
