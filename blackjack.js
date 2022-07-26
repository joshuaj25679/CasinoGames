
//Deck Code
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();

//Fill the Deck with unique cards
function createDeck() {
    deck = new Array();
    for (var i = 0; i < values.length; i++) {
        for (var x = 0; x < suits.length; x++) {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}

//Use a Fisher-Yates shuffle to not have a bias
function shuffle() {
    var currentIndex = deck.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
}


//Player Code
var players = new Array();
function createPlayers(num) {
    players = new Array();
    var house = { Name: 'House', ID: i, Points: 0, Hand: hand };
    players.push(house);
    for (var i = 1; i <= num; i++) {
        var hand = new Array();
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

//Add cards to player hand
var currentPlayer = 0;
function hitMe() {
    // pop a card from the deck to the current player
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    //Change the total points for each player

    //Check if a player lost (new points are over 21)
    checkplayerloss();
}

//Mark player as done to not take more cards
function stay() {
    // move on to next player, if any
    if (currentPlayer != players.length - 1) {
        //Change player turns
        currentPlayer += 1;
    }
    else {
        win();
    }
}

//Dealer/House CPU turn
function houseturn(){
    //Get current points for the house
    var points = 0;
    //If under 16 hit
    //If over 17 stay
    if(points < 16){
        hitMe();
    }
    else{
        stay();
    }
}

//Game Code
function startblackjack() {
    // deal 2 cards to every player object
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(1);
    //Render the UI
    dealHands();

}

//Fill player hands of 2 cards
function dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    for (var i = 0; i < 2; i++) {
        for (var x = 0; x < players.length; x++) {
            var card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            //Change the total for each player

        }
    }
    //Update Deck UI

}

function checkplayerloss() {
    if (players[currentPlayer].Points > 21) {
        //Update the UI for a player lost/is out
    }
}

function win() {
    var winner = -1;
    var score = 0;

    for (var i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }

        score = players[i].Points;
    }

    //Declare Winner
}