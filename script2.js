const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHigh');
const highScorePara = document.querySelector('.highScore');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let randomNumber = Math.floor(Math.random() * 100) + 1; // random integer 1-100
let guessCount = 1;
let resetButton;
let highScore = -1;

function resetGame(){
    randomNumber = Math.floor(Math.random() * 100) + 1; // random integer 1-100
    guessCount = 1;
    resetButton.parentNode.removeChild(resetButton);

    resultParas = document.getElementById('resultParas');
    for(let i = 0; i < resultParas.children.length; i++){
        resultParas.children[i].textContent = '';
    }

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = '';
}

function checkGuess(){
    let userGuess = Number(guessField.value);
    if(guessCount === 1){
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber){
        lastResult.textContent = 'Congrats! The number was ' + randomNumber + 
            '!';
        lastResult.style.backgroundColor = 'green';
        lowOrHigh.textContent = '';
        setGameOver();
    }
    else{
        guessCount++;
        lastResult.textContent = 'Wrong! ';
        if(randomNumber < userGuess)
            lastResult.textContent += 'The last guess was too high!';
        else
            lastResult.textContent += 'The last guess was too low!';
        lastResult.style.backgroundColor = 'red';
    }

    guessField.value = '';
    guessField.focus();
}

function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start New Game';
    document.getElementById('resultParas').appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);

    if(highScore === -1)
        highScore = guessCount;
    if(guessCount <= highScore){
        highScore = guessCount;
        highScorePara.textContent = 'Best Score: ' + highScore;
    }
}

guessField.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        guessSubmit.click();
    }
  }); 
guessSubmit.addEventListener('click', checkGuess);


/* document.addEventListener("DOMContentLoaded", function () {
    function createParagraph() {
        let para = document.createElement('p');
        para.textContent = 'You clicked the button!';
        document.body.appendChild(para);
    }

    const buttons = document.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', createParagraph);
    }
}); */