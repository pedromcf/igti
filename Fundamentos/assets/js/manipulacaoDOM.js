console.log('Manipulando o dom');

var title = document.querySelector('h1');

title.textContent = 'Pedro Freitas';

var city = document.querySelector('#city');

city.textContent = 'Contagem';

var personalDataArray = document.querySelectorAll('.data');

data = Array.from(personalDataArray);

console.log(data);

for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.classList.add('emphasis');
}
