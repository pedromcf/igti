console.log('trabalho pratico');

window.addEventListener('load', start);

var inputRed = null;
var inputGreen = null;
var inputBlue = null;
var inputRedNumerico = null;
var inputGreenNumerico = null;
var inputBlueNumerico = null;

var colorResult = null;

function start() {
  inputRed = document.querySelector('.inputRange');
  inputGreen = document.querySelector('#inputGreen');
  inputBlue = document.querySelector('#inputBlue');

  inputRedNumerico = document.querySelector('#inputRedNumerico');
  inputGreenNumerico = document.querySelector('#inputGreenNumerico');
  inputBlueNumerico = document.querySelector('#inputBlueNumerico');

  colorResult = document.querySelector('#colorResult');

  activateInput();
}

function activateInput() {
  function startMouse(event) {
    inputRed.addEventListener('mousemove', moveMouse);
    inputGreen.addEventListener('mousemove', moveMouse);
    inputBlue.addEventListener('mousemove', moveMouse);
  }

  function moveMouse(event) {
    if (event.target.id === 'inputRed') {
      inputRedNumerico.value = event.target.value;
    } else if (event.target.id === 'inputGreen') {
      inputGreenNumerico.value = event.target.value;
    } else if (event.target.id === 'inputBlue') {
      inputBlueNumerico.value = event.target.value;
    }
    document.getElementById('colorResult').style.backgroundColor =
      'rgb(' +
      inputRedNumerico.value +
      ', ' +
      inputGreenNumerico.value +
      ',' +
      inputBlueNumerico.value +
      ')';
  }
  function stopMouse() {
    inputRed.removeEventListener('mousemove', moveMouse);
    inputGreen.removeEventListener('mousemove', moveMouse);
    inputBlue.removeEventListener('mousemove', moveMouse);
  }

  inputRed.addEventListener('mousedown', startMouse);
  inputRed.addEventListener('mouseup', stopMouse);
  inputGreen.addEventListener('mousedown', startMouse);
  inputGreen.addEventListener('mouseup', stopMouse);
  inputBlue.addEventListener('mousedown', startMouse);
  inputBlue.addEventListener('mouseup', stopMouse);
}
