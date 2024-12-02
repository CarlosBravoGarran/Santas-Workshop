function togglePopupAyuda() {
    const popup = document.getElementById('help-popup');
    popup.classList.toggle('hidden');
}

function closeRespuestaPopup() {
    document.getElementById('help-answer').classList.add('hidden');
}

function handleFormSubmit(event) {
    event.preventDefault(); 
    document.getElementById('help-popup').classList.add('hidden'); 
    document.getElementById('help-answer').classList.remove('hidden');
}