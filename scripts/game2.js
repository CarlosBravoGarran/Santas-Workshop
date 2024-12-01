
document.addEventListener('DOMContentLoaded', () => {
    const words = ["Árbol de Navidad", "Reno", "Nieve", "Regalo", "Bastón de caramelo", "Estrella", "Papá Noel", "Trineo", "Campanas", "Villancicos"];
    const canvas = document.querySelector('.game2_canvas');
    const ctx = canvas.getContext('2d');
    const wordDisplay = document.querySelector('.random-word');
    const timerDisplay = document.querySelector('.timer_display');
    const gameButton = document.querySelector('.game2_start');
    const colorButtons = document.querySelectorAll('.color-btn');

    let drawing = false;
    let wordToDraw = '';
    let timer;
    let timeLeft = 60;
    let selectedColor = '#000000'; // Color por defecto negro

    // Configuración inicial del lienzo
    canvas.width = 400;
    canvas.height = 400;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = selectedColor;

    // Generar una palabra aleatoria
    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    // Iniciar o reiniciar el juego
    function startGame() {
        // Si ya hay un temporizador corriendo, limpiarlo
        if (timer) {
            clearInterval(timer);
        }

        // Restablecer canvas, palabra y temporizador
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        drawing = false; // Detener cualquier dibujo
        timeLeft = 60; // Reiniciar el contador
        timerDisplay.textContent = timeLeft;

        // Generar una nueva palabra
        wordToDraw = getRandomWord();
        wordDisplay.textContent = wordToDraw;

        // Volver a habilitar dibujo en el canvas
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        // Reiniciar el temporizador
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer); // Detener el temporizador
                endGame(); // Finalizar el juego
            }
        }, 1000);
    }

    // Comienza a dibujar con el ratón
    function startDrawing(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    // Dibuja sobre el canvas con el ratón
    function draw(e) {
        if (!drawing) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    // Detiene el dibujo
    function stopDrawing() {
        drawing = false;
    }

    // Finaliza el juego
    function endGame() {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseleave', stopDrawing);
        alert(`¡Tiempo agotado! La palabra era: ${wordToDraw}`);
    }

    // Seleccionar color de la paleta
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedColor = button.style.backgroundColor; // Obtener el color seleccionado
            ctx.strokeStyle = selectedColor; // Cambiar el color del trazo
        });
    });

    // Iniciar el juego cuando el usuario haga clic en el botón
    gameButton.addEventListener('click', startGame);
});
