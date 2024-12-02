document.addEventListener('DOMContentLoaded', () => {
    const enviarCartaButton = document.querySelector('.formulario_submit');

    const enviarCarta = (event) => {
        event.preventDefault();
        
        // Verificar si el usuario ha iniciado sesión
        if (window.isUserLoggedIn()) {
            showNotification('Tu carta ha sido enviada con éxito. En breve recibirás una respuesta.', 'success');
        } else {
            showNotification('Debes iniciar sesión para enviar una carta.', 'warning');
        }

        // Limpiar formulario
        document.querySelector('.formulario').reset();
    };

    // Enviar carta
    enviarCartaButton?.addEventListener('submit', enviarCarta);
});