document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los días del calendario
    const calendarDays = document.querySelectorAll('.calendar-day');

    // Agregar eventos de clic a cada día del calendario
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            // Verificar si el día ya está abierto
            if (day.classList.contains('opened')) {
                return; // Si ya está abierto, no hacer nada
            }

            // Agregar clase 'opened' para marcar el día como abierto
            day.classList.add('opened');

            // Mostrar contenido dentro del día
            const dayContent = document.createElement('div');
            dayContent.className = 'day-content';
            dayContent.textContent = `Contenido del día ${day.dataset.day}`; // Aquí puedes añadir lo que quieras
            day.appendChild(dayContent);
        });
    });
});
