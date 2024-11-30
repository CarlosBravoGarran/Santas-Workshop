document.addEventListener('DOMContentLoaded', () => {
    const calendarTabs = document.querySelectorAll('.calendar-tab');
    const calendarDays = document.querySelectorAll('.calendar-day');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupClose = document.querySelector('.popup-close');
    const popupText = document.querySelector('.popup-text');

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;

    // Notas para cada día
    const notes = [
        "Hoy es un gran día para sonreír.",
        "¡La magia de la Navidad está en tu corazón!",
        "Recuerda ser amable con todos.",
        "Ayudar a los demás es un regalo especial.",
        "Cada día cuenta para ser mejor.",
        "¡Haz algo bonito por alguien hoy!",
        "La Navidad es tiempo de amor y alegría.",
        "Un abrazo puede alegrarle el día a alguien.",
        "Los pequeños gestos hacen grandes diferencias.",
        "¡Nunca dejes de soñar!",
        "La felicidad se comparte con una sonrisa.",
        "Los buenos amigos son regalos valiosos.",
        "Haz tu mejor esfuerzo en todo lo que hagas.",
        "La Navidad está hecha de momentos mágicos.",
        "Ser generoso te llena el corazón.",
        "¡Haz una buena acción hoy!",
        "Recuerda agradecer por lo que tienes.",
        "Los regalos más grandes no se envuelven.",
        "Valora a quienes están a tu lado.",
        "Cada día trae nuevas oportunidades.",
        "Hoy es un buen día para dar las gracias.",
        "¡Eres capaz de todo lo que sueñas!",
        "La familia es el mejor regalo de todos.",
        "La bondad es el mejor adorno navideño.",
        "Hoy, haz que alguien sonría contigo."
    ];

    // Bloquear casillas futuras
    calendarTabs.forEach(tab => {
        const dayNumber = parseInt(tab.dataset.day, 10);

        if ((dayNumber > currentDay) || (currentMonth !== 11)) {
            tab.classList.add('locked'); // Clase estilos de bloqueo
            tab.disabled = true; // Deshabilitar funcionalidad
        }
    });

    // Abrir el popup
    calendarTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();

            if (!tab.classList.contains('opened') && !tab.classList.contains('locked')) {
                tab.classList.add('opened'); // Abrir la pestaña
                disableHover(tab); // Desactivar hover al abrir la pestaña
                showPopup(tab.dataset.day); // Mostrar el popup
            }
        });
    });

    // Cerrar la pestaña
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            const tab = day.querySelector('.calendar-tab');
            if (tab && tab.classList.contains('opened')) {
                tab.classList.remove('opened'); // Cerrar la pestaña
                enableHover(tab); // Reactivar hover
            }
        });
    });

    // Mostrar la nota del día
    function showPopup(dayNumber) {
        const noteIndex = parseInt(dayNumber, 10) - 1; // Obtener índice del día
        popupText.textContent = notes[noteIndex] || "¡Disfruta de este día especial!"; // Mostrar nota
        popupOverlay.style.display = 'flex'; // Mostrar el popup
    }

    // Cerrar el popup al hacer clic en la "x"
    popupClose.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // Cerrar el popup al hacer clic fuera del contenido
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

    // Desactivar temporalmente el hover de una pestaña al abrir
    function disableHover(tab) {
        tab.classList.add('no-hover'); // Añadir clase que desactiva el hover
    }

    // Reactivar el hover de una pestaña después de cerrarla
    function enableHover(tab) {
        setTimeout(() => {
            tab.classList.remove('no-hover'); // Quitar clase después de 2 segundos
        }, 2000);
    }
});
