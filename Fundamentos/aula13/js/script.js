'use strict';

let globalNames = ['um', 'Dois', 'Três'];
let inputName = null;
let names = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  render();

  activateInput();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    //globalNames.push(newName);
    globalNames = [...globalNames, newName];
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
      //globalNames.splice(index, 1);
      // globalNames = globalNames.filter((_, i) => {
      //   if (i === index) {
      //     return false;
      //   }
      //   return true;
      //   return i !== index;
      // });
      globalNames = globalNames.filter((_, i) => i !== index);

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
  clearInput();
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
