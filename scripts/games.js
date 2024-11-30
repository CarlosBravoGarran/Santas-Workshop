document.addEventListener('DOMContentLoaded', () => {
    const gameButtons = document.querySelectorAll('.game_btn');
    const closeGameButton = document.querySelector('.close-game_btn');
    const gameContainer = document.querySelector('.game_container');
    const gameButtonsContainer = document.querySelector('.game_buttons');

    // Mostrar el juego seleccionado
    function showGame(gameNumber) {
        gameContainer.style.display = 'flex';
        gameContainer.innerHTML = `<h2>Juego ${gameNumber}</h2>`;
        closeGameButton.style.display = 'flex';
        gameButtonsContainer.classList.add('open');
    }

    // Botones de juego
    gameButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const gameNumber = index + 1; // Obtener el número del juego
            showGame(gameNumber);
        });
    });

    // Función para cerrar el juego
    function closeGame() {
        gameContainer.style.display = 'none';
        gameContainer.innerHTML = ''; 
        closeGameButton.style.display = 'none'; 
        gameButtonsContainer.classList.remove('open');
    }

    // Cerrar el juego
    closeGameButton.addEventListener('click', closeGame);
});
