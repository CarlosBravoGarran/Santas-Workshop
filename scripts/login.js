
// --- Botón de Inicio de Sesión ---
const loginButton = document.querySelector('.access_login');
const loginForm = document.querySelector('.login-popup');
const closeLoginButton = document.querySelector('.login_close');

loginButton?.addEventListener('click', () => {
    loginForm.classList.add('open');
}
);

closeLoginButton?.addEventListener('click', () => {
    loginForm.classList.remove('open');
});

// Cerrar el formulario de inicio de sesión al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!loginForm.contains(e.target) && !loginButton.contains(e.target)) {
        loginForm.classList.remove('open');
    }
});
