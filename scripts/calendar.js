
document.addEventListener('DOMContentLoaded', () => {

    const calendarDays = document.querySelectorAll('.calendar-day');

    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            // Verificar si el día ya está abierto
            if (day.classList.contains('opened')) {
                return; // Si ya está abierto, no hacer nada
            }

            // Marcar el día como abierto
            day.classList.add('opened');

            // Mostrar contenido dentro del día
            const dayContent = document.createElement('div');
            dayContent.className = 'day-content';
            dayContent.textContent = `Contenido del día ${day.dataset.day}`;
            day.appendChild(dayContent);
        });
    });
});
