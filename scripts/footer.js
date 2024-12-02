function togglePopupAyuda() {
    const popup = document.getElementById('help-popup');
    popup.classList.toggle('hidden');
}

function closeRespuestaPopup() {
    document.getElementById('help-answer').classList.add('hidden');
}

function handleFormSubmit(event) {
    event.preventDefault(); // Evita la recarga de la página
    document.getElementById('help-popup').classList.add('hidden'); // Cierra el popup de ayuda
    document.getElementById('help-answer').classList.remove('hidden'); // Muestra el popup de confirmación
}