document.addEventListener("DOMContentLoaded", function () {
    let serviciosHolistic = [];

    // Cargar datos desde el archivo JSON local
    fetch('servicios.json')
        .then(response => response.json())
        .then(data => {
            serviciosHolistic = data;
            mostrarProductos();
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    const serviciosContainer = document.querySelector(".servicios");
    const tarjetaFinalizacion = document.getElementById("tarjetaFinalizacion");
    const formularioReserva = document.getElementById("formularioReserva");
    const formularioDatos = document.getElementById("formularioDatos");

    function mostrarProductos() {
        serviciosContainer.innerHTML = serviciosHolistic.map(productoItem => `
            <div class="producto">
                <img src="${productoItem.image}" alt="${productoItem.name}" />
                <h2>${productoItem.name}</h2>
                <p>Precio: $${productoItem.price}</p>
                <button class="btnAgregar" data-servicio="${productoItem.name}">Reservar Turno</button>
            </div>
        `).join('');

        serviciosContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("btnAgregar")) {
                const servicioSeleccionado = event.target.getAttribute("data-servicio");
                mostrarFormulario(servicioSeleccionado);
            }
        });
    }


    function mostrarFormulario(servicio) {
        serviciosContainer.classList.add("ocultar");
        formularioReserva.classList.remove("ocultar");
        document.getElementById("inputServicio").value = servicio;
    }

    formularioDatos.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const disponibilidad = document.getElementById("disponibilidad").value;


        // mensaje en la consola
        console.log("Nombre: " + nombre);
        console.log("Correo Electrónico: " + email);
        console.log("Teléfono: " + telefono);
        console.log("Disponibilidad Horaria: " + disponibilidad);

        // Ocultar el formulario después de enviarlo
        formularioReserva.classList.add("ocultar");
    });

    const btnCancelar = document.getElementById("btnCancelar");
    btnCancelar.addEventListener("click", () => {
        ocultarFormulario();
    });

    function ocultarFormulario() {
        formularioDatos.reset();
        formularioReserva.classList.add("ocultar");
    }



    formularioDatos.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const disponibilidad = document.getElementById("disponibilidad").value;



        // Mostrar el mensaje de finalización
        mostrarTarjetaFinalizacion();

        // Ocultar el formulario después de enviarlo (si es necesario)
        ocultarFormulario();
    });

    function mostrarTarjetaFinalizacion() {
        const servicioSeleccionado = document.getElementById("inputServicio").value;
        const servicioElegido = serviciosHolistic.find(servicio => servicio.name === servicioSeleccionado);
        const mensajeFinalizacion = `¡Reserva completada para la sesión de ${servicioSeleccionado}! Se ha enviado un correo electrónico con más información a la dirección proporcionada.`;



        tarjetaFinalizacion.innerHTML = `
            <div class="tarjeta">
                <img src="${servicioElegido.image}" alt="${servicioElegido.name}" />
                <h2>${servicioElegido.name}</h2>
                <p>${mensajeFinalizacion}</p>
                <button id="btnVolver" class="btnVolver">Volver a los Servicios</button>
                </div>
            </div>
        `;

        tarjetaFinalizacion.classList.remove("ocultar");

        // Usar SweetAlert2 para mostrar un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Reserva Completada!',
            text: mensajeFinalizacion,
        });

        // Agregar un evento clic al botón para volver a los servicios
        const btnVolver = document.getElementById("btnVolver");
        btnVolver.addEventListener("click", function () {
            // Ocultar la tarjeta finalización
            tarjetaFinalizacion.classList.add("ocultar");
            // Mostrar los servicios
            serviciosContainer.classList.remove("ocultar");
        });

    }



});

