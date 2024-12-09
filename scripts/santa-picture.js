document.addEventListener('DOMContentLoaded', () => {
    const openCameraBtn = document.querySelector('.open-camera_btn');
    const cameraPopup = document.querySelector('.selfie_popup');
    const cameraFeed = document.querySelector('.camera_feed');
    const popupCanvas = document.querySelector('.camera_canvas');
    const captureBtn = document.querySelector('.capture_btn');
    const savePhotoBtn = document.querySelector('.save-photo_btn');
    const photoContainer = document.querySelector('.photo_container');
    const darkOverlay = document.querySelector('.camera_dark-overlay');

    let stream; // Guardar el stream de la cámara

    // Dibujar círculo guía en el canvas
    function drawGuideCircle(canvas) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Radio proporcional al tamaño del canvas
        const radius = Math.min(canvas.width, canvas.height) / 4;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }


    // Verificar si el canvas está vacío
    function isCanvasEmpty(canvas) {
        const ctx = canvas.getContext('2d');
        const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        return !pixelData.some((value) => value !== 0); 
    }

    // Abrir el popup de la cámara y activar la cámara
    openCameraBtn.addEventListener('click', async () => {
        try {

            if(!isUserLoggedIn()) {
                showNotification('Debe iniciar sesión para utilizar esta funcionalidad.', 'warning');
                return; 
            }

            cameraPopup.style.display = 'flex';
            darkOverlay.style.display = 'block';

            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }, // Cámara frontal
            });
            cameraFeed.srcObject = stream;
            cameraFeed.play();


            // Deshabilitar el botón de guardar si el canvas está vacío
            savePhotoBtn.disabled = isCanvasEmpty(popupCanvas);
        } catch (error) {
            console.error('No se pudo acceder a la cámara:', error);
        }
    });

    // Tomar foto
    captureBtn.addEventListener('click', () => {
        const ctx = popupCanvas.getContext('2d');

        popupCanvas.width = cameraFeed.videoWidth;
        popupCanvas.height = cameraFeed.videoHeight;

        // Dibujar la imagen de la cámara  
        ctx.translate(popupCanvas.width, 0);
        ctx.scale(-1, 1); // Invertir horizontalmente
        ctx.drawImage(cameraFeed, 0, 0, popupCanvas.width, popupCanvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Dibujar el círculo guía
        drawGuideCircle(popupCanvas);

        // Habilitar el botón de guardar si el canvas no está vacío
        savePhotoBtn.disabled = isCanvasEmpty(popupCanvas);
    });

    // Guardar foto
    savePhotoBtn.addEventListener('click', () => {
        const cameraCanvas = document.createElement('canvas');
        const ctx = cameraCanvas.getContext('2d');

        cameraCanvas.width = popupCanvas.width;
        cameraCanvas.height = popupCanvas.height;

        // Copiar la foto del popup canvas al canvas final
        ctx.drawImage(popupCanvas, 0, 0);

        // Superponer el filtro
        const overlay = new Image();
        overlay.src = './images/selfie_elf.webp';
        overlay.onload = () => {
            ctx.drawImage(
                overlay,
                cameraCanvas.width * 0, // Posición X
                cameraCanvas.height * 0, // Posición Y
                cameraCanvas.width * 1, // Ancho
                cameraCanvas.height * 1 // Alto
            );

            // Convertir el canvas a una imagen
            const img = document.createElement('img');
            img.src = cameraCanvas.toDataURL('image/png');
            img.style.width = '100%';
            img.style.height = '100%';

            // Agregar la imagen al contenedor final
            photoContainer.innerHTML = '';
            photoContainer.appendChild(img);

            // Detener la cámara y cerrar el popup
            stream.getTracks().forEach((track) => track.stop());
            cameraPopup.style.display = 'none';
            darkOverlay.style.display = 'none';
        };
    });

    // Cerrar el popup al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        if (!cameraPopup.contains(event.target) && event.target !== openCameraBtn) {
            cameraPopup.style.display = 'none';
            darkOverlay.style.display = 'none';

            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }

            // Limpiar el canvas visible
            const ctx = popupCanvas.getContext('2d');
            ctx.clearRect(0, 0, popupCanvas.width, popupCanvas.height);
        }
    });
});
