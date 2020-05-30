'use strict';

let divCountries = null;
let divFavorites = null;

let globalCountries = [];
let globalFavoritesCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationCountries = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  divCountries = document.querySelector('#divCountries');
  countCountries = document.querySelector('#countCountries');

  // prettier-ignore
  totalPopulationCountries = document.querySelector('#totalPopulationCountries');
  divFavorites = document.querySelector('#divFavorites');
  countFavorites = document.querySelector('#countFavorites');
  // prettier-ignore
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();
  globalCountries = data.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag,
    };
  });
  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}
function renderCountryList() {
  let countriesHTML = '<div>';

  globalCountries.forEach((country) => {
    const { name, flag, id, population } = country;
    const countryHTML = `
    <div class='country'>
    <div>
      <a id="${id}" class="waves-effect waves-light btn"><i class="medium material-icons">star_border</i></a>      
    </div>
    <div>
      <img src="${flag}" alt="${name}">      
    </div>
    <div>
      <ul>
        <li>
          ${name}
        </li>
        <li>
          ${formatNumber(population)}
        </li>
      </ul>
    </div>
    </div>
    `;

    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';
  divCountries.innerHTML = countriesHTML;
}
function renderFavorites() {
  let favoritesHTML = '<div>';

  globalFavoritesCountries.forEach((favorite) => {
    const { name, flag, id, population } = favorite;
    const favoriteHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4"><i class="medium material-icons">star</i></a>      
        </div>
        <div>
          <img src="${flag}" alt="${name}">      
        </div>
        <div>
          <ul>
            <li>
              ${name}
            </li>
            <li>
              ${formatNumber(population)}
            </li>
          </ul>
        </div>
      </div>
      `;

    favoritesHTML += favoriteHTML;
  });
  favoritesHTML += '</div>';
  divFavorites.innerHTML = favoritesHTML;
}
function renderSummary() {
  countCountries.textContent = globalCountries.length;
  countFavorites.textContent = globalFavoritesCountries.length;

  const totalPopulation = globalCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  // prettier-ignore
  const totalFavorite = globalFavoritesCountries.reduce((accumulator, current) => {
      return accumulator + current.population;
    },0);

  totalPopulationCountries.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorite);
}
function handleCountryButtons() {
  const countryButtons = Array.from(divCountries.querySelectorAll('.btn'));
  const favoritesButtons = Array.from(divFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoritesButtons.forEach((button) => {
    button.addEventListener('click', () => removeToFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = globalCountries.find((country) => country.id === id);
  globalFavoritesCountries = [...globalFavoritesCountries, countryToAdd];

  globalFavoritesCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  globalCountries = globalCountries.filter((country) => country.id !== id);
  render();
}
function removeToFavorites(id) {
  const countryToRemove = globalFavoritesCountries.find(
    (country) => country.id === id
  );
  globalCountries = [...globalCountries, countryToRemove];

  globalCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  globalFavoritesCountries = globalFavoritesCountries.filter(
    (country) => country.id !== id
  );
  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
