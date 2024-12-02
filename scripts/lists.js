const goodList = [
    "Olivia",
    "Luis",
    "Valeria",
    "Diego",
    "Lucía",
    "Carlos",
    "María",
    "Daniel",
    "Carla",
    "Iñigo",
    "Sofía",
    "Mateo",
    "Adriana",
    "Gabriel",
    "Isabella",
    "Hugo",
    "Victoria",
    "Martina",
    "Pablo",
    "Camila",
    "David",
    "Samuel",
    "Elena",
    "Gabriela",
    "Andrés",
    "Claudia",
    "Sebastián",
    "Lola",
    "Marcos",
    "Noelia"
];

const badList = [
    "Pedro",
    "Juana",
    "Miguel",
    "Paula",
    "Antonio",
    "Laura",
    "César",
    "Clara",
    "Jorge",
    "Elena",
    "Manuel",
    "Raquel",
    "Sandra",
    "Iván",
    "Julia",
    "Sergio",
    "Rosa",
    "Mariano",
    "Beatriz",
    "Tomás",
    "Álvaro",
    "Silvia",
    "Cristina",
    "Ángel",
    "Teresa",
    "Ana",
    "Fernando",
    "María José",
    "Ricardo",
    "Patricia"
];


function showGoodList() {
    const list_container = document.getElementById("list-output");
    list_container.style.display = "block";
    list_container.innerHTML = `<h3 class="titulo_niños">Lista de niños buenos:</h3><ul class="lista_niños">${goodList
        .map(name => `<li>${name}</li>`)
        .join("")}</ul>`;
}

function showBadList() {
    const list_container = document.getElementById("list-output");
    list_container.style.display = "block";
    list_container.innerHTML = `<h3 class="titulo_niños">Lista de niños traviesos:</h3><ul class="lista_niños">${badList
        .map(name => `<li>${name}</li>`)
        .join("")}</ul>`;
}

function addToList() {
    const nombre = document.getElementById("search_name").value;
    if (!nombre) {
        showNotification("Por favor, escribe un nombre.", 'warning');
        return;
    }

    if (!isUserLoggedIn()) {
        showNotification("Debes iniciar sesión para agregar nombres.", 'warning');
        return;
    }

    const numeroAleatorio = Math.random();
    if (numeroAleatorio > 0.5) {
        goodList.push(nombre);
        showNotification("Nombre agregado a la lista de buenos.", 'success');
        showGoodList();
    } else {
        badList.push(nombre);
        showNotification("Nombre agregado a la lista de traviesos.", 'success');
        showBadList();
    }
}

document.getElementById("btn-search").addEventListener("click", addToList);
document.getElementById("btn-good-list").addEventListener("click", showGoodList);
document.getElementById("btn-bad-list").addEventListener("click", showBadList);
