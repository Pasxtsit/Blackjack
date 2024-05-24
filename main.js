import './style.css'
import './deckAPI.js'
import { createNewDeck } from './deckAPI.js'
import { playerDraw } from './deckAPI.js'
import  { passTurn } from './deckAPI.js'

document.querySelector('#app').innerHTML = `
<div class="deckDiv">
    <img class = "cardBack" src="./cardback.png">
    <div class="restOfDeck"><p>Remaining Cards</p><span id="remainingCards"></span></div>
</div>

<div class="card">

<div class="playArea">

<div id="playerControls">
    <div data-name="cardsArea"></div>
    <div><p>Hand Value</p><span class="handValue">0</span></div>
</div>

    <div id="botControls">
        <div class="cardForPc">
            <div data-name="cardsArea"></div>
            <div><p>Hand Value</p><span class="handValue">0</span></div>
        </div>
    </div>

</div>

    <div class="lowControls"> 
            <button id="drawCard" type="button"></button>
            <button id="stop" type="button"></button>
            <button id="Replay" type="button"></button>
        </div>


</div>

`


createNewDeck(document.querySelector('#Replay'));
playerDraw(document.querySelector('#drawCard'));
passTurn(document.querySelector('#stop'))








