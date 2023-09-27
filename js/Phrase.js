// create the Phrase class
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase()
    }

    addPhraseToDisplay() {
        const phraseList = document.querySelector('#phrase ul')
        const splitPhrase = this.phrase.split('')
        let html = ''
        splitPhrase.forEach(item => {
            // if item is a space 
            if (item === ' ') {
                // add li with the 'space' class to html
                html += '<li class="space"> </li>'
            // if item is a letter 
            } else {
                // add the item to the template literal and add to html string
                html += `<li class="hide letter ${item}">${item}</li>`
            }
        })
        // set ul innerHTML to html string
        phraseList.innerHTML = html
    }

    checkLetter(e) {
        // if the onscreen keyboard button was used
        if(e.target.tagName === 'BUTTON') {
            // check that the phrase includes the button text
            return this.phrase.includes((e.target.innerText))
        // if a physical keyboard was used
        } else {
            // check that the phrase includes the typed key value (case insensitive)
            return this.phrase.includes((e.key.toLowerCase()))
        }
    }

    showMatchedLetter(e) {
        // initialize guessedLetter
        let guessedLetter
        if(e.target.tagName === 'BUTTON') {
            // select all hidden phrase letters with the same class as the button innerText
            guessedLetter = document.querySelectorAll(`.${e.target.innerText}`) 
            guessedLetter.forEach(guess => {
                // show the matched letter(s)
                guess.classList.remove('hide')
                guess.classList.add('show')
            })
        } else {
            // select all hidden phrase letters with the same class as e.key (case insensitive)
            guessedLetter = document.querySelectorAll(`.${e.key.toLowerCase()}`) 
            guessedLetter.forEach(guess => {
                // show the matched letter(s)
                guess.classList.remove('hide')
                guess.classList.add('show')
            })
        }
    }
}