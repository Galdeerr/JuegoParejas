let hasFlippedCard = false;
let lockBoard = true; // Cambiado a true inicialmente para evitar jugar antes de hacer clic en el botón
let firstCard, secondCard;
let cards = document.querySelectorAll('.card');
let score = 0;
let startTime; // Variable para almacenar la hora de inicio

function startGame() {
    lockBoard = false; // Permitir jugar al hacer clic en el botón de inicio
    shuffleAndDisplayCards();
    startTime = new Date(); // Almacena la hora de inicio
}

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
        return;
    }

    secondCard = card;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
    score++;
    updateScore();

    // Revisa si todas las parejas han sido encontradas
    if (score === cards.length / 2) {
        const endTime = new Date(); // Obtén la hora de finalización del juego
        const timeDifference = (endTime - startTime) / 1000; // Diferencia de tiempo en segundos

        // Crea un contenido HTML y CSS para la ventana emergente
        const popupContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            padding: 20px;
                            text-align: center;
                        }

                        h2 {
                            color: #3498db;
                        }

                        p {
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <h2>Felicidades, has encontrado todas las parejas!</h2>
                    <p>Puntos: ${score}</p>
                    <p>Tiempo: ${timeDifference} segundos</p>
                </body>
            </html>
        `;

        // Abre la ventana emergente con el contenido y un tamaño personalizado
        const popupWindow = window.open('', 'popup', 'width=400,height=200');
        popupWindow.document.write(popupContent);
    } else {
        alert('¡Has encontrado una pareja! Puntos: ' + score);
    }

    disableCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Puntos: ' + score;
}

function resetGame() {
    lockBoard = true; // Bloquea el tablero al reiniciar
    score = 0; // Reinicia la puntuación
    updateScore(); // Actualiza la visualización de la puntuación
    resetBoard(); // Resetea el tablero

    // Quita la clase 'flipped' de todas las cartas
    cards.forEach(card => card.classList.remove('flipped'));

    shuffleAndDisplayCards(); // Mezcla y muestra las cartas
}

function shuffleAndDisplayCards() {
    const gameBoard = document.getElementById('game-board');

    // Obtén todas las cartas y conviértelas en un array
    const cardsArray = Array.from(cards);

    // Mezcla las cartas
    cardsArray.sort(() => Math.random() - 0.5);

    // Elimina las cartas actuales del tablero
    gameBoard.innerHTML = '';

    // Agrega las cartas al tablero en el nuevo orden
    cardsArray.forEach(card => {
        gameBoard.appendChild(card);
    });
}
