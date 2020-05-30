window.addEventListener('load', start);
var divPodCasts = null;
var inputFrequency = null;
var inputRange = null;

function start() {
  divPodCasts = document.querySelector('#divPodCasts');
  inputFrequency = document.querySelector('#inputFrequency');
  inputRange = document.querySelector('#inputRange');

  inputRange.addEventListener('input', handleInputRangeChange);
  showPodCastFromFrequency('87.5');
}

function handleInputRangeChange(event) {
  var currentFrequency = event.target.value;
  inputFrequency.value = currentFrequency;

  showPodCastFromFrequency(currentFrequency);
}

function showPodCastFromFrequency(frequency) {
  //ES5
  // for (var i = 0; i < realpodCast.length; i++) {
  //   var currentPodCast = realpodCast[i];

  //   if (currentPodCast.id === frequency) {
  //     hasPodCast = true;
  //   }
  // }

  //ES6+
  realPodcasts = [];
  var currentPodcast = realPodcasts.find(function (podcast) {
    return frequency === podcast.id;
  });

  if (!!currentPodcast) {
    renderPodCast(currentPodcast);
  } else {
    divPodCasts.textContent = 'Nenhum PodCast Encontrato';
  }
}

function renderPodCast(podcast) {
  // return `
  // <img src='../img/1.jpg' />`;
  divPodCasts.innerHTML = '';

  const img = document.createElement('img');
  img.src = '../img/pedro.jpg' + podcast.img;

  const h2 = document.createElement('h2');
  h2.textContent = podcast.title;

  const p = document.createElement('p');
  p.textContent = podcast.title;

  divPodCasts.appendChild(img);
  divPodCasts.appendChild(h2);
  divPodCasts.appendChild(p);
}
