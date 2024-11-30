
document.addEventListener('DOMContentLoaded', () => {
    const accessories = document.querySelectorAll('.accessory');
    const gingerbreadBase = document.querySelector('.gingerbread');

    // Evento para iniciar el drag
    accessories.forEach(accessory => {
        accessory.addEventListener('dragstart', (e) => {
            const imgSrc = accessory.querySelector('img').src; // Obtener la fuente de la imagen
            e.dataTransfer.setData('imgSrc', imgSrc); // Guardar el src de la imagen

            // Usar setDragImage para asegurar que el accesorio arrastrado tenga el mismo tamaño
            const imgElement = accessory.querySelector('img');
            e.dataTransfer.setDragImage(imgElement, 0, 0); // El offset (0, 0) asegura que el elemento arrastrado no se desplace

            // Evitar que el accesorio original se mueva
            accessory.style.opacity = '0.5'; // Agregar un efecto visual opcional
        });

        accessory.addEventListener('dragend', (e) => {
            // Restaurar la opacidad después de que se termina el drag
            accessory.style.opacity = '1';
        });
    });

    // Permitir soltar en la base de la galleta
    gingerbreadBase.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permite el drop
    });

    // Soltar el accesorio en la base
    gingerbreadBase.addEventListener('drop', (e) => {
        e.preventDefault();

        // Obtener la imagen desde el dragstart
        const imgSrc = e.dataTransfer.getData('imgSrc');

        // Crear el accesorio en la galleta
        const placedAccessory = document.createElement('div');
        placedAccessory.classList.add('placed-accessory');
        
        // Crear la imagen para colocarla en la galleta
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;

        placedAccessory.appendChild(imgElement);

        // Ajustar el tamaño de la imagen para que sea igual al tamaño de las imágenes originales
        imgElement.style.width = '35px';
        imgElement.style.height = 'auto';

        // Calcular la posición relativa al contenedor
        const rect = gingerbreadBase.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100; 

        placedAccessory.style.left = `${x}%`;
        placedAccessory.style.top = `${y}%`;

        // Agregar el accesorio a la galleta
        gingerbreadBase.appendChild(placedAccessory);

        // Eliminar accesorios al hacer clic en ellos
        placedAccessory.addEventListener('click', () => {
            gingerbreadBase.removeChild(placedAccessory);
        });
    });
});
