
//Deck Code
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();

//Player Variables
var currentPlayer = 0;
var players = new Array();

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
function createPlayers(num) {
    players = new Array();
    for (var i = 1; i <= num; i++) {
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: new Array()};
        players.push(player);
    }
    var house = { Name: 'House', ID: 0, Points: 0, Hand: new Array() };
    players.push(house);
}

//Game Code
function startBlackJack() {
    deck = new Array();
    players = new Array();
    currentPlayer = 0;
    // deal 2 cards to every player object
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("hit").style.visibility = "visible";
    document.getElementById("stay").style.visibility = "visible";
    createDeck();
    shuffle();
    createPlayers(4);
    updatePlayerTurns();
    dealHands();
    displayCardsInHand();
}

//Add cards to player hand
function hitMe() {
    // pop a card from the deck to the current player
    var card = deck.pop();
    if(card.Value == "A"){
        card = autoAce(card);
    }
    players[currentPlayer].Hand.push(card);

    displayHand(players[currentPlayer].Hand.length-1);
    displayCardsInHand();
    //Change the total points for each player
    players[currentPlayer].Points = updatePoints(players[currentPlayer].Hand);
    
    //Check if a player lost (new points are over 21)
    if(checkPlayerLoss()){
        players[currentPlayer].Points = updatePoints(players[currentPlayer].Hand);
        document.getElementById(`player${currentPlayer+1}Points`).innerHTML = "Busted";
        stay();
    }
}

//Mark player as done to not take more cards
function stay() {
    resetHand();
    // move on to next player, if any
    if (currentPlayer != players.length - 1) {
        //Change player turns
        currentPlayer += 1;
        updatePlayerTurns();
        players[currentPlayer].Points = updatePoints(players[currentPlayer].Hand);
        displayCardsInHand();
        displayHand(0);
    }
    else {
        checkPlayerWin();
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
    for(let i = 0; i < hand.length; i++){
        updatedPoints += hand[i].Weight;
    };
    return updatedPoints;
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

//Fill player hands of 2 cards
function dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    for (var i = 0; i < 2; i++) {
        for (var x = 0; x < players.length; x++) {
            var card = deck.pop();
            players[x].Hand.push(card);
            //Update Player hands
            displayHand(0);
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
    var winner = "";
    var score = players[4].Points;
    for (var i = 0; i < players.length-1; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = winner + players[i].Name + ", ";
        }
    }
    //Declare Winner
    document.getElementById("turn").innerHTML = "Winners : " + winner;
    document.getElementById("hit").style.visibility = "hidden";
    document.getElementById("stay").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";
}

function updatePlayerTurns() {
    var playerTurn = document.getElementById("turn");
    playerTurn.innerHTML = players[currentPlayer].Name + " Turn";
}

function displayHand(i){
    var player = players[currentPlayer];
    var cardToDisplay = "card" + player.Hand[i].Suit + player.Hand[i].Value + ".png";
    if(currentPlayer < 4){
        document.getElementById(`player${currentPlayer+1}Hand`).src = "./images/Cards/" + cardToDisplay;
    }
    else{
        document.getElementById("house").src = "./images/Cards/" + cardToDisplay;
    }
    
}

function resetHand(){
    var cardToDisplay = "./images/Cards/cardBack_red4.png";
    if(currentPlayer < 4){
        document.getElementById(`player${currentPlayer+1}Hand`).src = cardToDisplay;
    }
    else{
        document.getElementById("house").src = cardToDisplay;
    }
}

function displayCardsInHand(){
    var player = players[currentPlayer];
    totalPoints = "";
    for (var i = 0; i < player.Hand.length; i++) {
        totalPoints += player.Hand[i].Value + ", ";
    }
    if(currentPlayer < 4){
        document.getElementById(`player${currentPlayer+1}Points`).innerHTML = totalPoints;
    }
    else{
        document.getElementById("House").innerHTML = totalPoints;
    }
}