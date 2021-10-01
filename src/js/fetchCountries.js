export default function fetchCountries(searchQuery) {
  searchQuery = searchQuery.target.value;
  return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const markup = countryCardTemplate(data);
      console.log(markup);
    });
}
