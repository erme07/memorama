const cardsArray = Array.from(document.querySelectorAll('.cards__back'));
const panelCards = document.querySelector('.cards')
const display_mode = document.getElementById('display-mode');

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

// const startTimer = () => {
//   let cent_count = 0, seg_count = 0;
//   const timer = setInterval(() => {
//     cent_count++
//     if (cent_count === 100) {
//       cent_count = 0;
//       seg_count++
//       if (seg_count == 60) seg_count = 0;
//       if (seg_count < 10) seconds.innerHTML = '0' + seg_count;
//       else seconds.innerHTML = seg_count;
//     }
//     if (cent_count < 10) cent_seconds.innerHTML = '0' + cent_count;
//     else cent_seconds.innerHTML = cent_count;
//   }, 10)
//   return timer
// }

const countDownTimer = (seg) => {
  let cent_count = 100, seg_count = seg, aux = seg;
  const timer_ = setInterval(() => {
    cent_count--;
    if (cent_count === 0) {
      if (seg_count === 0 && cent_count === 0) {
        cent_seconds.innerHTML = '00';
        clearInterval(timer_);
        if (aux !== 9) endGame(false);
        else {
          seconds.innerHTML = '29'
          timer = countDownTimer(29);
          Array.from(document.querySelectorAll('.cards__place')).forEach((e) => {
            e.classList.remove('flip');
          })
        }
        return;
      }
      cent_count = 100;
      seg_count--
      if (seg_count < 10) {
        seconds.innerHTML = '0' + seg_count
        if (aux !== 9) display_time.style = 'color:red';
      }
      else seconds.innerHTML = seg_count;
    }
    if (cent_count < 10) cent_seconds.innerHTML = '0' + cent_count;
    else cent_seconds.innerHTML = cent_count;

  }, 10)
  return timer_
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
    panelCards.classList.add('bloqued')
    if (selectedCards[0].children[1].getAttribute('data-name') !== selectedCards[1].children[1].getAttribute('data-name')) {
      fails++
      if (fails === 3) {
        setTimeout(endGame, 400, false)
      }
      setTimeout(fault, 700);
    } else {
      setTimeout(succes, 400);
    }
  }
}

const modeOne = () => {
  seconds.innerHTML = '39'
  timer = countDownTimer(39);
}

const modeTwo = () => {
  const cards = Array.from(document.querySelectorAll('.cards__place'));
  cards.forEach((e) => {
    e.classList.add('flip')
  })
  seconds.innerHTML = '09'
  timer = countDownTimer(9);
}

const startGame = () => {
  panelCards.classList.remove('bloqued');
  startButton.classList.add('disabled');
  modesButton.classList.add('disabled');
  panelCards.classList.remove('shuffle');
  if (mode) {
    lives.classList.add('disabled');
    modeOne();
  }
  else modeTwo();
}

const endGame = (condition) => {
  panelCards.classList.add('bloqued');
  startButton.classList.remove('disabled');
  modesButton.classList.remove('disabled');
  lives.classList.remove('disabled');
  clearInterval(timer);
  if (condition) modal_win.classList.remove('hidden');
  else modal_lose.classList.remove('hidden');

}

const changeMode = (e) => {
  mode2_button.classList.toggle('unselected');
  mode1_button.classList.toggle('unselected');
  instruction1.classList.toggle('show');
  instruction2.classList.toggle('show');
  if (e.target.matches('#mode1')) {
    mode = true;
    seconds.innerHTML = '40';
  }
  else {
    seconds.innerHTML = '10';
    mode = false;
  }
}

window.addEventListener('load', () => {
  panelCards.classList.add('shuffle');
  shuffle();
})


document.addEventListener('click', (e) => {
  if (e.target.matches('.cards__front')) {
    checkSelections(e)
  }
  if (e.target.matches('#start')) {
    startGame()
  }
  if (e.target.matches('.button--rematch')) {
    modal_win.classList.add('hidden')
    modal_lose.classList.add('hidden')
    if (mode) seconds.innerHTML = '40';
    else seconds.innerHTML = '10';
    cent_seconds.innerHTML = '00';
    display_time.style = '';
    Array.from(document.querySelectorAll('.flip')).forEach((e) => {
      e.classList.remove('flip');
    })
    Array.from(document.querySelectorAll('.hits')).forEach((e) => {
      e.classList.remove('hits');
    })
    panelCards.classList.add('shuffle');
    shuffle();
  }
  if (e.target.matches('#modes'))
    modal_mode.classList.remove("hidden");

  if (e.target.matches('#mode1'))
    changeMode(e);

  if (e.target.matches('#mode2'))
    changeMode(e);

  if (e.target.matches('#save-mode')) {
    modal_mode.classList.add("hidden");
    if (mode) {
      lives.classList.add('disabled');
      display_mode.innerHTML = 'mode 1';
    }
    else {
      lives.classList.remove('disabled');
      display_mode.innerHTML = 'mode 2';
    }

  }
})