"use strict";

//Selecting elements
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const score1 = document.getElementById("score--1");
const score2 = document.getElementById("score--2");
const cScore1 = document.getElementById("current--1");
const cScore2 = document.getElementById("current--2");
const img_dice = document.getElementsByClassName("dice")[0];
const btnNew = document.querySelector(".btn-new-game");
const btnRoll = document.querySelector(".btn-roll-dice");
const btnHold = document.querySelector(".btn-hold");

let scores, currentScore, activePlayer, playing;

//Initializer function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  //Game started
  score1.textContent = 0;
  score2.textContent = 0;
  cScore1.textContent = 0;
  cScore2.textContent = 0;

  //in beginning dice will be hidden
  img_dice.classList.add("hidden");

  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player-active");
  player2.classList.remove("player-active");
};
init();

//Switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  currentScore = 0;
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generate the random number
    const num = Math.trunc(Math.random() * 6 + 1);

    //2.Remove hidden class from img
    img_dice.classList.remove("hidden");
    img_dice.src = `dice-${num}.png`;
    console.log(num);

    //3. If rolled is not 1
    if (num !== 1) {
      currentScore += num;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // cScore1.textContent=currentScore;
    } else {
      //switch the player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    //1.total score=total score+scurrent score
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer - 1];

    //2.if total score=>100,player win
    if (scores[activePlayer - 1] >= 100) {
      playing = false;
      img_dice.classList.add("hidden");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
    }
    //3. Switch the player
    else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
