let bankValue = 1000;
let currentBet = 0;
let wager = 5;
let lastWager = 0;
let bet = [];
let numbersBet = [];
let previousNumbers = [];

let redNums = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
let wheelNumbers = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

let container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.append(container);

startGame();

let wheel = document.getElementsByClassName('wheel')[0];
let ballTrack = document.getElementsByClassName('ballTrack')[0];

function resetGame(){
    bankValue = 1000;
    currentBet = 0;
    wager = 5;
    bet = [];
    numbersBet = [];
    previousNumbers = [];
    document.getElementById('betting_board').remove();
    document.getElementById('notification').remove();
    buildBettingBoard();
}

function startGame(){
    buildWheel();
    buildBettingBoard();
}

function gameOver(){
    let notification = document.createElement('div');
    notification.setAttribute('id', 'notification');
        let nSpan = document.createElement('span');
        nSpan.setAttribute('class', 'nSpan');
        nSpan.innerText = 'Bankrupt';
        notification.append(nSpan);

        let nBtn = document.createElement('div');
        nBtn.setAttribute('class', "nBtn");
        nBtn.innerText = 'Play Again';
        nBtn.onclick = function(){
            resetGame();
        }
        notification.append(nBtn);
    container.prepend(notification);
}

function buildWheel(){
    let wheel = document.createElement('div');
    wheel.setAttribute('class', 'wheel');

    let outerRim = document.createElement('div');
    outerRim.setAttribute('class', 'outerRim');
    wheel.append(outerRim);

    let numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    for (i = 0; i < numbers.length; i++) {
        let a = i + 1;
        let spanClass = (numbers[i] < 10)? 'single' : 'double';
        let sect = document.createElement('div');
        sect.setAttribute('id', 'sect' + a);
        sect.setAttribute('class', 'sect');
        let span = document.createElement('span');
        span.setAttribute('class', spanClass);
        span.innerText = numbers[i];
        sect.append(span);
        let block = document.createElement('div');
        block.setAttribute('class', 'block');
        sect.append(block);
        wheel.append(sect);
    }

    let pocketsRim = document.createElement('div');
    pocketsRim.setAttribute('class', 'pocketsRim');
    wheel.append(pocketsRim);

    let ballTrack = document.createElement('div');
    ballTrack.setAttribute('class', 'ballTrack');
    let ball = document.createElement('div');
    ball.setAttribute('class', 'ball');
    ballTrack.append(ball);
    wheel.append(ballTrack);

    let pockets = document.createElement('div');
    pockets.setAttribute('class', 'pockets');
    wheel.append(pockets);

    let cone = document.createElement('div');
    cone.setAttribute('class', 'cone');
    wheel.append(cone);

    let turret = document.createElement('div');
    turret.setAttribute('class', 'turret');
    wheel.append(turret);

    let turretHandle = document.createElement('div');
    turretHandle.setAttribute('class', 'turretHandle');
    let thendOne = document.createElement('div');
    thendOne.setAttribute('class', 'thendOne');
    turretHandle.append(thendOne);
    let thendTwo = document.createElement('div');
    thendTwo.setAttribute('class', 'thendTwo');
    turretHandle.append(thendTwo);
    wheel.append(turretHandle);

    container.append(wheel);
}