
document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector('.game3_stage');
    const livesContainer = document.querySelector('.game3_lives');
    const timerDisplay = document.querySelector('.game3_timer-display');
    const startButton = document.querySelector('.game3_start-btn');
    const maxTime = 60;
    let lives = 3;
    let timeLeft = maxTime;
    let gameInterval;

    // Crear un Grinch en una posición inicial
    function spawnGrinch() {
        const grinch = document.createElement('div');
        grinch.classList.add('grinch');
        const directions = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
        const spawnDirection = directions[Math.floor(Math.random() * directions.length)];

        // Calcular las dimensiones del escenario
        const stageWidth = stage.offsetWidth;
        const stageHeight = stage.offsetHeight;

        // Configurar posición inicial del Grinch
        let startX, startY;

        switch (spawnDirection) {
            case 'top':
                startX = Math.random() * stageWidth;
                startY = 0;
                break;
            case 'bottom':
                startX = Math.random() * stageWidth;
                startY = stageHeight;
                break;
            case 'left':
                startX = 0;
                startY = Math.random() * stageHeight;
                break;
            case 'right':
                startX = stageWidth;
                startY = Math.random() * stageHeight;
                break;
            case 'top-left':
                startX = 0;
                startY = 0;
                break;
            case 'top-right':
                startX = stageWidth;
                startY = 0;
                break;
            case 'bottom-left':
                startX = 0;
                startY = stageHeight;
                break;
            case 'bottom-right':
                startX = stageWidth;
                startY = stageHeight;
                break;
        }

        // Posicionar al Grinch
        grinch.style.left = `${startX}px`;
        grinch.style.top = `${startY}px`;

        // Agregar el Grinch al escenario
        stage.appendChild(grinch);

        // Calcular el destino (centro del regalo)
        const targetX = stageWidth / 2 - grinch.offsetWidth / 2;
        const targetY = stageHeight / 2 - grinch.offsetHeight / 2;

        // Mover el Grinch hacia el regalo
        const moveInterval = setInterval(() => {
            const currentX = parseFloat(grinch.style.left);
            const currentY = parseFloat(grinch.style.top);

            const dx = (targetX - currentX) * 0.05;
            const dy = (targetY - currentY) * 0.05;

            grinch.style.left = `${currentX + dx}px`;
            grinch.style.top = `${currentY + dy}px`;

            // Si el Grinch llega al regalo
            if (Math.abs(currentX - targetX) < 10 && Math.abs(currentY - targetY) < 10) {
                clearInterval(moveInterval);
                grinch.remove();
                loseLife();
            }
        }, 20);

        // Eliminar al Grinch al hacer clic
        grinch.addEventListener('click', () => {
            clearInterval(moveInterval);
            grinch.remove();
        });
    }

    // Perder una vida
    function loseLife() {
        if (lives > 0) {
            lives--;
            livesContainer.removeChild(livesContainer.lastElementChild);
        }
        if (lives === 0) {
            endGame(false);
        }
    }

    // Finalizar el juego
    function endGame(won) {
        clearInterval(gameInterval);

        document.querySelectorAll('.grinch').forEach(grinch => grinch.remove());

        if (won) {
            alert('¡Ganaste! Protegiste el regalo.');
        } else {
            alert('¡Perdiste! El regalo fue robado.');
        }
        startButton.disabled = false;
    }

    // Iniciar el juego
    function startGame() {
        timeLeft = maxTime;
        lives = 3;
        livesContainer.innerHTML = '<span class="game3_life">🎁</span><span class="game3_life">🎁</span><span class="game3_life">🎁</span>';
        timerDisplay.textContent = timeLeft;

        startButton.disabled = true; // Desactivar el botón de empezar mientras el juego en curso


        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                endGame(true);
            } else {
                spawnGrinch();
            }
        }, 2000);
    }

    startButton.addEventListener('click', startGame);
});
