'use strict';

let globalUsers = [];
let globalCountries = [];
let globalUsersAndCountries = [];

async function start() {
  const p1 = promisesUsers();
  const p2 = promisesCountries();

  await Promise.all([p1, p2]);

  hideSpinner();
  mergeUsersAndCountries();
  render();
}

function promisesUsers() {
  return new Promise(async (resolve, reject) => {
    const users = await fetchUsers();

    setTimeout(() => {
      resolve(users);
    }, 5000);
  });
}

function promisesCountries() {
  return new Promise(async (resolve, reject) => {
    const countries = await fetchCountries();
    setTimeout(() => {
      resolve(countries);
    }, 5000);
  });
}

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const data = await res.json();

  globalUsers = data.results.map((person) => {
    const { name, nat, picture } = person;
    return {
      userName: `${name.first}`,
      userCountry: nat,
      userPicture: picture.medium,
    };
  });
}

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();
  globalCountries = data.map((country) => {
    const { name, alpha2Code, flag } = country;
    return {
      countryName: name,
      countryCode: alpha2Code,
      countryFlag: flag,
    };
  });
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  spinner.classList.add('hide');
}
function mergeUsersAndCountries() {
  globalUsersAndCountries = [];

  globalUsers.forEach((user) => {
    const userCountry = globalCountries.find((country) => {
      return country.countryCode === user.userCountry;
    });

    globalUsersAndCountries.push({ ...user, ...userCountry });
  });

  console.log(globalUsersAndCountries);
}
function render() {
  const divUsers = document.querySelector('#divUsers');

  divUsers.innerHTML = `
  <div class ='row'>
    ${globalUsersAndCountries
      .map(({ userName, userPicture, countryFlag }) => {
        return `
        <div class='col s6 m4 l3'>
          <div>
            <div class='flex-row'>
              <img class="avatar" src='${userPicture}' />
            </div>
            <div class='flex-column'>
              <span>${userName}</span>
              <img class="flag" src='${countryFlag}' />
            </div>
          </div>
        </div>
      `;
      })
      .join('')}
  </div>
  `;
}

start();
