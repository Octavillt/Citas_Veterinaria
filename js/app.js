// Estamos definiendo las constantes que actuarán como referencias a los elementos de entrada en nuestro formulario.
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Estas constantes representan elementos de la interfaz de usuario (UI).
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando; // Esta variable de control se utilizará para comprobar si el usuario está editando una cita existente.

// Definimos la clase 'Citas', que manejará la lista de citas.
class Citas {
    constructor() {
        this.citas = []; // Almacenará todas las citas.
    }

    // Método para agregar una cita a la lista de citas.
    agregarCita(cita) {
        this.citas = [...this.citas, cita]; // Añade la nueva cita al final de la lista de citas existente.
    }

    // Método para eliminar una cita de la lista por su ID.
    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id); // Filtra todas las citas, manteniendo solo las que no coinciden con el ID proporcionado.
    }

    // Método para actualizar una cita existente con una versión nueva.
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita) // Reemplaza la cita con el mismo ID con la cita actualizada.
    }
}

// Definimos la clase 'UI', que manejará la interacción con la interfaz de usuario.
class UI {
    // Método para imprimir un mensaje de alerta en la interfaz de usuario.
    imprimirAlerta(mensaje, tipo) {
        // Crea un nuevo elemento 'div' para contener el mensaje.
        const divMensaje = document.createElement('div');
        // Agrega clases al div para estilizarlo.
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        // Determina el tipo de alerta (éxito o error) y añade la clase correspondiente.
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        // Asigna el mensaje de texto al contenido del div.
        divMensaje.textContent = mensaje;
        // Agrega el div al DOM, justo antes del elemento con la clase 'agregar-cita'.
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        // Programa la eliminación del mensaje de alerta después de 3.5 segundos.
        setTimeout(() => {
            divMensaje.remove();
        }, 3500);
    }

    // Método para imprimir todas las citas en la interfaz de usuario.
    imprimirCitas({ citas }) {
        this.limpiarHTML(); // Primero, limpia cualquier cita que se esté mostrando.
        citas.forEach(cita => {
            // Por cada cita, crea una serie de elementos HTML para mostrar la información de la cita.
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('DIV');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los Elementos de la Cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = `${mascota}`;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;
            /*
            Se crean botones para eliminar y editar la cita.
            A cada botón se le asigna un controlador de eventos para manejar la acción correspondiente.
            */

            // Botón para Eliminar...
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Añade un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);

            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            // Todo se agrega a un contenedor 'div', que luego se agrega al contenedor de citas en la interfaz de usuario.

            // Agregar al HTML
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita);
        });
    }

    // Método para eliminar todos los hijos del contenedor de citas, esencialmente limpiando la lista de citas mostrada.
    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

// Instanciamos nuestras clases para su uso.
const ui = new UI();
const administrarCitas = new Citas();

// Inicializamos todos los eventos de escucha para el formulario y sus campos.
eventListeners();
function eventListeners() {
    /*
    Aquí se añaden manejadores de eventos 'input' a cada campo del formulario, de modo que cada vez que
    el usuario escribe en el campo, se almacena la entrada en la propiedad correspondiente del objeto 'citaObj'.
    */
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// Esto es un objeto que almacenará temporalmente los datos de la cita a medida que el usuario los introduce.
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
// Agrega datos al Objeto de Cita
function datosCita(e) {
    // console.log(e.target.name);
    citaObj[e.target.name] = e.target.value;
    // console.log(citaObj);
}
/*
Este es el manejador de eventos para el envío del formulario. Se encarga de validar los campos del formulario y
luego agregar una nueva cita o editar una cita existente, según corresponda.
*/
function nuevaCita(e) {
    // Aquí se detiene la recarga de la página debido a la presentación del formulario, se extraen los datos de la cita del objeto 'citaObj',
    e.preventDefault();

    // Extraer la Información del Objeto de Cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Se validan los campos del formulario para asegurar que no estén vacíos.
    if (mascota === '' || propietario === '' ||
        fecha === '' || hora === '' || sintomas === '') {
        // console.log('Campos Obligatorios');
        ui.imprimirAlerta('Todos los Campos son Obligatorios', 'error');
        return;
    }
    /*
    Luego, dependiendo de si el usuario está editando una cita existente o creando una nueva, 
    se llama a la función correspondiente para editar o agregar la cita y se muestra un mensaje de éxito.
    */
    if (editando) {
        // Pasar el Objeto de Cita a Edición
        administrarCitas.editarCita({ ...citaObj });

        ui.imprimirAlerta('Editado Correctamente...!');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar Modo Edición
        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();

        // Añade la nueva cita
        administrarCitas.agregarCita({ ...citaObj });

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se Agregó Correctamente...!')
    }

    // Generar un ID Unico
    citaObj.id = Date.now();

    // Creando una Nueva Cita
    // console.log(citaObj);
    // administrarCitas.agregarCita({ ...citaObj });

    // Finalmente, se reinicia el objeto de cita y el formulario, y se imprime la lista actualizada de citas.

    // Reinicia el Objeto para la Validación
    reiniciarObjeto();

    // Reinicia el Formulario
    formulario.reset();

    // Mostrar el HTML de las Citas
    ui.imprimirCitas(administrarCitas);
}

// Este método simplemente reinicia el objeto de cita a sus valores predeterminados.
function reiniciarObjeto() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

// Este método se llama cuando se hace clic en el botón 'eliminar' de una cita. Elimina la cita y muestra un mensaje de éxito.
function eliminarCita(id) {
    // Eliminar Cita
    administrarCitas.eliminarCita(id);

    // Mostrar Mensaje
    ui.imprimirAlerta('Cita Eliminada Correctamente...');

    // Refresacar las Citas
    ui.imprimirCitas(administrarCitas);
}

/* 
Este método se llama cuando se hace clic en el botón 'editar' de una cita. 
Rellena el formulario con los datos de la cita y cambia el formulario al modo de edición.
*/
function cargarEdicion(cita) {
    console.log(cita);
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Cambiar el Texto del Botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}
