window.addEventListener('load', start);

var globalNames = ['um', 'Dois', 'Três'];
var inputName = null;
var names = null;
var isEditing = false;
var currentIndex = null;
function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  render();

  activateInput();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }
  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }
  function handleTyping(event) {
    var hasText = event.target.value.trim() !== '' && !!event.target.value;
    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEditing = false;
    }
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
      clearInput();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);

    return button;
  }

  function createUpdateSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.textContent = name;
    span.classList.add('clickable');

    span.addEventListener('click', editItem);

    return span;
  }

  names = document.querySelector('#names');
  names.innerHTML = '';
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createUpdateSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  names.appendChild(ul);
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
