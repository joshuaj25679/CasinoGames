let bankValue = 1000;
let currentBet = 0;
let winnings = 0;

let spinString = '';
let betsResult = [];

let betColor = '';
let betNum = '';
let betString = '';

let betNumber = '';

function chip1() {
    currentBet += 5
    document.getElementById("bet").innerHTML = currentBet;
}

function chip2() {
    currentBet += 10
    document.getElementById("bet").innerHTML = currentBet;
}
function chip3() {
    currentBet += 20
    document.getElementById("bet").innerHTML = currentBet;
}
function chip4() {
    currentBet += 50
    document.getElementById("bet").innerHTML = currentBet;
}
function chip5() {
    currentBet += 100
    document.getElementById("bet").innerHTML = currentBet;
}
function chip6() {
    currentBet += 500
    document.getElementById("bet").innerHTML = currentBet;
}
function chip7() {
    currentBet += 1000
    document.getElementById("bet").innerHTML = currentBet;
}


function startGame() {
    document.getElementById("bank").innerHTML = bankValue;
    document.getElementById("bet").innerHTML = currentBet;
    document.getElementById('betBox').innerHTML = '0';


}


function getRandomNumber(min, max) {
    return parseInt(min + Math.random() * (max + 1));
}

function getSpinNum() {

    let ballNum = getRandomNumber(0, 36);

    if (ballNum == 0) {
        ballColor = 'Green';
    } else if (ballNum == 32 || ballNum == 19 || ballNum == 21 || ballNum == 25 || ballNum == 34 || ballNum == 27 || ballNum == 36 || ballNum == 30 || ballNum == 23 || ballNum == 5 || ballNum == 16 || ballNum == 1 || ballNum == 14 || ballNum == 9 || ballNum == 18 || ballNum == 7 || ballNum == 12 || ballNum == 3) {
        ballColor = 'Red';
    } else {
        ballColor = 'Black';
    }

    if (ballNum == 0) {
        ballEven = 'zero';
    } else if (ballNum % 2 == 0) {
        ballEven = 'even';
    } else {
        ballEven = 'odd';
    }

    if (ballNum == 0) {
        ballSmall = 'zero';
    } else if (ballNum <= 18) {
        ballSmall = 'small';
    } else {
        ballSmall = 'big';
    }
    console.log(ballNum + " " + ballColor);
    document.getElementById("resultBox").innerHTML = ballNum + " " + ballColor;
    

    const red = document.querySelector('#red');
    const black = document.querySelector('#black');
    const green = document.querySelector('#green');

    if (red.checked) {
        betColor = 'Red';
    } else if (black.checked) {
        betColor = 'Black';
    } else if (green.checked) {
        betColor = 'Green';
    }

    betNum = document.getElementById("betNumber").value;
    console.log(betNum + " " + betColor);
    document.getElementById("betBox").innerHTML = betNum + " " + betColor;
    

    if (betNum == ballNum || betColor == ballColor){
        bankValue += currentBet;
    } else {
        bankValue -= currentBet;
    }
    document.getElementById("bank").innerHTML = bankValue;
    document.getElementById("bet").innerHTML = currentBet;

    document.getElementById('bank').innerHTML = '$' + bankValue

    document.getElementById('resultBox').innerHTML = "..."

}

function resetGame() {
    document.getElementById('bank').innerHTML = '$1000'
    document.getElementById('winningBox').innerHTML = '0';
    document.getElementById('bet').innerHTML = '0';
    document.getElementById('resultBox').innerHTML = "..."

}
