/* Phrase.js to define a Phrase class to handle the creation of phrases */

/* Phrase Class
    * constructor
        * parameter: phrase (converted to lowercase)
    * methods
        * addPhraseToDisplay() 
            * adds letter placeholders to the display when the game starts. each li is a letter
                * 'letter' CSS class for letters
                * 'space' CSS class for spaces

        // select #phrase ul
        // split phrase into individual letters
        // add li to html = ''
        // loop through splitPhrase array
        // if statement
            // if = ' ' space then set to
                // <li class="space"> </li>
            // else
                //`<li class="hide letter ${y}">${y}</li>`
        // set ul innerHTML to lis


        * checkLetter()
            * checks if letter guessed matches letter in phrase
        * showMatchedLetter() 
            * reveals the letter(s) that match the player's guess
            * select all of the letter DOM elements with matching CSS class name
                * ex. document.querySelector('#l') for when 'l' is guessed
            * replace 'hide' class with 'show' class
 */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase()
    }

    addPhraseToDisplay() {
        const phraseList = document.querySelector('#phrase ul')
        const splitPhrase = this.phrase.split('')
        let html = ''
        splitPhrase.forEach(item => {
            if (item === ' ') {
                html += '<li class="space"> </li>'
            } else {
                html += `<li class="hide letter ${item}">${item}</li>`
            }
        })
        phraseList.innerHTML = html
    }

    checkLetter(e) {
        return this.phrase.includes((e.target.innerText)) || this.phrase.includes((e.key))
    }

    showMatchedLetter(e) {
        let guessedLetter
        if(e.target.tagName === 'BUTTON') {
            guessedLetter = document.querySelectorAll(`.${e.target.innerText}`) 
            guessedLetter.forEach(guess => {
                guess.classList.remove('hide')
                guess.classList.add('show')
            })
        } else {
            guessedLetter = document.querySelectorAll(`.${e.key}`) 
            guessedLetter.forEach(guess => {
                guess.classList.remove('hide')
                guess.classList.add('show')
            })
        }
    }
}

// const phrase = new Phrase('testi ng')