document.addEventListener("DOMContentLoaded", function() {
    
    // Mostrar el diálogo de selección de color cuando la página se cargue
    mostrarSeleccionColor();

    // Función para mostrar el diálogo de selección de color
    function mostrarSeleccionColor() {
        document.getElementById("seleccionColor").style.display = "block";
    }

    // Evento de clic para el botón de piezas blancas
    document.getElementById("blancasBtn").addEventListener("click", function() {
        // Ocultar el diálogo de selección de color
        document.getElementById("seleccionColor").style.display = "none";
        // Iniciar el juego con piezas blancas
        iniciarJuego(true);
    });

    // Evento de clic para el botón de piezas negras
    document.getElementById("negrasBtn").addEventListener("click", function() {
        // Ocultar el diálogo de selección de color
        document.getElementById("seleccionColor").style.display = "none";
        // Iniciar el juego con piezas negras
        iniciarJuego(false);
    });

    // Función para iniciar el juego con el color de piezas seleccionado
    function iniciarJuego(piezasBlancas) {
        // Aquí puedes iniciar el juego con el color de piezas seleccionado
        // Por ejemplo, puedes llamar a una función que inicie el tablero y coloque las piezas según el color seleccionado
        console.log("Juego iniciado con piezas " + (piezasBlancas ? "blancas" : "negras"));
    }


    const tablero = document.getElementById("tablero");
    let piezaSeleccionada = null;
    let turnoBlanco = true; // Variable para controlar el turno actual, comienza en true (turno de las piezas blancas)

    // Crear el tablero y colocar las piezas en su posición inicial
    inicializarTablero();

    // Función para crear el tablero y colocar las piezas en su posición inicial
    function inicializarTablero() {
        for (let fila = 0; fila < 8; fila++) {
            for (let columna = 0; columna < 8; columna++) {
                const casilla = document.createElement("div");
                casilla.classList.add("casilla");
                casilla.dataset.fila = fila;
                casilla.dataset.columna = columna;
                casilla.addEventListener("click", () => seleccionarCasilla(casilla));
                tablero.appendChild(casilla);
            }
        }

        const piezas = [
            "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
            "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
            "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"
        ];

        const casillas = document.querySelectorAll(".casilla");
        casillas.forEach((casilla, index) => {
            casilla.textContent = piezas[index];
        });
    }

    // Función para seleccionar una casilla
    function seleccionarCasilla(casilla) {
        // Verificar si es el turno de las piezas blancas y si la casilla seleccionada contiene una pieza blanca
        if (turnoBlanco && casilla.textContent !== "" && casilla.textContent !== undefined && casilla.textContent !== null && casilla.textContent !== "♟" && casilla.textContent !== "♝" && casilla.textContent !== "♞" && casilla.textContent !== "♜" && casilla.textContent !== "♛" && casilla.textContent !== "♚") {
            piezaSeleccionada = casilla;
        } 
        // Verificar si es el turno de las piezas negras y si la casilla seleccionada contiene una pieza negra
        else if (!turnoBlanco && casilla.textContent !== "" && casilla.textContent !== undefined && casilla.textContent !== null && casilla.textContent !== "♙" && casilla.textContent !== "♗" && casilla.textContent !== "♘" && casilla.textContent !== "♖" && casilla.textContent !== "♕" && casilla.textContent !== "♔") {
            piezaSeleccionada = casilla;
        }
        // Si ya hay una pieza seleccionada, mover la pieza a la casilla seleccionada
        else if (piezaSeleccionada) {
            moverPieza(piezaSeleccionada, casilla);
            // Cambiar el turno después de mover la pieza
            turnoBlanco = !turnoBlanco;
            // Restablecer la pieza seleccionada después de moverla
            piezaSeleccionada = null;
        }
    }

    // Función para mover una pieza a una nueva casilla (actualizada con validación de movimientos)
    function moverPieza(casillaOrigen, casillaDestino) {
        const pieza = casillaOrigen.textContent;

        // Validar si el movimiento es legal
        if (esMovimientoLegal(pieza, casillaOrigen, casillaDestino)) {
            // Realizar el movimiento
            casillaDestino.textContent = pieza;
            casillaOrigen.textContent = "";

            // Verificar si hay un ganador después del movimiento
            const ganador = determinarGanador();
            if (ganador) {
                mostrarMensajeGanador(ganador);
            }
            
        } else {
            // Mostrar un mensaje de error o realizar alguna otra acción si el movimiento no es legal
            console.log("Movimiento no válido");
        }
    }

    // Función para determinar al ganador
    function determinarGanador() {
        let piezasBlancas = 0;
        let piezasNegras = 0;

        // Iterar sobre todas las casillas del tablero para contar las piezas restantes de cada jugador
        const casillas = document.querySelectorAll(".casilla");
        casillas.forEach(casilla => {
            if (casilla.textContent === "♙" || casilla.textContent === "♗" || casilla.textContent === "♘" || casilla.textContent === "♖" || casilla.textContent === "♕" || casilla.textContent === "♔") {
                piezasBlancas++;
            } else if (casilla.textContent === "♟" || casilla.textContent === "♝" || casilla.textContent === "♞" || casilla.textContent === "♜" || casilla.textContent === "♛" || casilla.textContent === "♚") {
                piezasNegras++;
            }
    });

    // Determinar al ganador
    if (piezasBlancas === 1 && piezasNegras > 0) {
        return "Negras";
    } else if (piezasNegras === 1 && piezasBlancas > 0) {
        return "Blancas";
    } else {
        return null;
    }
}


// Función para mostrar un mensaje con el ganador en la página web
function mostrarMensajeGanador(ganador) {
    document.getElementById("mensajeGanador").textContent = `¡${ganador} ganó el juego!`;
    document.getElementById("mensajeGanador").style.display = "block";
}

    // Función para validar si un movimiento es legal para una pieza en particular
    function esMovimientoLegal(pieza, origen, destino) {
        const filaOrigen = parseInt(origen.dataset.fila);
        const columnaOrigen = parseInt(origen.dataset.columna);
        const filaDestino = parseInt(destino.dataset.fila);
        const columnaDestino = parseInt(destino.dataset.columna);

        // Validar movimientos para el peón
        if (pieza === "♟" || pieza === "♙") {
            // Evitar que el peón pueda "comer" al rey
            if (destino.textContent === "♔" || destino.textContent === "♚") {
                return false;
            }
            // Movimiento válido para el peón blanco
            if (pieza === "♙" && filaDestino === filaOrigen - 1 && columnaDestino === columnaOrigen && destino.textContent === "") {
                return true;
            }
            // Movimiento válido para el primer movimiento del peón blanco
            if (pieza === "♙" && filaDestino === filaOrigen - 2 && columnaDestino === columnaOrigen && filaOrigen === 6) {
                return true;
            }
            // Movimiento válido para capturar en diagonal para el peón blanco
            if (pieza === "♙" && filaDestino === filaOrigen - 1 && (columnaDestino === columnaOrigen + 1 || columnaDestino === columnaOrigen - 1)) {
                return true;
            }
            // Movimiento válido para el peón negro
            if (pieza === "♟" && filaDestino === filaOrigen + 1 && columnaDestino === columnaOrigen && destino.textContent === "") {
                return true;
            }
            // Movimiento válido para el primer movimiento del peón negro
            if (pieza === "♟" && filaDestino === filaOrigen + 2 && columnaDestino === columnaOrigen && filaOrigen === 1) {
                return true;
            }
            // Movimiento válido para capturar en diagonal para el peón negro
            if (pieza === "♟" && filaDestino === filaOrigen + 1 && (columnaDestino === columnaOrigen + 1 || columnaDestino === columnaOrigen - 1)) {
                return true;
            }
        }
        if (pieza === "♛" || pieza === "♕") {
            // Evitar que la dama pueda "comer" al rey
            if (destino.textContent === "♔" || destino.textContent === "♚") {
                return false;
            }
            // Movimiento horizontal o vertical
            if (filaOrigen === filaDestino || columnaOrigen === columnaDestino) {
                return true;
            }
            // Movimiento en diagonal
            if (Math.abs(filaDestino - filaOrigen) === Math.abs(columnaDestino - columnaOrigen)) {
                return true;
            }
        }
        // Validar movimientos para el rey
        if (pieza === "♚" || pieza === "♔") {
            // Movimiento horizontal o vertical de una casilla
            if (Math.abs(filaDestino - filaOrigen) <= 1 && Math.abs(columnaDestino - columnaOrigen) <= 1) {
                return true;
            }
        }
        // Validar movimientos para el alfil
        if (pieza === "♝" || pieza === "♗") {
            // Evitar que el alfil pueda "comer" al rey
            if (destino.textContent === "♔" || destino.textContent === "♚") {
                return false;
            }
            // Movimiento en diagonal
            if (Math.abs(filaDestino - filaOrigen) === Math.abs(columnaDestino - columnaOrigen)) {
                return true;
            }
        }
        // Validar movimientos para el caballo
        if (pieza === "♞" || pieza === "♘") {
            const distanciaVertical = Math.abs(filaDestino - filaOrigen);
            const distanciaHorizontal = Math.abs(columnaDestino - columnaOrigen);
        
            // Movimiento en forma de "L"
            if ((distanciaVertical === 2 && distanciaHorizontal === 1) || (distanciaVertical === 1 && distanciaHorizontal === 2)) {
                // Evitar que el caballo pueda "comer" al rey
                if (destino.textContent === "♔" || destino.textContent === "♚") {
                    return false;
                }
                return true;
            }
        }
        // Validar movimientos para la torre
        if (pieza === "♖" || pieza === "♜") {
            // Evitar que la torre pueda "comer" al rey
            if (destino.textContent === "♔" || destino.textContent === "♚") {
                return false;
            }
            // Movimiento horizontal o vertical
            if (filaOrigen === filaDestino || columnaOrigen === columnaDestino) {
                return true;
            }
        }

        // Agrega más validaciones para otras piezas aquí

        // Si ninguna regla coincide, el movimiento no es legal
        return false;
    }

    // Función para verificar si el rey está en jaque
    function reyEnJaque(rey) {
        // Verificar si el rey está en jaque
        if (reyEnJaqueSimple(rey)) {
            // Si el rey está en jaque, verificar si puede escapar del jaque
            if (!reyPuedeEscaparDeJaque(rey)) {
                console.log("¡Jaquemate!");
                return true;
            }
            console.log("El rey está en jaque");
            return true;
        }
        return false;
    }

    // Función para verificar si el rey está en jaque debido a la amenaza de una pieza específica
    function reyEnJaqueSimple(rey) {
        const filaRey = parseInt(rey.dataset.fila);
        const columnaRey = parseInt(rey.dataset.columna);

        // Obtener todas las casillas del tablero
        const casillas = document.querySelectorAll(".casilla");

        // Iterar sobre todas las casillas para verificar si alguna de ellas amenaza al rey
        for (const casilla of casillas) {
            const filaPieza = parseInt(casilla.dataset.fila);
            const columnaPieza = parseInt(casilla.dataset.columna);

            // Verificar si la pieza puede moverse a la posición del rey
            if (esMovimientoLegal(casilla.textContent, casilla, rey)) {
                return true;
            }
        }

        // Si ninguna pieza puede moverse al rey, el rey no está en jaque
        return false;
    }

    // Función para verificar si el rey puede moverse a una casilla sin estar en jaque
    function reyPuedeEscaparDeJaque(rey) {
        const filaRey = parseInt(rey.dataset.fila);
        const columnaRey = parseInt(rey.dataset.columna);

        // Iterar sobre todas las casillas del tablero
        for (let filaDestino = 0; filaDestino < 8; filaDestino++) {
            for (let columnaDestino = 0; columnaDestino < 8; columnaDestino++) {
                // Obtener la pieza en la casilla de destino (si existe)
                const casillaDestino = document.querySelector(`[data-fila="${filaDestino}"][data-columna="${columnaDestino}"]`);
                const piezaDestino = casillaDestino ? casillaDestino.textContent : "";

                // Guardar temporalmente el contenido original de las casillas de origen y destino
                const contenidoCasillaOrigen = rey.textContent;
                const contenidoCasillaDestino = casillaDestino ? casillaDestino.textContent : "";

                // Realizar el movimiento temporalmente
                rey.textContent = "";
                if (casillaDestino) {
                    casillaDestino.textContent = contenidoCasillaOrigen;
                }

                // Verificar si el rey está en jaque después del movimiento
                const enJaqueDespues = reyEnJaque(rey);

                // Revertir el movimiento temporalmente
                rey.textContent = contenidoCasillaOrigen;
                if (casillaDestino) {
                    casillaDestino.textContent = contenidoCasillaDestino;
                }

                // Si el movimiento deja al rey en jaque, continuar con la siguiente casilla de destino
                if (enJaqueDespues) {
                    continue;
                }

                // Verificar si el movimiento pone al rey en jaque por la pieza que lo está amenazando
                if (piezaQueAmenazaAlRey(rey, casillaDestino)) {
                    continue;
                }

                // Si el movimiento no deja al rey en jaque y no lo pone en jaque por la pieza que lo amenaza, devolver true
                return true;
            }
        }

        // Si ninguna casilla es segura para el rey, devolver false
        return false;
    }

    // Función para verificar si el movimiento del rey pone al rey en jaque por parte de la pieza que lo está amenazando
    function piezaQueAmenazaAlRey(rey, casillaDestino) {
        // Obtener la pieza que amenaza al rey
        const piezaAmenazante = obtenerPiezaAmenazante(rey);

        // Si no hay pieza amenazante, devolver false
        if (!piezaAmenazante) {
            return false;
        }

        // Verificar si el movimiento del rey pone al rey en jaque por parte de la pieza amenazante
        if (esMovimientoLegal(piezaAmenazante.textContent, piezaAmenazante, casillaDestino)) {
            return true;
        }

        return false;
    }

    // Función para obtener la pieza que amenaza al rey
    function obtenerPiezaAmenazante(rey) {
        const filaRey = parseInt(rey.dataset.fila);
        const columnaRey = parseInt(rey.dataset.columna);

        // Obtener todas las casillas del tablero
        const casillas = document.querySelectorAll(".casilla");

        // Iterar sobre todas las casillas para encontrar la pieza que amenaza al rey
        for (const casilla of casillas) {
            const filaPieza = parseInt(casilla.dataset.fila);
            const columnaPieza = parseInt(casilla.dataset.columna);

            // Verificar si la pieza puede moverse a la posición del rey
            if (esMovimientoLegal(casilla.textContent, casilla, rey)) {
                return casilla;
            }
        }

        // Si ninguna pieza puede moverse al rey, no hay pieza amenazante
        return null;
    }
});