
document.addEventListener('DOMContentLoaded', () => {
    const gameButtons = document.querySelectorAll('.game_btn');
    const closeGameButton = document.querySelector('.close-game_btn');
    const gameContainer = document.querySelector('.game_container');
    const gameButtonsContainer = document.querySelector('.game_buttons');
    const games = document.querySelectorAll('.game');

    // Mostrar el juego seleccionado
    function showGame(gameNumber) {
        // Ocultar todos los juegos
        games.forEach(game => game.classList.remove('show'));

        // Mostrar el juego seleccionado
        const selectedGame = document.getElementById(`game${gameNumber}`);
        if (selectedGame) {
            selectedGame.classList.add('show');
        }

        // Mostrar el contenedor del juego y el botón de cerrar
        gameContainer.style.display = 'flex';
        closeGameButton.style.display = 'flex';

        // Ajustar el diseño de los botones
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
        // Ocultar todos los juegos
        games.forEach(game => game.classList.remove('show'));

        // Ocultar el contenedor del juego y el botón de cerrar
        gameContainer.style.display = 'none';
        closeGameButton.style.display = 'none';

        // Restablecer el diseño de los botones
        gameButtonsContainer.classList.remove('open');

        resetGameState();
    }

    // Restablecer el estado del juego
    function resetGameState() {
        games.forEach(game => {
            const placedAccessories = game.querySelectorAll('.placed-accessory');
            placedAccessories.forEach(accessory => {
                accessory.remove(); // Eliminar los accesorios colocados
            });
        });
    }

    // Cerrar el juego
    closeGameButton.addEventListener('click', closeGame);
});
