const cardsArray = Array.from(document.querySelectorAll('.cards__back'));
const panelCards = document.querySelector('.cards')
const display_mode = document.getElementById('display-mode');
const hearts = Array.from(document.querySelectorAll('.heart'));

const cent_seconds = document.querySelector('.cent-seconds');
const seconds = document.querySelector('.seconds');
const lives = document.querySelector('.display__chances');
const display_time = document.querySelector('.display__time');
const startButton = document.getElementById('start');
const modesButton = document.getElementById('modes');
const modal_mode = document.getElementById('modal-mode');
const mode1_button = document.getElementById('mode1');
const mode2_button = document.getElementById('mode2');
const instruction1 = document.querySelector('.instruction--mode1');
const instruction2 = document.querySelector('.instruction--mode2');
const modal_win = document.getElementById('win');
const modal_lose = document.getElementById('lose');

let selectedCards = []
let hits = 0, fails = 0, timer, mode = true;

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
  let cardsLenght = cards.length, aux, i;
  while (cardsLenght) {
    i = Math.floor(Math.random() * cardsLenght--);
    aux = cards[cardsLenght];
    cards[cardsLenght] = cards[i];
    cards[i] = aux;
  }
  cardsArray.forEach((e, j) => {
    e.innerHTML = `<img src='${cards[j].image}'>`;
    e.setAttribute('data-name', cards[j].name);
  })
}

const endGame = (condition) => {
  selectedCards = [];
  hits = 0;
  fails = 0;
  panelCards.classList.add('bloqued');
  startButton.classList.remove('disabled');
  modesButton.classList.remove('disabled');
  lives.classList.remove('disabled');
  clearInterval(timer);
  if (condition) modal_win.classList.remove('hidden');
  else modal_lose.classList.remove('hidden');
}

const modeOne = () => {
  let cent_count = 100, seg_count = 39;
  seconds.innerHTML = seg_count
  timer = setInterval(() => {
    cent_count--;
    if (cent_count === 0 && seg_count === 0) endGame(false);
    else if (cent_count === 0) {
      cent_count = 100;
      seg_count--
      if (seg_count === 9) display_time.classList.add('display__time--red');
      if (seg_count < 10) seconds.innerHTML = '0' + seg_count
      else seconds.innerHTML = seg_count;
    }
    if (cent_count < 10) cent_seconds.innerHTML = '0' + cent_count;
    else if (cent_count === 100) cent_seconds.innerHTML = '00';
    else cent_seconds.innerHTML = cent_count;

  }, 10)
}

const modeTwoTimer = (seg_count, aux) => {
  let cent_count = 100;
  const timer_ = setInterval(() => {
    cent_count--;
    if (cent_count === 0 && seg_count === 0) {
      clearInterval(timer_);
      if (aux) endGame(false);
      else {
        seconds.innerHTML = '29'
        timer = modeTwoTimer(29, true);
        Array.from(document.querySelectorAll('.cards__place')).forEach((e) => {
          e.classList.remove('flip');
        })
      }
    } else if (cent_count === 0) {
      cent_count = 100;
      seg_count--
      if (seg_count === 9) display_time.classList.add('display__time--red');
      if (seg_count < 10) seconds.innerHTML = '0' + seg_count
      else seconds.innerHTML = seg_count;
    }
    if (cent_count < 10) cent_seconds.innerHTML = '0' + cent_count;
    else if (cent_count === 100) cent_seconds.innerHTML = '00';
    else cent_seconds.innerHTML = cent_count;
  }, 10)
  return timer_
}

const modeTwo = () => {
  const cards = Array.from(document.querySelectorAll('.cards__place'));
  cards.forEach((e) => {
    e.classList.add('flip')
  })
  seconds.innerHTML = '09'
  timer = modeTwoTimer(9, false);
}

const changeMode = (e, mode) => {
  if (e.target.matches('#mode1')) {
    mode2_button.classList.add('unselected');
    mode1_button.classList.remove('unselected');
    instruction1.classList.add('show');
    instruction2.classList.remove('show');
    seconds.innerHTML = '40';
  } else {
    mode1_button.classList.add('unselected');
    mode2_button.classList.remove('unselected');
    instruction2.classList.add('show');
    instruction1.classList.remove('show');
    seconds.innerHTML = '10';
  }
  startButton.setAttribute('data-mode', mode)
}

const saveMode = () => {
  modal_mode.classList.add("hidden");
  if (startButton.getAttribute('data-mode') === 'mode1') {
    lives.classList.add('disabled');
    display_mode.innerHTML = 'mode 1';
  }
  else {
    lives.classList.remove('disabled');
    display_mode.innerHTML = 'mode 2';
  }
}

const playAgain = () => {
  modal_win.classList.add('hidden')
  modal_lose.classList.add('hidden')
  display_time.classList.remove('display__time--red')
  hearts.forEach((item) => {
    item.src = 'img/heart.png'
  })
  if (startButton.getAttribute('data-mode') === 'mode1') seconds.innerHTML = '40';
  else seconds.innerHTML = '10';
  cent_seconds.innerHTML = '00';
  Array.from(document.querySelectorAll('.flip')).forEach((item) => {
    item.classList.remove('flip');
  })
  Array.from(document.querySelectorAll('.hits')).forEach((item) => {
    item.classList.remove('hits');
  })
  panelCards.classList.add('shuffle');
  shuffle();
}

const succes = () => {
  hits++;
  selectedCards[0].children[1].classList.add('hits');
  selectedCards[1].children[1].classList.add('hits');
  selectedCards = [];
  panelCards.classList.remove('bloqued');
  if (hits === 8) endGame(true);
}

const fault = () => {
  if (startButton.getAttribute('data-mode') === 'mode2') {
    hearts[fails].src = 'img/void-heart.png';
    fails++
    if (fails === 3) {
      fails = 0;
      setTimeout(endGame, 400, false)
      endGame(false)
      return
    }
  }
  selectedCards[0].classList.remove('flip');
  selectedCards[1].classList.remove('flip');
  panelCards.classList.remove('bloqued')
  selectedCards = [];
}

const checkSelections = (e) => {
  const count = selectedCards.push(e.target.parentElement);
  e.target.parentElement.classList.add('flip');
  if (count === 2) {
    panelCards.classList.add('bloqued')
    if (selectedCards[0].children[1].getAttribute('data-name') !== selectedCards[1].children[1].getAttribute('data-name')) {
      setTimeout(fault, 500);
    } else {
      setTimeout(succes, 100);
    }
  }
}

const startGame = () => {
  panelCards.classList.remove('bloqued');
  startButton.classList.add('disabled');
  modesButton.classList.add('disabled');
  panelCards.classList.remove('shuffle');
  if (startButton.getAttribute('data-mode') === 'mode1') {
    modeOne();
  }
  else modeTwo();
}

window.addEventListener('load', () => {
  panelCards.classList.add('shuffle');
  shuffle();
})

document.addEventListener('click', (e) => {
  if (e.target.matches('.cards__front'))
    checkSelections(e);
  if (e.target.matches('#start'))
    startGame();
  if (e.target.matches('.button--rematch'))
    playAgain();
  if (e.target.matches('#modes'))
    modal_mode.classList.remove("hidden");
  if (e.target.matches('#mode1'))
    changeMode(e, 'mode1');
  if (e.target.matches('#mode2'))
    changeMode(e, 'mode2');
  if (e.target.matches('#save-mode'))
    saveMode();
})