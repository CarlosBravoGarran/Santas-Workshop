
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.book-form'); 
    const totalPriceElement = document.querySelector('.book_price span');
    const pricePerPerson = 239; // Precio por persona
    const bookBtn = document.querySelector('.book_btn');
    const payBackBtn = document.querySelector('.book-payment_back');
    const payBtn = document.querySelector('.book-payment_btn');
    const confBtn = document.querySelector('.book-confirm_btn');
    const confBackBtn = document.querySelector('.book-confirm_back');
    const step1 = document.querySelector('.step1');
    const step2 = document.querySelector('.step2');
    const step3 = document.querySelector('.step3');


    // Calcular el precio total en función del número de personas
    form.book_people.addEventListener('input', (event) => {
        const numberOfPeople = parseInt(event.target.value, 10) || 0; 
        const totalPrice = numberOfPeople * pricePerPerson;
        totalPriceElement.textContent = totalPrice;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Recopilar datos del formulario
        const name = form.book_name.value;
        const email = form.book_email.value;
        const phone = form.book_phone.value;
        const date = form.book_date.value;
        const people = form.book_people.value;
        const price = totalPriceElement.textContent;

        // Asignar los valores a la sección de confirmación
        document.getElementById('book_confirm-name').textContent = name;
        document.getElementById('book_confirm-email').textContent = email;
        document.getElementById('book_confirm-phone').textContent = phone;
        document.getElementById('book_confirm-date').textContent = date;
        document.getElementById('book_confirm-people').textContent = people;
        document.getElementById('book_confirm-price').textContent = `${price} €`;

        // Cambiar de paso
        step1.style.display = 'none';
        step2.style.display = 'flex';
    });

    payBackBtn.addEventListener('click', () => {
        step2.style.display = 'none';
        step1.style.display = 'flex';
    });


    const paypalOption = document.getElementById('book_payment-paypal');
    const cardOption = document.getElementById('book_payment-card');
    const paypalForm = document.querySelector('.paypal-payment');
    const cardForm = document.querySelector('.card-payment');

    //Mostrar/ocultar formularios según la opción 
    function togglePaymentForms() {
        if (paypalOption.checked) {
            paypalForm.style.display = 'block';
            cardForm.style.display = 'none';
        } else if (cardOption.checked) {
            cardForm.style.display = 'block';
            paypalForm.style.display = 'none'; 
        }
    }

    // Cambios en las opciones de pago
    paypalOption.addEventListener('change', togglePaymentForms);
    cardOption.addEventListener('change', togglePaymentForms);
    togglePaymentForms();

    // Validar formulario de pago
    payBtn.addEventListener('click', (event) => {
        event.preventDefault();


        const email = document.getElementById('paypal_email').value;
        const password = document.getElementById('paypal_password').value;
        const cardNumber = document.getElementById('card_number').value;
        const cardName = document.getElementById('card_name').value;
        const cardDate = document.getElementById('card_expiry').value;
        const cardCvv = document.getElementById('card_cvv').value;

        if(!paypalOption.checked && !cardOption.checked) {
            showNotification('Por favor, selecciona un método de pago', 'error');
            return;
        }

        if (paypalOption.checked) {
            if (!email || !password) {
                showNotification('Por favor, rellena todos los campos', 'error');
                return;
            }
        } else if (cardOption.checked) {
            if (!cardNumber || !cardName || !cardDate || !cardCvv) {
                showNotification('Por favor, rellena todos los campos', 'error');
                return;
            }
        }        
        step2.style.display = 'none';
        step3.style.display = 'flex';
    });

    // Confirmar 
    confBtn.addEventListener('click', () => {
        showNotification('Reserva confirmada. Recibirás un email con los detalles de la reserva.', 'success');
    });

    confBackBtn.addEventListener('click', () => {
        step3.style.display = 'none';
        step2.style.display = 'flex';
    });



});
