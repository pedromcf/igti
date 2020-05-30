'use strict';

let globalUsers = [];
let findUsers = [];
let divUsers = null;
let divStatistic = null;
let inputSearch = null;
let numberFormat = null;
let titleStatistic = null;
let titleUsers = null;
window.addEventListener('load', () => {
  divUsers = document.querySelector('#divUsers');
  divStatistic = document.querySelector('#divStatistic');
  inputSearch = document.querySelector('#inputSearch');
  titleStatistic = document.querySelector('#titleStatistic');
  titleUsers = document.querySelector('#titleUsers');

  const formatConfig = {
    maximumFractionDigits: 2,
  };

  numberFormat = Intl.NumberFormat('pt-BR', formatConfig);

  fetchUsers();
});

function preventFormSubmit() {
  event.preventDefault();
  foundUsers();
}

function activateInput() {
  function handleTyping(event) {
    if (event.key === 'Enter') {
      foundUsers();
    }
  }
  inputSearch.focus();
  inputSearch.addEventListener('keyup', handleTyping);
}

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const data = await res.json();

  globalUsers = data.results.map((person) => {
    const { name, gender, dob, picture } = person;
    return {
      name: `${name.first} ${name.last}`,
      gender: gender,
      age: dob.age,
      picture: picture.medium,
    };
  });

  let form = document.querySelector('form');
  form.addEventListener('submit', preventFormSubmit);

  activateInput();
}

function foundUsers() {
  const busca = formatString(inputSearch.value);
  findUsers = [];
  if (busca) {
    globalUsers.forEach((person) => {
      const { name, age, gender } = person;
      if (formatString(name).match(busca)) {
        findUsers = [...findUsers, person];
      }
    });
  } else {
    titleUsers.textContent = `Nenhum usuário filtrado`;
  }

  render();
}
function render() {
  renderNames();
  renderStatistic();
}
function renderNames() {
  if (findUsers.length > 0) {
    titleUsers.textContent = `${findUsers.length} usuário(s) encontrado(s)`;
    let usersHTML = '<div>';
    findUsers.forEach((person) => {
      const { name, age, picture } = person;
      const userHTML = `
      <div class='user'>
        <div>
          <img src="${picture}" alt="${name}">      
        </div>
        <div>${name}, ${age} anos            
        </div>
      </div>
      `;
      usersHTML += userHTML;
    });
    usersHTML += '</div>';

    divUsers.innerHTML = usersHTML;
  } else {
    titleUsers.textContent = inputSearch.value
      ? 'Nenhum usuário encontrado'
      : 'Nenhum usuário filtrado';
  }
}

function renderStatistic() {
  if (findUsers.length > 0) {
    titleStatistic.textContent = 'Estatística';
    let statisticHTML = '<ul>';
    const findMale = findUsers.filter((person) => {
      return person.gender === 'male';
    });
    const countMale = findMale.length;
    statisticHTML += `<li>Sexo masculino: ${countMale}</li>`;
    const findFemale = findUsers.filter((person) => {
      return person.gender === 'female';
    });
    const countFemale = findFemale.length;
    statisticHTML += `<li>Sexo feminino: ${countFemale}</li>`;

    const sumAge = findUsers.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);
    statisticHTML += `<li>Soma das idades: ${sumAge}</li>`;
    const mediaIdade = formatNumber(sumAge / findUsers.length);
    statisticHTML += `<li>Media das idades: ${mediaIdade}</li>`;

    statisticHTML += '</ul>';
    divStatistic.innerHTML = statisticHTML;
  } else {
    titleStatistic.textContent = 'Nada a ser exibido';
  }
}

function formatString(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
