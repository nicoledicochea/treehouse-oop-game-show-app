// initialize game variable
let game

const startButton = document.querySelector('#btn__reset')
const keys = document.querySelector('#qwerty')

// add click event to 'start game' button
startButton.addEventListener('click', (e) => {
    // create new Game object 
    game = new Game()
    game.startGame()
})

// add click event to each onscreen keyboard button
keys.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        game.handleInteraction(e)
    }
})

// add keydown event to each physical keyboard button
document.addEventListener('keydown', (e) => {
    const keys = document.querySelectorAll('.key')
    const overlay = document.querySelector('#overlay')
    // only accept keydown interaction 
        // if the game has been inialized to a new object 
        // if the overlay is not present
    if(game && overlay.style.display !== 'flex') {
        keys.forEach(key => {
            // only call handleinteraction()
                // if the onscreen key does not contain 'wrong' class
                // if the onscreen key text matches the physical key (case insensitive)
            if (!key.classList.contains('wrong') && key.innerText === e.key.toLowerCase()) {
                game.handleInteraction(e)
            }
        })
    }
})