let deckId;
let remainingCards;
let cardSprite;
let handValue = [];

export function getDeckId(element) {
    element.textContent = `Deck Status`;
    element.addEventListener('click', () => {
        console.log(deckId);
        console.log(remainingCards);
        return deckId;
    });
}


export function createNewDeck(element) {
    element.textContent = `Replay`;
        element.addEventListener('click', () => {
        createNewDeckInternal();
    });
    createNewDeckInternal();
}

function createNewDeckInternal() {
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
        let remainingCardSpan = document.querySelector("#remainingCards");
        remainingCardSpan.textContent = remainingCards;
        clearValue();
        return data.deck_id;
    })
    .catch(error => {
        console.error(error);
        return null;
    });
}


export function clearValue(){
    
        let handValueSpan = document.querySelector("#handValue");
        const cards = document.querySelectorAll(".cardClass");
        cards.forEach( cards => {
            cards.remove();})
            handValue = [0];
            handValueSpan.textContent = handValue.toString();
        
    };
    
    
    export function drawCards(element) {
        element.textContent = `Draw a Card`;
        
        element.addEventListener('click', () => {
            if (!deckId) {
                console.error("Deck ID is not provided. Please call createNewDeck() first.");
                return;
            }
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not fetch the response");
                }
                return response.json();
            })
            .then(data => {
                console.log("Drawn cards:", data.cards);
                remainingCards = data.remaining;
                let remainingCardSpan = document.querySelector("#remainingCards");
                remainingCardSpan.textContent = remainingCards;
                cardSprite = data.cards[0].image;
                let cardImg = document.createElement("img");
                cardImg.setAttribute("src", cardSprite);
                cardImg.classList.add("cardClass");
                let cardsAreaDiv = document.getElementById("cardsArea");
                cardsAreaDiv.appendChild(cardImg);
                let handValueSpan = document.querySelector("#handValue");
                let cardValue = data.cards[0].value;
                if (cardValue === "KING" || cardValue === "QUEEN" || cardValue === "JACK") {
                    cardValue = 10;
                } else if (cardValue === "ACE") {
                    cardValue = 11;
                } else {
                    cardValue = parseInt(cardValue);
                }
                handValue.push(cardValue);
                let aces = handValue.filter(value => value === 11); // filter aces in hand array
                if (handValue.length === 2 && aces.length === 2) {
                    handValue = [21]; // double aces make the hand value to 21
                } else {
                    while (handValue.reduce((sum, value) => sum + value, 0) > 21 && aces.length > 0) {
                        handValue[handValue.indexOf(11)] = 1; 
                        aces.pop(); // Change the value of an Ace from 11 to 1 if an ace is found in hand array
                    }
                }
                handValueSpan.textContent = handValue.reduce((sum, value) => sum + value, 0).toString();
            })
            .catch(error => {
                console.error(error);
            });
        });
    }
    
    
    
    
    
    