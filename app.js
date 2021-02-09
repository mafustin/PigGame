/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

initialisation();


/* DOM manipulation */
//2 methods of selecting HTML
//document.querySelector('#current-' + activePlayer).textContent = dice; // can place only plain text no HTML element

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</>'; //Setter - set the value

//var x = document.querySelector('#score-0').textContent; // Getter - get the value



document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round number if the rolled number was NOT a 1
        if (dice !== 1) {
            // add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).innerHTML = roundScore;

        } else {
            // next player
            nextPlayer();
        }
    }
    
});

function nextPlayer() {
        roundScore = 0;
        document.getElementById('current-'+activePlayer).textContent = '0';
        /* DRUGI NACIN S REMOVE/ADD CLASS GDJE SE DIREKTNO MICE ILI DODAJE KLASA, U OVOM SLUČAJU DI OVISI O ACRIVE PLAYERU JE BITAN REDOSLIJED, INACE BI MORA BIT IF ILI TENARNI DA SE ZNA KOME ODUZET KLASU A KOME DODAT */
        
        //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        
        /* JEDAN NACIN S TOGGLEOM GDJE SE PROVJERAVA POSSTOJI LI TA KLASA AKO JE NEMA DODAJE SE, AKO JE IMA NISTA SE NE PODUZIMA (NJEGOV NACIN)  */
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
}



document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
       // ADD CURRENT SCORE TO GLOBAL SCORE
        scores[activePlayer] += roundScore;
    
        // UPDATE THE UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
        // CHECK IF PLAYER WON THE GAME
        if (scores[activePlayer] >= 100 ) { 
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            // Next Player
            nextPlayer();
        }
    }
     
});

document.querySelector('.btn-new').addEventListener('click', initialisation);

function initialisation () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').innerHTML = '0'; 
    document.getElementById('score-1').innerHTML = '0';  
    document.getElementById('current-1').innerHTML = '0';  
    document.getElementById('current-0').innerHTML = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
}














