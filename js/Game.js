// create the Game class
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
        // hide start screen overlay
        overlay.style.display = 'none'
        // set activePhrase property using getRandomPhrase()
        this.activePhrase = this.getRandomPhrase()
        // call addPhraseToDisplay() on activePhrase
        this.activePhrase.addPhraseToDisplay()
    }
    
    getRandomPhrase(){
        // randomly return a phrase from the phrases array
        return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    }

    handleInteraction(e) {
        const keys = document.querySelectorAll('.key')
        // disable the onscreen keyboard guess button once selected
        // prevents user from selecting an already incorrect button
        e.target.disabled = true
        // if the phrase does NOT include the guessed letter
        if(!this.activePhrase.checkLetter(e)) {
            // if the onscreen keyboard button was used
            if(e.target.tagName === 'BUTTON') {
                // add 'wrong' class to onscreen keyboard button
                e.target.classList.add('wrong')
            // if a physical keyboard was used
            } else {
                keys.forEach(key => {
                    // search for the onscreen key with the same inner text as the physical key
                    if (key.innerText === e.key.toLowerCase()) {
                        // add 'wrong' class to onscreen keyboard button
                        key.classList.add('wrong')
                    }
                }) 
            }
            this.removeLife()
        // if the phrase DOES include the guessed letter
        } else {
            // if the onscreen keyboard button was used
            if(e.target.tagName === 'BUTTON') {
                // add 'chosen' class to onscreen keyboard button
                e.target.classList.add('chosen')
            // if a physical keyboard was used
            } else {
                keys.forEach(key => {
                    // search for the onscreen key with the same inner text as the physical key
                    if (key.innerText === e.key.toLowerCase()) {
                        // add 'chosen' class to onscreen keyboard button
                        key.classList.add('chosen')
                    }
                }) 
            }
            // call showMatchedLetter() on activePhrase
            this.activePhrase.showMatchedLetter(e)
            // if checkForWin() is true call gameOver()
            if(this.checkForWin()) {
                this.gameOver()
            }
        }
    }

    removeLife() {
        // select all heart images
        const hearts = document.querySelectorAll('img')
        // select the last heart [4 - this.missed]
            // (ex. 4 - 0 misses) = hearts[4] selects 5th heart
        const lastHeart = hearts[4 - this.missed]
        // replace img src and alt
        lastHeart.src = './images/lostHeart.png'
        lastHeart.alt = 'Lost Heart Icon'
        // increment missed property
        this.missed++
        // if there are 5 misses call gameOver()
        if (this.missed === 5) {
            this.gameOver()
        }
    }

    checkForWin() {
        // initialize win as true
        let win = true
        const keys = document.querySelectorAll('.key')
        keys.forEach(key => {
            // if any key that has not been guessed (no 'wrong' or 'chosen' class)
            if (!key.classList.contains('wrong') && !key.classList.contains('chosen') 
                // and if the activePhrase includes text from a remaining key
                && this.activePhrase.phrase.includes(key.innerText)) {
                    // then the player has not won
                    win = false
            }
        })
        // return win as a boolean
        return win
    }

    gameOver() {
        const overlay = document.querySelector('#overlay')
        const gameOverMessage = document.querySelector('#game-over-message')
        const keys = document.querySelectorAll('.key')
        const phraseList = document.querySelector('#phrase ul')
        const hearts = document.querySelectorAll('img')

        // display original start screen overlay
        overlay.style.display = 'flex'
        // change the overlay and game over message depending on the outcome of the game ('win' or 'lose')
        overlay.classList.remove('start')
        if (this.checkForWin()) {
            gameOverMessage.innerText = 'You Won!'
            overlay.classList.add('win')
            overlay.classList.remove('lose')
        } else {
            gameOverMessage.innerText = 'You Lose. Better luck next time!'
            overlay.classList.add('lose')
            overlay.classList.remove('win')
        }
        
        // enable each onscreen key button and remove 'chosen' or 'wrong' class
        keys.forEach(key => {
            key.classList.remove('chosen')
            key.classList.remove('wrong')
            key.disabled = false
        })
        
        // remove all li elements from the Phrase parent ul element
        while(phraseList.hasElementChildNodes) {
            phraseList.firstElementChild.remove()
        }

        // reset heartimages => change back to liveHeart.png
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png'
            heart.alt = 'Heart Icon'
        })
    }

}