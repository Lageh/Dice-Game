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
//starting condition

let currentScore = 0;
let activePlayer = 0;
let finalScores = [0, 0];
let playing = true;

const startUp = function () {
  score0El.textContent = score1El.textContent = 0;
  diceEl.classList.add('hidden');

  if (activePlayer == 1) {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
  currentScore = 0;
  activePlayer = 0;
  finalScores = [0, 0];

  score0El.textContent = score1El.textContent = 0;
  current0El.textContent = current1El.textContent = 0;
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
  finalScores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    finalScores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (finalScores[activePlayer] >= 100) {
    console.log(activePlayer);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    diceEl.classList.add('hidden');
    playing = false;
  } else {
    swtichPlayer();
  }
});

btnNew.addEventListener('click', startUp);
