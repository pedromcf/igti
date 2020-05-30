'use strict';

window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  console.log(marriedMen);
  console.log(marriedWomen);

  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'oi' }];
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2));
  console.log(infiniteSum(1, 2, 1000));
  console.log(infiniteSum(1, 2, 1000, 4, 5, 36, 57, 843, 9, 10));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doDestructuring() {
  const first = people.results[0];

  //respetitivo
  // const username = first.login.username;
  // const password = firs.login.password;

  //usando o destructuring

  const { username, password } = first.login;

  console.log(`Usuario: ${username} Senha: ${password}`);
}
