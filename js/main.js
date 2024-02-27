const formElement = document.getElementById('form');
const chancesRemainingElement = document.getElementById('chancesRemaining');
const errorsQuantityElement = document.getElementById('errorsQuantity');
const tipElement = document.getElementById('tip');

const errorNumbers = [];
const randomNumber = Math.floor(Math.random()*100+1);
let errorQuantity = 0;
let chancesRemaining = 6;
let tip;
let isWinGame = false;

function handleGameMessages({ tipMessage, num }, isWin = false) {
    switch (isWin) {
        case true:
            tip = tipMessage;
            isWinGame = isWin;
            break;
        default:
            tip = tipMessage;
            errorNumbers.push(num);
            errorQuantity++;
            chancesRemaining--;
            break;
    }
}

function updateMessage() {
    errorsQuantityElement.innerHTML = `Erros: (${errorNumbers.join(",")})`;
    chancesRemainingElement.innerHTML = `Chances: ${chancesRemaining}`;
    tipElement.innerHTML = tip;
}

function validateNumber(num) {
    if (parseInt(num) > randomNumber) {
        handleGameMessages({ tipMessage: `Dica: É um número menor que ${num}`, num });
    } else if (parseInt(num) < randomNumber) {
        handleGameMessages({ tipMessage: `Dica: É um número maior que ${num}`, num });
    } else {
        handleGameMessages({ tipMessage: "Parabéns, você acertou" }, true);
    }

    updateMessage();
}

function handleGame(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    if (chancesRemaining <= 0 || !data.num) return;

    if (!isWinGame) validateNumber(data.num);
}

formElement.addEventListener('submit', handleGame);
