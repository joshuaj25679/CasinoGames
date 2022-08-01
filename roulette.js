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
<<<<<<< Updated upstream
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

function clearBet(){
    bet = [];
    numbersBet = [];
}

function setBet(e, n, t, o){
    lastWager = wager;
    wager = (bankValue < wager)? bankValue : wager;
    if (wager > 0) {
        if(!container.querySelector('.spinBtn')) {
            let spinBtn = document.createElement('div');
            spinBtn.setAttribute('class', 'spinBtn');
            spinBtn.innerText = 'Spin';
            spinBtn.onclick = function() {
                this.remove();
                spin();
            };
            container.append(spinBtn);
        }
        bankValue = bankValue - wager;
        currentBet = currentBet + wager;
        document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString('en-GB') + '';
        document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString('en-GB') + '';
        for(i = 0; i < bet.length; i++){
            if(bet[i].numbers == n && bet[i].type == t){
                bet[i].amt = bet[i].amt + wager;
                let chipColor = (bet[i].amt < 5)? 'red' : ((bet[i].amt < 10)? 'blue' : (bet[i].amt < 100)? 'orange' : 'gold');
                e.querySelector('.chip').style.cssText = '';
                e.querySelector('.chip').setAttribute('class', 'chip' + chipColor);
                let chipSpan = e.querySelector('.chipSpan');
                chipSpan.innerText = bet[i].amt;
                return;
            }
        }
        var obj = {
            amt: wager,
            type: t,
            odds: o,
            numbers: n
        };
        bet.push(obj);

        let numArray = n.split(',').map(Number);
        
    }
=======

function buildBettingBoard(){
    let bettingBoard = document.createElement('div');
bettingBoard.setAttribute('id', 'betting_board');
//board logic here 

//build the board
var numberBlocks = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2 to 1', 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2 to 1', 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2 to 1'];
for(i = 0; i < numberBlocks.length; i++){
    let a = i;
    var nbClass = (numberBlocks[i] == '2 to 1')? 'tt1_block' : 'number_block';
    var numberBlock = document.createElement('div');
    numberBlock.setAttribute('class', nbClass);
    numberBlock.onclick = function(){
        if(numberBlocks[a] != '2 to 1'){
            setBet(''+numberBlocks[a]+'', 'inside_whole', 35);
        }else{
            num = (a == 12)? '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36' : ((a == 25)? '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35' : '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34');
            setBet(num, 'outside_column', 2);
        }
    };
    var nbn = document.createElement('div');
    nbn.setAttribute('class', 'nbn');
    nbn.innerText = numberBlocks[i];
    numberBlock.append(nbn);
    numberBoard.append(numberBlock);
}
bettingBoard.append(numberBoard);
>>>>>>> Stashed changes
}