let score = JSON.parse(localStorage.getItem('score'));

if (!score){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}

showScore();

//Event Listeners para os botões
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');

/* Vamos passar a usar o atalho () => {} para as funçoes passadas como parametro em vez do function() {}
rockButton.addEventListener('click', function() {
  playGame('rock');
  //mais código da funcao por aqui fora se precisar
});*/

rockButton.addEventListener('click', () => {
  playGame('rock');
  //mais código da funcao por aqui fora se precisar
});

paperButton.addEventListener('click', () => playGame('paper')); //quando a função so tem uma linha não precisa de {}. Pode ser escrita diretamente.

scissorsButton.addEventListener('click', () => playGame('scissors'));

//Event Listener para jogar com as teclas r p s ||| para dar auto play com a tecla a ||| e para dar reset no score com a tecla backspace
document.body.addEventListener('keydown', (event) => { //Passa variada informação do evento na variavel event, depois é possivel aceder a essa informaçao
  if (event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's'){
    playGame('scissors');
  } else if (event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
});

//Event Listener para o botao Reset ao Score
document.querySelector('.js-reset-score').addEventListener('click', () => resetScore());

//Event Listener para o butao do Auto-Play
document.querySelector('.js-auto-play-button').addEventListener('click', () => autoPlay());

function playGame(playerMove) {
  const computerMove = computerMoveGen();

  const resultElem = document.querySelector('.js-result');
  const movesElem = document.querySelector('.js-moves');
  

  if (playerMove === computerMove) {
    score.ties += 1;

    movesElem.innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon-result">   -   <img src="${computerMove}-emoji.png" class="move-icon-result"> Bot`;
    resultElem.innerHTML = 'Its a Tie.';

  } else if (playerMove === "rock" && computerMove === "paper") {
    score.losses += 1;
    
    movesElem.innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon-result">   -   <img src="${computerMove}-emoji.png" class="move-icon-result"> Bot`;
    resultElem.innerHTML = 'You Lose.';

  } else if (playerMove === "paper" && computerMove === "scissors") {
    score.losses += 1;

    movesElem.innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon-result">   -   <img src="${computerMove}-emoji.png" class="move-icon-result"> Bot`;
    resultElem.innerHTML = 'You Lose.';

  } else if (playerMove === "scissors" && computerMove === "rock") {
    score.losses += 1;

    movesElem.innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon-result">   -   <img src="${computerMove}-emoji.png" class="move-icon-result"> Bot`;
    resultElem.innerHTML = 'You Lose.';

  } else {
    score.wins += 1;

    movesElem.innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon-result">   -   <img src="${computerMove}-emoji.png" class="move-icon-result"> Bot`;
    resultElem.innerHTML = 'You Win.';

  }
  localStorage.setItem('score', JSON.stringify(score));

  showScore();
}

function computerMoveGen() {

  const rand = Math.random(); //Rock -> Entre 0 e 1/3 | Paper -> Entre 1/3 e 2/3 | Scissors -> Entre 2/3 e 1

  if (rand >= 0 && rand < 1/3){
    return 'rock';
  } else if (rand >= 1/3 && rand < 2/3){
    return 'paper';
  } else {
    return 'scissors';
  }
}

function showScore() {
  //Mostrar o score no paragrafo
  const scoreElem = document.querySelector('.js-score');
  scoreElem.innerHTML = `Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.ties}`;
}

function resetScore(){

  document.querySelector('.confirmation-reset-score').innerHTML =
    `<p class="p-score-reset">Are you sure you want to reset the score? <button class="confirm-button confirm-yes-button">Yes</button><button class="confirm-button confirm-no-button">No</button></p>`;
  
    document.querySelector('.confirm-yes-button').addEventListener('click', () => {
      document.querySelector('.confirmation-reset-score').innerHTML = '';
      localStorage.removeItem('score');
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      showScore(); //Volta a mostrar o score já atualizado
    });

    document.querySelector('.confirm-no-button').addEventListener('click', () => {
      document.querySelector('.confirmation-reset-score').innerHTML = '';
    })
}

function thankYou(){
  const thanksElem = document.querySelector('.thanksButton');

  if (thanksElem.innerHTML === "Thank You"){
    thanksElem.innerHTML = "Thanked :D";
    thanksElem.classList.add('thanked');
  } else {
    thanksElem.innerHTML = "Thank You";
    thanksElem.classList.remove('thanked');
  }
}

function printScore() {
  const playerElem = document.querySelector('.js-player-name');

  const playerName = playerElem.value; //Ir buscar o valor que está inserido pelo user no input

  alert(`Congratulations ${playerName} !!! =D\n\nYour Score:\nWins: ${score.wins}\nLosses: ${score.losses}\nTies: ${score.ties}`);
}

function pressionaEnter(event){
  if(event.key === 'Enter'){
    printScore();
  }
}

/*Auto Play (com funcao normal)
let intervalID; //é necessario guardar o id do setInterval se o quisermos parar depois (caso nao queiramos parar não é necessário variavel nenhuma)
let isAutoPlaying = false;

function autoPlay(){

  if(!isAutoPlaying){
    intervalID = setInterval(function() {
      let pcMove = computerMoveGen();
      playGame(pcMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.autoPlayButton').innerHTML = 'Stop';
  } else {
    clearInterval(intervalID); //parar o setInterval
    isAutoPlaying = false;
    document.querySelector('.autoPlayButton').innerHTML = 'Auto-Play';
  }
}*/

//Auto Play (com atalho funcao =>)
let intervalID; //é necessario guardar o id do setInterval se o quisermos parar depois (caso nao queiramos parar não é necessário variavel nenhuma)
let isAutoPlaying = false;

function autoPlay(){

  if(!isAutoPlaying){
    intervalID = setInterval(() => {
      let pcMove = computerMoveGen();
      playGame(pcMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.autoPlayButton').innerHTML = 'Stop';
  } else {
    clearInterval(intervalID); //parar o setInterval
    isAutoPlaying = false;
    document.querySelector('.autoPlayButton').innerHTML = 'Auto-Play';
  }
}