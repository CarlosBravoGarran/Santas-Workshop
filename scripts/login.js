
// --- Botón Login ---
const loginButton = document.querySelector('.access_login');
const loginPopup = document.querySelector('.login-popup');
const loginForm = document.querySelector('.login_form');
const closeLoginButton = document.querySelector('.login_close');

// Abrir el formulario de login
loginButton?.addEventListener('click', () => {
    loginPopup.classList.add('open');
});

// Cerrar el formulario de login
closeLoginButton?.addEventListener('click', () => {
    loginPopup.classList.remove('open');
});

// Cerrar el formulario de login al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!loginPopup.contains(e.target) && !loginButton.contains(e.target)) {
        loginPopup.classList.remove('open');
    }
});

// Iniciar sesión
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar envío predeterminado

    // Obtener valores del formulario
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar usuario por correo
    const user = users.find((u) => u.email === email);

    if (!user) {
        alert('Correo no registrado. Por favor, regístrate primero.');
        return;
    }

    // Hashear la contraseña ingresada y compararla con la almacenada
    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (user.password !== hashedPassword) {
        alert('Contraseña incorrecta.');
        return;
    }

    // Inicio de sesión exitoso
    alert(`¡Bienvenido, ${user.name}!`);
    accessMenu.classList.remove('open'); // Cerrar menu de acceso
    loginPopup.classList.remove('open'); // Cerrar el formulario
});
