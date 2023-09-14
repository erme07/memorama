const cardsArray = Array.from(document.querySelectorAll('.cards__back'));
const panelCards = document.querySelector('.cards')
const fails_indicator = document.getElementById('fails');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const lives = document.querySelector('.display__chances');
const startButton = document.getElementById('start');
const modesButton = document.getElementById('mode');


let selectedCards = []
let hits = 0, fails = 0, timer;

const cards = [
  { name: 'onion', image: 'img/onion.png' },
  { name: 'potato', image: 'img/potato.png' },
  { name: 'corn', image: 'img/corn.png' },
  { name: 'pumpkin', image: 'img/pumpkin.png' },
  { name: 'carrots', image: 'img/carrots.png' },
  { name: 'tomato', image: 'img/tomato.png' },
  { name: 'champignon', image: 'img/champignon.png' },
  { name: 'aubergine', image: 'img/aubergine.png' },
  { name: 'onion', image: 'img/onion.png' },
  { name: 'potato', image: 'img/potato.png' },
  { name: 'corn', image: 'img/corn.png' },
  { name: 'pumpkin', image: 'img/pumpkin.png' },
  { name: 'carrots', image: 'img/carrots.png' },
  { name: 'tomato', image: 'img/tomato.png' },
  { name: 'champignon', image: 'img/champignon.png' },
  { name: 'aubergine', image: 'img/aubergine.png' }
]

const shuffle = () => {
  let m = cards.length, aux, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    aux = cards[m];
    cards[m] = cards[i];
    cards[i] = aux;
  }
  cardsArray.forEach((e, f) => {
    e.innerHTML = `<img src='${cards[f].image}'>`;
    e.setAttribute('data-name', cards[f].name);
  })
}

const completeGame = () => {
  alert('ganasteeeeee')
}

const startTimer = () => {
  let sec_count = 0, min_count = 0;
  const timer = setInterval(() => {
    sec_count++
    if (sec_count === 60) {
      sec_count = 0;
      min_count++
      if (min_count == 60) min_count = 0;
      if (min_count < 10) minutes.innerHTML = '0' + min_count;
      else minutes.innerHTML = min_count;
    }
    if (sec_count < 10) seconds.innerHTML = '0' + sec_count;
    else seconds.innerHTML = sec_count;
  }, 1000)
  return timer
}

const succes = () => {
  hits++;
  selectedCards[0].children[1].classList.add('hits');
  selectedCards[1].children[1].classList.add('hits');
  selectedCards = [];
  panelCards.classList.remove('bloqued');
  if (hits === 8) endGame();
}

const fault = () => {
  selectedCards[0].classList.remove('flip');
  selectedCards[1].classList.remove('flip');
  panelCards.classList.remove('bloqued')
  selectedCards = [];
}

const checkSelections = (e) => {
  const count = selectedCards.push(e.target.parentElement);
  e.target.parentElement.classList.add('flip');
  if (count === 2) {
    fails++
    if (fails < 10) fails_indicator.innerHTML = '0' + fails;
    else fails_indicator.innerHTML = fails;
    panelCards.classList.add('bloqued')
    if (selectedCards[0].children[1].getAttribute('data-name') !== selectedCards[1].children[1].getAttribute('data-name')) {
      setTimeout(fault, 700);
    } else {
      setTimeout(succes, 400);
    }
  }
}

shuffle();

const startGame = () => {
  panelCards.classList.remove('bloqued');
  startButton.classList.add('disabled');
  modesButton.classList.add('disabled');
  lives.classList.add('disabled');
  timer = startTimer();
}

const endGame = () => {
  panelCards.classList.add('bloqued');
  startButton.classList.remove('disabled');
  modesButton.classList.remove('disabled');
  lives.classList.remove('disabled');
  clearInterval(timer);
}

document.addEventListener('click', (e) => {
  if (e.target.matches('.cards__front')) {
    checkSelections(e)
  }
  if (e.target.matches('#start')) {
    startGame()
  }
})