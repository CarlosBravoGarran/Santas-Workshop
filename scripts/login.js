  
document.addEventListener('DOMContentLoaded', () => {

    const loginButton = document.querySelector('.access_login');
    const loginPopup = document.querySelector('.login-popup');
    const loginForm = document.querySelector('.login_form');
    const closeLoginButton = document.querySelector('.login_close');
    const logoutMenu = document.querySelector('.access_logout');
    const logoutButton = document.querySelector('.logout_button');
    const darkOverlay = document.querySelector('.login_dark-overlay');

    // Abrir el formulario de login
    loginButton?.addEventListener('click', () => {
        loginPopup.classList.add('open');
        darkOverlay.style.display = 'block';
    });

    // Cerrar el formulario de login
    closeLoginButton?.addEventListener('click', () => {
        loginPopup.classList.remove('open');
        darkOverlay.style.display = 'none';
    });

    // Cerrar el formulario de login al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!loginPopup.contains(e.target) && !loginButton.contains(e.target)) {
            loginPopup.classList.remove('open');
            darkOverlay.style.display = 'none';
        }
    });

    // Iniciar sesión
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        // Obtener usuarios de localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex((u) => u.email === email);

        if (userIndex === -1) {
            alert('Correo no registrado. Por favor, regístrate primero.');
            return;
        }

        const user = users[userIndex];

        // Validar contraseña
        const hashedPassword = CryptoJS.SHA256(password).toString();
        if (user.password !== hashedPassword) {
            alert('Contraseña incorrecta.');
            return;
        }

        // Actualizar sesión activa
        users[userIndex].active = true;
        localStorage.setItem('users', JSON.stringify(users));

        // Inicio de sesión exitoso
        alert(`¡Bienvenido, ${user.name}!`);

        // Limpiar y cerrar el formulario
        loginForm.reset();
        loginPopup.classList.remove('open');
        
        // Cerrar menú
        accessMenu.classList.remove('open');
        setTimeout(() => {
            accessMenu.style.display = 'none';
        }, 100);
        
    });

    // Cerrar sesión
    logoutButton?.addEventListener('click', logout);

    function logout() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const activeUserIndex = users.findIndex((u) => u.active === true);

        if (activeUserIndex !== -1) {
            users[activeUserIndex].active = false;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Cerrar menú
            logoutMenu.classList.remove('open');
            setTimeout(() => {
                logoutMenu.style.display = 'none';
            }, 100);
            
            alert('Sesión cerrada correctamente.');
        }
    }

  });