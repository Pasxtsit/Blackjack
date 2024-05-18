import './style.css'
import './deckAPI.js'
import { createNewDeck } from './deckAPI.js'
import { drawCards } from './deckAPI.js'

document.querySelector('#app').innerHTML = `
<div class="deckDiv">
<img class = "cardBack" src="./cardback.png"></img>
<div class="restOfDeck"><p>Remaining Cards</p><span id="remainingCards"></span></div>
</div>
<div>
<div class="card">
<div id="cardsArea"></div>
<div class="lowControls"> 
<div class="handValue"><p>Hand Value</p><span id="handValue">0</span></div>
<button id="drawCard" type="button"></button>
<button id="Replay" type="button"></button>
</div>
</div>
</div>
`


createNewDeck(document.querySelector('#Replay'))
drawCards(document.querySelector('#drawCard'))









