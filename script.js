/* script.js */

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard(card) {
    card.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
    } else {
        hasFlippedCard = false;
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.innerText === secondCard.innerText) {
        alert('¡Has encontrado una pareja!');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }
}
