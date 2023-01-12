'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnInst = document.querySelector('.btn--instruction');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
//starting condition

let currentScore = 0;
let activePlayer = 0;
let finalScores = [0, 0];
let playing = true;

const startUp = function () {
  score0El.textContent = score1El.textContent = 0;
  diceEl.classList.add('hidden');

  if (activePlayer == 1) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
  } else {
    player1El.classList.add('player--active');
    player0El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
  }
  if (!playing) {
    document.querySelector(`.winner--${activePlayer}`).classList.add('hidden');
  }
  currentScore = 0;
  activePlayer = 0;
  finalScores = [0, 0];

  score0El.textContent = score1El.textContent = 0;
  current0El.textContent = current1El.textContent = 0;
  playing = true;
};

// Dice roll
startUp();

const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let number = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${number}.png`;

    // Check for rolled 1
    if (number !== 1) {
      //add dice to current score
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    finalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
  if (finalScores[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document.querySelector(`#name--${activePlayer}`).style.textAlign = 'center';
    document
      .querySelector(`.winner--${activePlayer}`)
      .classList.remove('hidden');
    diceEl.classList.add('hidden');
  } else {
    swtichPlayer();
  }
});

btnNew.addEventListener('click', startUp);

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  overlay.style.zIndex = '6';
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  overlay.style.zIndex = '4';
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnInst.addEventListener('click', openModal);
