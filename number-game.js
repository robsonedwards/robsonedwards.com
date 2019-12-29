const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const highScorePara = document.querySelector('.highScore');
const paras = document.querySelector('.numberGameParagraphs')

const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
let highScore = -1;

function randomNatural(max){
    // Random whole number between 1 and max, inclusive
    return Math.floor(Math.random() * max) + 1;
}

let randomNumber = randomNatural(100);

function resetGame(){
    randomNumber = randomNatural(100);
    guessCount = 1;

    resetButton.parentNode.removeChild(resetButton);
    guesses.textContent = '';
    lastResult.textContent = '';

    guessField.disabled = false;
    guessField.value = '';
    guessField.focus();

    paras.style.backgroundColor = 'rgb(191, 191, 191)';
}

function checkGuess(){
    let userGuess = Number(guessField.value);
    if(guessCount === 1)
        guesses.textContent = 'Previous guesses: ';
    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber){
        setGameOver();
    }
    else{
        guessCount++;
        lastResult.textContent = 'Wrong! ';
        if(randomNumber < userGuess){
            lastResult.textContent += 'Too high!';
            paras.style.backgroundColor = 'pink';
        }
        else{
            lastResult.textContent += 'Too low!';
            paras.style.backgroundColor = 'orange';
        }
    }

    guessField.value = '';
    guessField.focus();
}

function setGameOver(){
    lastResult.textContent = 'Congrats! The number was ' + randomNumber + 
    '!';
    paras.style.backgroundColor = 'lightgreen';

    guessField.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start New Game';
    paras.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);

    if(highScore === -1)
        highScore = guessCount;
    if(guessCount <= highScore){
        highScore = guessCount;
        highScorePara.textContent = 'Your best: ' + highScore;
        //todo: remember between sessions
    }
}

//Make enter key work for submit
guessField.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        checkGuess();
    }
}); 
