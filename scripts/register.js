
document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('.access_register');
    const registerPopup = document.querySelector('.register-popup');
    const registerForm = document.querySelector('.register_form');
    const closeButton = document.querySelector('.register_close');
    const darkOverlay = document.querySelector('.register_dark-overlay');

    // Abrir el formulario de registro
    registerButton?.addEventListener('click', () => {
        registerPopup.classList.add('open');
        darkOverlay.style.display = 'block';
    });

    // Cerrar el formulario de registro
    closeButton?.addEventListener('click', () => {
        registerPopup.classList.remove('open');
        darkOverlay.style.display = 'none';
    });

    // Cerrar el formulario al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!registerPopup.contains(e.target) && !registerButton.contains(e.target)) {
            registerPopup.classList.remove('open');
            darkOverlay.style.display = 'none';
        }
    });

    // Envío del formulario
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener los valores de los campos
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const confirmPassword = document.getElementById('register-password-confirm').value.trim();

        // Validar que los campos no estén vacíos
        if (!name || !email || !password || !confirmPassword) {
            showNotification('Por favor, completa todos los campos.', 'warning');
            return;
        }

        // Validar formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, introduce un correo electrónico válido.', 'error');
            return;
        }

        // Validar la contraseña
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            showNotification('La contraseña debe tener al menos 8 caracteres, una letra y un número.', 'error');
            return;
        }

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden.', 'error');
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
            showNotification('Este correo ya está registrado.', 'warning');
            return;
        }

        // Guardar el usuario en localStorage
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Confirmar registro y cerrar formulario
        showNotification('¡Registro exitoso!', 'success');
        registerForm.reset(); // Limpiar el formulario
        registerPopup.classList.remove('open');
    });
});