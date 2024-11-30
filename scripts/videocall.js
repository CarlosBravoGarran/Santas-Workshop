document.addEventListener('DOMContentLoaded', () => {
    const toggleCallButton = document.querySelector('.videocall_start');
    const videocallMessage = document.querySelector('.videocall_message');
    const videocallVideo = document.querySelector('.videocall_video');
    const callIcon = document.querySelector('.videocall_icon'); // Imagen del botón
    const cameraContainer = document.querySelector('.videocall_camara'); // Contenedor de la cámara

    let cameraStream = null; // Variable para guardar el flujo de la cámara

    // Función para iniciar la cámara
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraStream = stream;
            const videoElement = document.createElement('video'); // Crear elemento de video para la cámara
            videoElement.autoplay = true;
            videoElement.muted = true;
            videoElement.playsInline = true;
            videoElement.srcObject = stream; // Conectar el flujo al elemento
            videoElement.classList.add('camera-stream'); // Clase opcional para estilos
            cameraContainer.innerHTML = ''; // Limpiar contenedor antes de agregar
            cameraContainer.appendChild(videoElement); // Mostrar video
        } catch (error) {
            showNotification('No se pudo acceder a la cámara.', 'error');
        }
    }

    // Función para detener la cámara
    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop()); // Detener flujo
            cameraStream = null;
            cameraContainer.innerHTML = ''; // Limpiar el contenedor de la cámara
        }
    }

    // Función para manejar el toggle de llamada
    toggleCallButton.addEventListener('click', () => {
        if (videocallVideo.style.display === 'block') {
            // Terminar llamada
            videocallVideo.pause();
            videocallVideo.currentTime = 0;
            videocallVideo.style.display = 'none'; // Ocultar video
            videocallMessage.style.display = 'flex'; // Mostrar mensaje inicial
            callIcon.src = 'images/call_icon.webp'; // Cambiar a icono de llamada
            stopCamera(); // Detener la cámara
        } else {
            // Iniciar llamada
            videocallMessage.style.display = 'none'; // Ocultar mensaje inicial
            videocallVideo.style.display = 'block'; // Mostrar video
            videocallVideo.play();
            callIcon.src = 'images/hang_icon.webp'; // Cambiar a icono de colgar
            startCamera(); // Iniciar la cámara
        }
    });
});
