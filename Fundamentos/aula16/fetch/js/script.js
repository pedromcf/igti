'use strict';
window.addEventListener('load', () => {
  console.log('Antes da promise');
  fetch('https://api.github.com/users/pedromcf')
    .then((resource) => {
      resource.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisicao');
    });

  divisionPromise(5, 1).then((result) => {
    console.log(result);
  });
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log(`Falha na divisão ${errorMessage}`);
    });
});

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = `${data.login} ${data.name}`;
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0');
    }
    resolve(a / b);
  });
}
