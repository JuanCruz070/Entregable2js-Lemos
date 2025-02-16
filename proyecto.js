document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const triviaBox = document.getElementById('triviaBox');
    const btnEmpezarTrivia = document.getElementById('btnEmpezarTrivia');
    const btnTablaPuntos = document.getElementById('btnTablaPuntos');
    const nombreInput = document.getElementById('nombreInput');
    const btnContinuar = document.createElement('button');

    let puntos = 0;
    let preguntaActual = 0;
    let respuestaSeleccionada = false; // Variable para controlar si se seleccionó una respuesta
    let mensajeMostrado = false; // Variable para controlar si el mensaje ya se mostró



    const preguntas = [
        {
            pregunta: "Como se llama el padre de Goku?",
            opciones: ["Krillin", "Dende", "Vegeta", "Bardock"],
            respuestaCorrecta: "Bardock"
        },
        {
            pregunta: "Quien es el principe de los sayayin?",
            opciones: ["Broly", "Raditz", "Kakaroto", "Vegeta"],
            respuestaCorrecta: "Vegeta"
        },
        {
            pregunta: "Quien le enseña la tecnica Kamehameha a Goku y Krillin?",
            opciones: ["Piccolo", "Yamcha", "Maestro Roshi", "Puar"],
            respuestaCorrecta: "Maestro Roshi"
        },
        {
            pregunta: "Quien adopta a Goku cuando llega a la tierra?",
            opciones: ["Maestro Roshi", "OxSatan", "Abuelo Gohan", "Bulma"],
            respuestaCorrecta: "Abuelo Gohan"
        },
        {
            pregunta: "En que planeta aprende Goku la teletransportacion?",
            opciones: ["Planeta Namek", "Planeta Vegeta", "Planeta Yadrat", "Planeta Tierra"],
            respuestaCorrecta: "Planeta Yadrat"
        },
    ];

    btnEmpezarTrivia.addEventListener('click', function () {
        const nombre = nombreInput.value.trim();
        if (nombre !== '') {
            overlay.style.display = 'none';
            mostrarPregunta();
        } else {
            if (!mensajeMostrado) {
                showMessage('Por favor, ingresa tu nombre.');
                mensajeMostrado = true; // Marcar que el mensaje se ha mostrado
            }
            triviaBox.removeChild(btnContinuar); // Eliminar el botón "Continuar" si está presente
        }
    });

    btnTablaPuntos.addEventListener('click', function () {
        overlay.style.display = 'flex';
        mostrarTablaPuntos();
    });

    function showMessage(message) {
        const mensajeElemento = document.createElement('div');
        mensajeElemento.textContent = message;
        triviaBox.appendChild(mensajeElemento);

        btnContinuar.textContent = 'Continuar';
        btnContinuar.addEventListener('click', function () {
            triviaBox.removeChild(mensajeElemento);
            triviaBox.removeChild(btnContinuar);
            if (preguntaActual < preguntas.length) {
                mostrarPregunta();
            } else {
                terminarTrivia();
            }
        });
        triviaBox.appendChild(btnContinuar);
    }

    function mostrarPregunta() {
        triviaBox.innerHTML = '';
        nombreInput.style.display = 'none'; // Oculta el input de nombre
        btnEmpezarTrivia.style.display = 'none'; // Oculta el botón de Empezar Trivia
        btnTablaPuntos.style.display = 'none'; // Oculta el botón de Tabla de Puntos
        respuestaSeleccionada = false; // Restablece la capacidad de seleccionar respuestas
        const preguntaActualObj = preguntas[preguntaActual];

        const preguntaElemento = document.createElement('h3');
        preguntaElemento.textContent = preguntaActualObj.pregunta;
        triviaBox.appendChild(preguntaElemento);

        preguntaActualObj.opciones.forEach((opcion, index) => {
            const opcionElemento = document.createElement('button');
            opcionElemento.textContent = opcion;
            opcionElemento.addEventListener('click', function () {
                if (!respuestaSeleccionada) {
                    verificarRespuesta(opcion);
                    respuestaSeleccionada = true; // Marca que se seleccionó una respuesta
                }
            });
            triviaBox.appendChild(opcionElemento);
        });
    }

    function verificarRespuesta(respuesta) {
        const preguntaActualObj = preguntas[preguntaActual];
        if (respuesta === preguntaActualObj.respuestaCorrecta) {
            puntos++;
            showMessage('¡Respuesta correcta!');
        } else {
            showMessage('Respuesta incorrecta. La respuesta correcta es: ' + preguntaActualObj.respuestaCorrecta);
        }

        preguntaActual++;
    }

    function terminarTrivia() {
        overlay.style.display = 'flex';
        triviaBox.innerHTML = '<h2>Has terminado la trivia. Obtuviste ' + puntos + ' puntos de 5 posibles.</h2>';

        // Calcula y actualiza la tabla de puntos
        actualizarTablaPuntos(nombreInput.value, puntos);

        const btnVolverAlInicio = document.createElement('button');
        btnVolverAlInicio.textContent = 'Volver al Inicio';
        btnVolverAlInicio.addEventListener('click', function () {
            overlay.style.display = 'none';
            puntos = 0;
            preguntaActual = 0;
            respuestaSeleccionada = false; // Reinicia la variable de respuesta seleccionada
            mostrarBotones(); // Muestra los botones Empezar Trivia y Tabla de Puntos
            nombreInput.style.display = 'block';
            nombreInput.value = '';
            triviaBox.innerHTML = '';
        });

        triviaBox.appendChild(btnVolverAlInicio);
    }

    function mostrarTablaPuntos() {
        overlay.style.display = 'flex';
        triviaBox.innerHTML = '<h2>Tabla de Puntos</h2>';

        const puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
        const sortedPuntos = puntosGuardados.sort((a, b) => b.puntos - a.puntos);

        const tablaPuntos = document.createElement('div');
        sortedPuntos.forEach((jugador, index) => {
            const jugadorElemento = document.createElement('div');
            jugadorElemento.textContent = jugador.nombre + ': ' + jugador.puntos + ' puntos';
            tablaPuntos.appendChild(jugadorElemento);
        });

        triviaBox.appendChild(tablaPuntos);

        const btnVolverAlInicio = document.createElement('button');
        btnVolverAlInicio.textContent = 'Volver al Inicio';
        btnVolverAlInicio.addEventListener('click', function () {
            overlay.style.display = 'none';
            mostrarBotones(); // Muestra los botones Empezar Trivia y Tabla de Puntos
            nombreInput.style.display = 'block';
            nombreInput.value = '';
            triviaBox.innerHTML = '';
        });

        triviaBox.appendChild(btnVolverAlInicio);

        nombreInput.style.display = 'none';
        btnEmpezarTrivia.style.display = 'none';
        btnTablaPuntos.style.display = 'none';
    }

    function mostrarBotones() {
        btnEmpezarTrivia.style.display = 'block';
        btnTablaPuntos.style.display = 'block';
    }

    function actualizarTablaPuntos(nombre, puntaje) {
        const puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
        puntosGuardados.push({ nombre, puntos: puntaje });

        // Ordena los puntajes de forma descendente
        const sortedPuntos = puntosGuardados.sort((a, b) => b.puntos - a.puntos);

        // Mantiene solo los mejores 15 puntajes
        const top15Puntos = sortedPuntos.slice(0, 15);

        // Guarda los puntajes actualizados en el Local Storage
        localStorage.setItem('puntos', JSON.stringify(top15Puntos));
    }
});