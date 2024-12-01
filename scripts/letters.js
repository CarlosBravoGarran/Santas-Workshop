document.addEventListener('DOMContentLoaded', () => {
    const enviarCartaButton = document.querySelector('.formulario_submit');

    const enviarCarta = (event) => {
        event.preventDefault();
        
        // Verificar si el usuario está logueado
        if (window.isUserLoggedIn()) {
            // Mostrar el popup de éxito
            document.getElementById("popup-carta-exito").classList.remove("hidden");
        } else {
            // Mostrar el popup de registro
            document.getElementById("popup-carta-registro").classList.remove("hidden");
        }
    };

    // Añadir el evento de clic al botón de enviar carta
    enviarCartaButton?.addEventListener('click', enviarCarta);

    // Cerrar los popups cuando el usuario haga clic en el botón de cierre
    document.querySelectorAll('.close-carta-popup').forEach(button => {
        button.addEventListener('click', (event) => {
            // Encontrar el popup padre y agregar la clase 'hidden' para cerrarlo
            const popup = event.target.closest('.popup-carta');
            if (popup) {
                popup.classList.add('hidden');
            }
        });
    });
});