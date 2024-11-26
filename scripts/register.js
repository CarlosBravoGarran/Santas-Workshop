
// --- Botón registro ---
const registerButton = document.querySelector('.access_register');
const registerForm = document.querySelector('.register-popup');
const closeButton = document.querySelector('.register_close');

registerButton?.addEventListener('click', () => {
    registerForm.classList.add('open');
});

closeButton?.addEventListener('click', () => {
    registerForm.classList.remove('open');
});

// Cerrar el formulario de registro al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!registerForm.contains(e.target) && !registerButton.contains(e.target)) {
        registerForm.classList.remove('open');
    }
});