// --- Menú Lateral ---
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    menu.classList.toggle('open');
});

// --- Barra de Búsqueda ---
const searchContainer = document.querySelector('.search-bar');
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-text');
const suggestions = document.getElementById('suggestions');

// Mostrar/Ocultar barra de búsqueda
searchIcon?.addEventListener('click', () => {
    if (!searchContainer.classList.contains('active')) {
        searchContainer.classList.add('active');
        searchInput.focus(); // Foco automático en la barra de búsqueda
    } else if (searchInput.value.trim()) {
        navigateToSection(searchInput.value.trim());
        closeSearchBar();
    } else {
        closeSearchBar();
    }
});

// Secciones del sitio web
const sections = [
    "Inicio",
    "Historia",
    "Calendario",
    "Sigue a Santa",
    "Cartas",
    "Videollamada",
    "Tu Nombre de Elfo",
    "Foto con Papá Noel",
    "Las Listas",
    "Juegos",
    "Galería",
    "Experiencia"
];

// Mostrar sugerencias al escribir
searchInput?.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestions.innerHTML = ""; // Limpiar sugerencias anteriores

    if (query) {
        const filteredSections = sections.filter(section =>
            section.toLowerCase().includes(query)
        );

        if (filteredSections.length > 0) {
            suggestions.style.display = "block";
            filteredSections.forEach(section => {
                const li = document.createElement("li");
                li.textContent = section;
                li.addEventListener("click", () => {
                    searchInput.value = section; // Escribir la sugerencia seleccionada en el input
                    suggestions.style.display = "none"; // Ocultar las sugerencias
                });
                suggestions.appendChild(li);
            });
        } else {
            displayNoResults();
        }
    } else {
        suggestions.style.display = "none";
    }
});

// Ocultar sugerencias al hacer clic fuera
document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
        suggestions.style.display = "none";
    }
});

// Navegar a la sección correspondiente
function navigateToSection(section) {
    const sectionIdMap = {
        "Inicio": "home",
        "Historia": "history",
        "Calendario": "calendar",
        "Sigue a Santa": "follow-santa",
        "Cartas": "letters",
        "Videollamada": "videocall",
        "Tu Nombre de Elfo": "elf-name",
        "Foto con Papá Noel": "santa-picture",
        "Las Listas": "lists",
        "Juegos": "games",
        "Galería": "gallery",
        "Experiencia": "experience"
    };

    const id = sectionIdMap[section];
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}

// Cerrar la barra de búsqueda
function closeSearchBar() {
    searchContainer.classList.remove('active');
    searchInput.value = ""; // Limpiar el texto del input
    suggestions.style.display = "none"; // Ocultar las sugerencias
}

// Mostrar "Sin resultados"
function displayNoResults() {
    const li = document.createElement("li");
    li.textContent = "Sin resultados";
    li.style.color = "#999";
    suggestions.appendChild(li);
}


// --- Botones de Acceso ---

const accessButton = document.querySelector('.access');
const accessMenu = document.querySelector('.access_menu');

// Verificar sesión activa
function getActiveSession() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find((u) => u.active === true);
}

function toggleMenus() {
    const activeUser = getActiveSession();

        if (activeUser) {
            // Mostrar menú de logout si hay sesión iniciada
            if (!logoutMenu.classList.contains('open')) {
                logoutMenu.style.display = 'block';
                setTimeout(() => {
                    logoutMenu.classList.add('open');
                }, 100);
            } else {
                logoutMenu.classList.remove('open');
                setTimeout(() => {
                    logoutMenu.style.display = 'none';
                }, 100);
            }
        } else {
            // Mostrar menú de acceso si no hay sesión iniciada
            if (!accessMenu.classList.contains('open')) {
                accessMenu.style.display = 'block';
                setTimeout(() => {
                    accessMenu.classList.add('open');
                }, 100);
            } else {
                accessMenu.classList.remove('open');
                setTimeout(() => {
                    accessMenu.style.display = 'none';
                }, 100);
            }
        }
}

accessButton?.addEventListener('click', (toggleMenus));

