let bankValue = 1000;
let currentBet = 0;
let wager = 5;
let lastWager = 0;
let bet = [];
let numbersBet = [];
let previousNumbers = [];

//let redNums = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
let wheelNumbers = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

let container = document.findById('container');
document.getElementById("bank").value = bankValue;


startGame();

function resetGame() {
    bankValue = 1000;
    currentBet = 0;
    wager = 5;
    bet = [];
    numbersBet = [];
    previousNumbers = [];
    document.getElementById('bettingBoard').remove();
    document.getElementById('notification').remove();
    buildBettingBoard();
}

function startGame() {
    buildBettingBoard();
}

function gameOver() {
    let notification = document.createElement('div');
    notification.setAttribute('id', 'notification');
    let nSpan = document.createElement('span');
    nSpan.setAttribute('class', 'nSpan');
    nSpan.innerText = 'Bankrupt';
    notification.append(nSpan);

    let nBtn = document.createElement('div');
    nBtn.setAttribute('class', "nBtn");
    nBtn.innerText = 'Play Again';
    nBtn.onclick = function () {
        resetGame();
    }
    notification.append(nBtn);
    container.prepend(notification);
}
//array of numbers and colors on spin 
let redNums = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3]
let blackNums = [26, 15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35]
//randomize numbers and colors, check against bet (numbers and colors separately?),
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getSpinNum(){
let rand = getRandomNumber(1, 3);
let winNum = 0;
let winColor= '';

if (rand == 1) {
    winColor ='Red';
    winNum = redNums[Math.floor(Math.random() * redNums.length)];
} else if (rand == 2) {
    winColor ='Black';
    winNum = blackNums[Math.floor(Math.random() * blackNums.length)];
}
    let winString = `${winColor} ${winNum}`;
    document.getElementById('winningStringBox').value = winString;
    
    //lose condition
}
function clearBet() {
    bet = [];
    numbersBet = [];
}

function setBet(e, n, t, o) {
    lastWager = wager;
    wager = (bankValue < wager) ? bankValue : wager;
    if (wager > 0) {
        if (!container.querySelector('.spinBtn')) {
            spinBtn.onclick = function () {
                this.remove();
                spin();
            };
            container.append(spinBtn);
        }
        bankValue = bankValue - wager;
        currentBet = currentBet + wager;
        document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString('en-GB') + '';
        document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString('en-GB') + '';
        for (i = 0; i < bet.length; i++) {
            if (bet[i].numbers == n && bet[i].type == t) {
                bet[i].amt = bet[i].amt + wager;
                let chipColor = (bet[i].amt < 5) ? 'red' : ((bet[i].amt < 10) ? 'blue' : (bet[i].amt < 100) ? 'orange' : 'gold');
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
        for (i = 0; i < numArray.length; i++) {
            if (!numbersBet.includes(numArray[i])) {
                numbersBet.push(numArray[i]);
            }
        }
        if (!e.querySelector('.chip')) {
            let chipColor = (wager < 5) ? 'red' : ((wager < 10) ? 'blue' : ((wager < 100) ? 'orange' : 'gold'));
            let chip = document.createElement('div');
            chip.set('class', 'chip' + chipColor);
            let chipSpan = document.createElement('span');
            chipSpan.setAttribute('class', 'chipSpan');
            chipSpan.innerText = wager;
            chip.append(chipSpan);
            e.append(chip)
        }

    }


    function buildBettingBoard() {
        let bettingBoard = document.findById('bettingBoard');


        //build the board
        var numberBlocks = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2 to 1', 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2 to 1', 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2 to 1'];
        for (i = 0; i < numberBlocks.length; i++) {
            let a = i;
            var nbClass = (numberBlocks[i] == '2 to 1') ? 'tt1_block' : 'number_block';
            var numberBlock = document.createElement('div');
            numberBlock.setAttribute('class', nbClass);
            numberBlock.onclick = function () {
                if (numberBlocks[a] != '2 to 1') {
                    setBet('' + numberBlocks[a] + '', 'inside_whole', 35);
                } else {
                    num = (a == 12) ? '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36' : ((a == 25) ? '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35' : '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34');
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

    }

}