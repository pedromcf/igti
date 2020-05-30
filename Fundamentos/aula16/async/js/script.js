'use strict';
window.addEventListener('load', () => {
  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();

  doFetch();
  doFetchAsync();
});

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0');
    }
    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log(`Falha na divisão ${errorMessage}`);
    });
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

function doFetch() {
  fetch('https://api.github.com/users/pedromcf')
    .then((resource) => {
      resource.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisicao');
    });
}
async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/pedromcf');
  const json = await res.json();
  console.log(json);
}

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = `${data.login} ${data.name}`;
}
