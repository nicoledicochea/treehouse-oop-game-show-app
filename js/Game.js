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

            // select all lis with src liveheart
            // then choose last li of that section
            // change src to lostHeart.png
        
        * checkForWin()
            * checks to see if the player guessed all of the letters in the active phrase
            * 
            *         // let win = false
            // const hiddenLetters = document.querySelectorAll('#hide')
            // for(let i = 0; i < hiddenLetters.length; i++) {
            //     if (this.activePhrase.includes(letter.innerText)) {
            //         win = false
            //         break
            //     } else {
            //         win = true
            //     }
            // }
            // return win
            // return true

        // if no more keys contain any of the letters in phrase, then it's a win
        * gameOver()
            * displays original start screen overlay
            * depending on outcome of game replaces h1 'start' class with:
            * if win: 'win'
            * if lose: 'lose'
 */

class Game {
    constructor(missed, phrases, activePhrase) {
        this.missed = 0
        this.phrases = [
            new Phrase('let it flow'),
            new Phrase('paint the town red'),
            new Phrase('motion sickness'),
            new Phrase('blood in the wine'),
            new Phrase('running with wolves'),
            new Phrase('the boy who cried wolf'),
            new Phrase('once upon a dream'),
            new Phrase('all the things she said')
        ]
        this.activePhrase = null
    }

    startGame() {
        const overlay = document.querySelector('#overlay')
        overlay.style.display = 'none'
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
    }

    getRandomPhrase(){
        return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    }

    handleInteraction(e) {
        e.target.disabled = true
        // }
        if(!this.activePhrase.checkLetter(e)) {
            if(e.target.tagName === 'BUTTON') {
                e.target.classList.add('wrong')
            } else {
                const keys = document.querySelectorAll(`.key`)
                keys.forEach(key => {
                    if (key.innerText === e.key.toLowerCase()) {
                        key.classList.add('wrong')
                    }
                }) 
            }
            this.removeLife()
        } else {
            if(e.target.tagName === 'BUTTON') {
                e.target.classList.add('chosen')
            } else {
                const keys = document.querySelectorAll(`.key`)
                keys.forEach(key => {
                    if (key.innerText === e.key.toLowerCase()) {
                        key.classList.add('chosen')
                    }
                }) 
            }
            this.activePhrase.showMatchedLetter(e)
            if(this.checkForWin()) {
                this.gameOver()
            }
        }
    }

    removeLife() {
        const hearts = document.querySelectorAll('img')
        const lastHeart = hearts[4 - this.missed]
        if(lastHeart) {
            lastHeart.src = './images/lostHeart.png'
            lastHeart.alt = 'Lost Heart Icon'
        }
        this.missed++
        if (this.missed === 5) {
            this.gameOver()
        }
    }

    checkForWin() {
        let win = true
        const keys = document.querySelectorAll('.key')
        keys.forEach(key => {
            if (!key.classList.contains('wrong') && !key.classList.contains('chosen')) {
                if (this.activePhrase.phrase.includes(key.innerText)) {
                    win = false
                    return win
                }
            }
        })
        return win
    }

    gameOver() {
        const overlay = document.querySelector('#overlay')
        overlay.style.display = 'flex'
        overlay.classList.remove('start')
        const gameOverMessage = document.querySelector('#game-over-message')
        if (this.checkForWin()) {
            gameOverMessage.innerText = 'You Won!'
            overlay.classList.add('win')
            overlay.classList.remove('lose')
        } else {
            gameOverMessage.innerText = 'You Lose. Better luck next time!'
            overlay.classList.add('lose')
            overlay.classList.remove('win')
        }
        const keys = document.querySelectorAll('.key')
        
        keys.forEach(key => {
            key.classList.remove('chosen')
            key.classList.remove('wrong')
            key.disabled = false
        })
        const phraseList = document.querySelector('#phrase ul')
        while(phraseList.hasElementChildNodes) {
            phraseList.firstElementChild.remove()
        }
        const hearts = document.querySelectorAll('img')
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png'
            heart.alt = 'Heart Icon'
        })
        document.removeEventListener('keydown', (e) => {
            e.preventDefault()
        })
    }

}


// game.startGame()