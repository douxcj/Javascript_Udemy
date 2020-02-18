//A player loses all the points when he rolls two 6's in a row

var scores, roundScore, activePlayer, gamePlaying;

init();

//var lastDice;



// event handler - roll button
document.querySelector('.btn-roll').addEventListener('click', function() {
    //do something here -- anonymous function
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random()*6) + 1;
        var dice2 = Math.floor(Math.random()*6) + 1;

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        

        // 3. update the round score if the rilled number is NOT a 1
        /* Code challenge 1
        
        if (dice ===6 && lastDice === 6) {
            // player loses score

            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            nextPlayer();

        }
        lastDice = dice;
        */

        //Update round score IF none of the dices are 1. 
       if (dice1 !== 1 && dice2 !==1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
        console.log(dice1, dice2);
        setTimeout(nextPlayer(), 1000);

        }
    }
  
});

// Event handler -- hold button

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (gamePlaying) {
        // add current score to GLOBAL score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        var input = document.querySelector('.final_score').value;
        var winningScore;
        //undefined,0,null or "" are coerced to false
        //Anything wlse is coerced to true
        if(input) {
            winningScore = input;

        } else {
            winningScore = 100;
        }


        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player -- exactly the same code
            nextPlayer();
        }

    }
});

function nextPlayer() {
    //next player
    //tenory operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //TOGGLE
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.getElementById('dice-1').style.display = 'none';
    //document.getElementById('dice-2').style.display = 'none';
};


// Event handler -- new game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    //change the display property in the css style
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // get element by id
    // set the initial numbers to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //remove winner
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    //remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //remove active from both, then add active class to the first player
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



