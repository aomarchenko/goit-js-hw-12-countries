export default function fetchCountries(searchQuery) {
  searchQuery = searchQuery.target.value;
  fetch(`https://restcountries.com/v2/name/${searchQuery}`).then(r => r.json().then(console.log));
}
