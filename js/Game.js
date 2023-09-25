/* Game.js to define a Game class with methods to control the flow and state of the game */

/* Game Class
    * constructor
        * missed - tracks number of missed guesses
            * initial value = 0
        * phrases - an arr of 5 Phrase objects to use within the game
            * no nums, punctuation or other special characters
        * activePhrase - the Phrase object that is currently in play
            * initial value = 0
            * this value will change based on startGame() method
    * methods
        * startGame()
            * hides start screen overlay
            * calls getRandomPhrase()
            * sets activePhrase property with the resulting random phrase
            * calls addPhraseToDisplay() on the activePhrase property
        * getRandomPhrase()
            * randomly returns one of the phrases from the phrases array
        * handleInteraction()
            * checks to see if button clicked by player matches and then directs game based on correct or incorrect input
            * disable the selected letter's onscreen keyboard button
            * if the phrase does NOT include,
                * add 'wrong' CSS class to keyboard button
                * call removeLife()
            * if the phrase DOES include,
                * add chosen CSS class to keyboard button
                * call showMatchedLetter() on phrase
                * call checkForWin()
                    * if player has won game, 
                        * call gameOver()
        * removeLife()
            * removes a life from the scoreboard
            * replace liveHeart.png with lostHeart.png
            * increment the missed property
            * if there are 5 missed guesses,
                * call gameOver()
        * checkForWin()
            * checks to see if the player guessed all of the letters in the active phrase
        * gameOver()
            * displays original start screen overlay
            * depending on outcome of game replaces h1 'start' class with:
            * if win: 'win'
            * if lose: 'lose'
 */