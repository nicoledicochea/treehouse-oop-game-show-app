/* Phrase.js to define a Phrase class to handle the creation of phrases */

/* Phrase Class
    * constructor
        * parameter: phrase (converted to lowercase)
    * methods
        * addPhraseToDisplay() 
            * adds letter placeholders to the display when the game starts. each li is a letter
                * 'letter' CSS class for letters
                * 'space' CSS class for spaces
        * checkLetter()
            * checks if letter guessed matches letter in phrase
        * showMatchedLetter() 
            * reveals the letter(s) that match the player's guess
            * select all of the letter DOM elements with matching CSS class name
                * ex. document.querySelector('#l') for when 'l' is guessed
            * replace 'hide' class with 'show' class
 */