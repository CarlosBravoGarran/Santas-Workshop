
// --- Botón registro ---
const registerButton = document.querySelector('.access_register');
const registerPopup = document.querySelector('.register-popup');
const registerForm = document.querySelector('.register_form');
const closeButton = document.querySelector('.register_close');

// Abrir el formulario de registro
registerButton?.addEventListener('click', () => {
    registerPopup.classList.add('open');
});

// Cerrar el formulario de registro
closeButton?.addEventListener('click', () => {
    registerPopup.classList.remove('open');
});

// Cerrar el formulario al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!registerPopup.contains(e.target) && !registerButton.contains(e.target)) {
        registerPopup.classList.remove('open');
    }
});

// Manejar el envío del formulario de registro
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío predeterminado

    // Obtener los valores de los campos
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-password-confirm').value.trim();

    // Validar que los campos no estén vacíos
    if (!name || !email || !password || !confirmPassword) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    // Validar la contraseña
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.');
        return;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Crear el objeto usuario
    const hashedPassword = CryptoJS.SHA256(password).toString(); // Cifrar la contraseña
    const user = {
        name,
        email,
        password: hashedPassword
    };

    // Comprobar si el usuario ya existe en localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((u) => u.email === email)) {
        alert('Este correo ya está registrado.');
        return;
    }

    // Guardar el usuario en localStorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Confirmar registro y cerrar formulario
    alert('¡Registro exitoso!');
    registerForm.reset(); // Limpiar el formulario
    registerPopup.classList.remove('open');
});
