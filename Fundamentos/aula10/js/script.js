'use strict'; // O Java Script acusa mais erros

console.log('Hello!');

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  //i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('Let' + i);
  }

  //i = 20;
  //console.log(i);
}

withVar();

console.log('agora let');

withLet();

//const - não podemos reatribuir valores.

// const c = 10;
// c = 20;

//em arrays ou objects vc consegue atribuir um valor, const ainda nao abrange
const d = [];
// console.log(d);

d.push(1);
console.log(d);

//implantação de arrow function
function sum(a, b) {
  return a + b;
}
const sum2 = function (a, b) {
  return a + b;
};
const sum3 = (a, b) => {
  return a + b;
};
const sum4 = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

const name = 'Pedro';
const surName = 'Freitas';

const text1 = 'Meu nome é ' + name + ' ' + surName;
const text2 = `Meu nome é ${name} ${surName}`;

console.log(text1);
console.log(text2);

const sum5 = (a, b = 3) => a + b;
console.log(sum5(2));
console.log(sum5(2, 8));
