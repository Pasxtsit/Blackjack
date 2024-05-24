let deckId;
let remainingCards;
let handValue = [];
let botHand = [];

export function getDeckId(element) {
    element.textContent = `Deck Status`;
    element.addEventListener('click', () => {
        console.log(deckId);
        console.log(remainingCards);
        return deckId;
    });
}


export function createNewDeck(element) {
    function setRemainingCards() {
        let remainingCardSpan = document.querySelector("#remainingCards");
        remainingCardSpan.textContent = remainingCards;
        clearValue();
    }

    element.textContent = `Replay`;
    element.addEventListener('click', () => {
        shuffleNewDeck().then(setRemainingCards);
    });
    shuffleNewDeck().then(setRemainingCards);
}


function shuffleNewDeck() {
    return fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch the response");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            deckId = data.deck_id;
            remainingCards = data.remaining;
            return data.deck_id;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

export function clearValue() {

    let handValueSpan = document.querySelectorAll(".handValue");
    const cards = document.querySelectorAll(".cardClass");
    cards.forEach(card => {
        card.remove();
    })
    handValue = [];
    handValueSpan.forEach(span=>span.textContent = 0);

};

export function updateUI(draw, totalHandValue, playAreaSelector) {
    const elem =  document.querySelector(playAreaSelector);
    remainingCards = draw.remaining;

    let cardSprite = draw.cards[0].image;
    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", cardSprite);
    cardImg.classList.add("cardClass");
    let remainingCardSpan = document.querySelector("#remainingCards");

    remainingCardSpan.textContent = remainingCards;
    const cardAreaElem = elem.querySelector('[data-name="cardsArea"]');
    cardAreaElem.appendChild(cardImg);
    let handValueSpan = elem.querySelector(".handValue");
    handValueSpan.textContent = totalHandValue.toString();

}

function getHandValue(draw, hand) {
    let cardValue = draw.cards[0].value;
    if (cardValue === "KING" || cardValue === "QUEEN" || cardValue === "JACK") {
        cardValue = 10;
    } else if (cardValue === "ACE") {
        cardValue = 11;
    } else {
        cardValue = parseInt(cardValue);
    }
    hand.push(cardValue);
    let aces = hand.filter(value => value === 11); // filter aces in hand array
    if (hand.length === 2 && aces.length === 2) {
        hand = [21]; // double aces make the hand value to 21
    } else {
        while (hand.reduce((sum, value) => sum + value, 0) > 21 && aces.length > 0) {
            hand[handValue.indexOf(11)] = 1;
            aces.pop(); // Change the value of an Ace from 11 to 1 if an ace is found in hand array
        }
    }
    let totalHandValue = hand.reduce((sum, value) => sum + value, 0);
    return totalHandValue;
}

export function drawCard(numOfCards) {
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numOfCards}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch the response");
            }
            return response.json();
        }).then(data => {
            console.log("Drawn cards:", data.cards);
            return data;
        });
}

export function playerDraw(element) {
    element.textContent = `Draw a Card`;

    element.addEventListener('click', () => {
        if (!deckId) {
            console.error("Deck ID is not provided. Please call createNewDeck() first.");
            return;
        }
        drawCard(1).then(draw => {
            const totalHandValue = getHandValue(draw, handValue);
            updateUI(draw, totalHandValue, '#playerControls');
            if(totalHandValue>21){
                alert(`Burned!`)
            }
        })
        .catch(error => {
                console.error(error);
        });
    });
}


export function passTurn(element){
    element.textContent = `Pass Turn`;
    element.addEventListener('click', () => {
        let playerScore = document.querySelector('#playerControls .handValue');
        let playerTotalHandScore = playerScore.textContent;
        botDrawCard(playerTotalHandScore); 
    });
};


async function botDrawCard(playerTotal)
{
    let botHandValue =0;
    botHand=[];

    do{
        let draw = await drawCard(1);
        
        botHandValue = getHandValue(draw,botHand);
        updateUI(draw, botHandValue, '#botControls');
        

    }       while(botHandValue<playerTotal && botHandValue<21);
    if (botHandValue > 21)
        {
            alert(`Bot is burned`)
        }
    else if (botHandValue >= playerTotal)
        {
            alert(`Bot Wins`)
        }
    else{
        alert(`Player Wins`)
    }
}; //end of pcdraw fun