/* app.js to create a new instance of the Game class and add event listeners for the start button and onscreen keyboard buttons */

/* app.js
    * add click event to 'start game' button
        * creates new Game object 
        * starts game by calling startGame()
    * add click event listener to each onscreen keyboard button
        * calls handleInteraction() on Game object
        * 
        * 
    * reset gameboard between games
        * remove all li elements from the Phrase ul element
        * enable all keyboard buttons
        * update each key CSS class / remove 'chosen' 'wrong'
        * reset heartimages => change back to liveHeart.png
 */

let game

const startButton = document.querySelector('#btn__reset')

startButton.addEventListener('click', (e) => {
    game = new Game()
    game.startGame()
})

const keys = document.querySelector('#qwerty')

keys.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        game.handleInteraction(e)
    }
})

addEventListener('keydown', (e) => {
    const keys = document.querySelectorAll('.key')
    const overlay = document.querySelector('#overlay')
    if(game && overlay.style.display !== 'flex') {
        keys.forEach(key => {
            if (!key.classList.contains('wrong') && key.innerText === e.key.toLowerCase()) {
                game.handleInteraction(e)
            }
        })
    }
})