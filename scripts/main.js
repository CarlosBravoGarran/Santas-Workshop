
document.addEventListener('mousemove', (e) => {
    // Crea un nuevo elemento para el rastro
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');

    // Posiciona el rastro en las coordenadas del cursor
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;

    // Añade el rastro al documento
    document.body.appendChild(trail);

    // Elimina el rastro después de 1 segundo (coincide con la duración de la animación)
    setTimeout(() => {
        trail.remove();
    }, 1000);
});
