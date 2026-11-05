let tareas = [];
let siguienteId = 1;

const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("nueva-tarea");
const lista = document.getElementById("lista");

// Mostrar las tareas en la página.
function mostrarTareas() {
    lista.innerHTML = "";

    if (tareas.length === 0) {
        const mensaje = document.createElement("li");
        mensaje.className = "vacia";
        mensaje.textContent = "Todavía no tienes tareas agregadas.";
        lista.appendChild(mensaje);
        return;
    }

    // Las tareas pendientes aparecen antes que las completadas.
    const pendientes = tareas.filter(function (tarea) {
        return !tarea.completada;
    });

    const completadas = tareas.filter(function (tarea) {
        return tarea.completada;
    });

    const tareasOrdenadas = pendientes.concat(completadas);

    tareasOrdenadas.forEach(function (tarea) {
        const elemento = document.createElement("li");

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = tarea.completada;
        casilla.setAttribute("aria-label", "Marcar tarea como completada");

        casilla.addEventListener("change", function () {
            cambiarEstado(tarea.id);
        });

        const texto = document.createElement("span");
        texto.textContent = tarea.descripcion;

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "eliminar";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function () {
            eliminarTarea(tarea.id);
        });

        elemento.appendChild(casilla);
        elemento.appendChild(texto);
        elemento.appendChild(botonEliminar);
        lista.appendChild(elemento);
    });
}

// Agregar una tarea nueva.
function agregarTarea(descripcion) {
    const tarea = {
        id: siguienteId,
        descripcion: descripcion,
        completada: false
    };

    tareas.push(tarea);
    siguienteId++;
    mostrarTareas();
}

// Cambiar entre pendiente y completada.
function cambiarEstado(id) {
    tareas.forEach(function (tarea) {
        if (tarea.id === id) {
            tarea.completada = !tarea.completada;
        }
    });

    mostrarTareas();
}

// Eliminar una tarea de la lista.
function eliminarTarea(id) {
    tareas = tareas.filter(function (tarea) {
        return tarea.id !== id;
    });

    mostrarTareas();
}

// Escuchar el envío del formulario.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const descripcion = inputTarea.value.trim();

    if (descripcion === "") {
        return;
    }

    agregarTarea(descripcion);
    inputTarea.value = "";
    inputTarea.focus();
});

mostrarTareas();
