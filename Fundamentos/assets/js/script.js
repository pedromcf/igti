console.log('Olá, Mundo!');
//recuperando texto da tag h1
var title = document.querySelector('h1');

//Modificando texto do title, referencia ao h1
title.textContent = 'Modificado Pedro Freitas';

var a = 5;
var b = 6;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else if (a < b) {
  console.log(a + ' é menor que ' + b);
} else {
  console.log(a + ' são iguais ' + b);
}

var dia = 4;

switch (dia) {
  case 1:
    r = 'Domingo';
    break;
  case 2:
    r = 'Segunda';
    break;
  case 3:
    r = 'Terça';
    break;
  case 4:
    r = 'Quarta';
    break;
  case 5:
    r = 'Quinta';
    break;
  case 6:
    r = 'Sexta';
    break;
  case 7:
    r = 'Sabado';
    break;
  default:
    r = 'Dia invalido';
    break;
}

console.log(r);

a = 6;
b = 7;
var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';

console.log(resposta);

var diaSemana =
  dia === 1
    ? 'Domingo'
    : dia === 2
    ? 'segunda'
    : dia === 3
    ? 'Terça'
    : dia === 4
    ? 'Quarta'
    : dia === 5
    ? 'Quinta'
    : dia === 6
    ? 'Sexta'
    : dia === 7
    ? 'Sabado'
    : 'Dia Invalido';

console.log(diaSemana);

//somatorio com while
var numeroAtual = 1;
var somatorio = 0;
while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log(somatorio);

//somatorio com do while
var numeroAtual = 1;
var somatorio = 0;
do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log(somatorio);

//somatorio com for

somatorio = 0;
for (var numeroAtual = 1; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}

console.log(somatorio);
