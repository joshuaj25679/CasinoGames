
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
    var hand = new Array();
    var house = { Name: 'House', ID: i, Points: 0, Hand: hand };
    players.push(house);
    for (var i = 1; i <= num; i++) {
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand};
        players.push(player);
    }
}

//Add cards to player hand
var currentPlayer = 0;
function hitMe() {
    // pop a card from the deck to the current player
    var card = deck.pop();
    if(card.Value == "A"){
        card = autoAce(card);
    }
    players[currentPlayer].Hand.push(card);
    //Change the total points for each player
    players[currentPlayer].Points = updatePoints(players[currentPlayer].Hand);
    //Check if a player lost (new points are over 21)
    if(checkPlayerLoss()){
        stay();
    }
}

//Deal with A for a 1 or 11
function autoAce(card){
    //Get current player points.
    var currentPlayerPoints = players[currentPlayer].Points;
    //if points + 11 > 21
    if(currentPlayerPoints + 11 > 21){
        card.weight = 1;
    }
    return card;
}

function updatePoints(hand){
    var updatedPoints = 0;
    hand.forEach(Card => {
        updatedPoints += Card.weight;
    });
    return updatedPoints;
}

//Mark player as done to not take more cards
function stay() {
    // move on to next player, if any
    if (currentPlayer != players.length - 1) {
        //Change player turns
        currentPlayer += 1;
        updatePlayerTurns();
    }
    else {
        checkPlayerWin();
    }
}

//Dealer/House CPU turn
function houseturn(){
    //Get current points for the house
    var points = 0;
    //loop until stay
    while(points < 17){
        //If under 16 hit
        if(points < 17){
            hitMe();
        }
    }
    //If over 17 stay
    if(points > 17){
        stay();
    }
}

function displayHand(){
    var player = players[currentPlayer];
    console.log(player);
    console.log(player.Hand[0]);
    var cardToDisplay = "card" + player.Hand[0].Suit + player.Hand[0].Value + ".png";
    console.log(cardToDisplay);

    if(currentPlayer < 5){
        console.log(cardToDisplay)
        document.getElementById("player" + currentPlayer+1 + "Hand" ).src = "./images/Cards/" + cardToDisplay;
    }
    else{
        console.log(cardToDisplay)
        document.getElementById("house").src = "./images/Cards/" + cardToDisplay;
    }
    
}

//Game Code
function startBlackJack() {
    // deal 2 cards to every player object
    document.getElementById("start").style.visibility = "hidden";
    createDeck();
    shuffle();
    createPlayers(4);
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
            //Update Player hands
            displayHand();
        }
    }
}

function checkPlayerLoss() {
    //Return true or false
    if (players[currentPlayer].Points > 21) {
        return true;
    }
    else{
        return false;
    }
}

function checkPlayerWin() {
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

function updatePlayerTurns() {
    var playerTurn = document.getElementById("turn");
    playerTurn.innerHTML = players[currentPlayer].Name;
}