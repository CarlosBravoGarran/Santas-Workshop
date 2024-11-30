
document.addEventListener('DOMContentLoaded', () => {
    const toggleCallButton = document.querySelector('.videocall_start');
    const videocallMessage = document.querySelector('.videocall_message');
    const videocallVideo = document.querySelector('.videocall_video');
    const callIcon = document.querySelector('.videocall_icon'); 
    const cameraContainer = document.querySelector('.videocall_camara');

    let cameraStream = null; 

    // Función para iniciar la cámara
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraStream = stream;
            const videoElement = document.createElement('video'); // Crear elemento de video para la cámara
            videoElement.autoplay = true;
            videoElement.muted = true;
            videoElement.playsInline = true;
            videoElement.srcObject = stream; 
            videoElement.classList.add('camera-stream');
            cameraContainer.innerHTML = '';
            cameraContainer.appendChild(videoElement); // Mostrar video
        } catch (error) {
            showNotification('No se pudo acceder a la cámara.', 'error');
        }
    }

    // Detener la cámara
    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop()); // Detener la cámara
            cameraStream = null;
            cameraContainer.innerHTML = ''; // Limpiar contenedor
        }
    }

    // Toggle botón llamada
    toggleCallButton.addEventListener('click', () => {
        if (!isUserLoggedIn()) {
            showNotification('Debe iniciar sesión para utilizar esta funconalidad.', 'warning');
            return;
        }
        if (videocallVideo.style.display === 'block') {
            // Terminar llamada
            videocallVideo.pause();
            videocallVideo.currentTime = 0;
            videocallVideo.style.display = 'none';
            videocallMessage.style.display = 'flex';
            callIcon.src = 'images/call_icon.webp'; 
            stopCamera();
        } else {
            // Iniciar llamada
            videocallMessage.style.display = 'none';
            videocallVideo.style.display = 'block'; 
            videocallVideo.play();
            callIcon.src = 'images/hang_icon.webp';
            startCamera();
        }
    });
});
