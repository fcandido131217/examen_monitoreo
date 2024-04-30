
let ultimoDatoAnterior = null; 
var cortinasAbiertas = false;

// Llamar a recibirDatos una vez al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    recibirPrimerosDatos();
});


async function recibirPrimerosDatos() {
    try {
        const opciones = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const url = 'https://662f217a43b6a7dce30e7873.mockapi.io/orden';
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('Error en la solicitud GET a la URL');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        datosRecibidos = data;

        // Ejecutar la acción según el valor de focoRecamara
        if (data.focoRecamara === "0") {
            document.getElementById('focoRecamara').src = 'imagen/recamaraoff.png';
        } else if (data.focoRecamara === "1") {
            document.getElementById('focoRecamara').src = 'imagen/recamaraon.png';
        }
        if (data.focoSala === "0") {
            document.getElementById('focoSala').src = 'imagen/salaoff.png';
        } else if (data.focoSala === "1") {
            document.getElementById('focoSala').src = 'imagen/salaon.png';
        }

        if (data.focoJardin === "0") {
            var elementos = document.getElementsByClassName('jardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/jardinoff.png';
            }
        } else if (data.focoJardin === "1") {
            var elementos = document.getElementsByClassName('jardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/jardinon.png';
            }
        }

        if (data.ventilador === "0") {
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imagen/ventiladoroff.png';
        } else if (data.ventilador === "1") {
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imagen/ventiladoron.gif';
        }

        if (data.cortinas === "0") {
            cortinasAbiertas = false;
            var elementos = document.getElementsByClassName('cortinas');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/cortinaoff.png';
            }
        } else if (data.cortinas === "1") {
            cortinasAbiertas = true;
            var elementos = document.getElementsByClassName('cortinas');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/cortinaon.png';
            }

        }

        if (data.alarma === "0") {
            document.getElementById('alarma').src = 'imagen/alarmaoff.png';
        } else if (data.alarma === "1") {
            document.getElementById('alarma').src = 'imagen/alarmaon.png';
        }

        if (data.camaras === "0") {
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/camaraoff.png';
            }
        } else if (data.camaras === "1") {
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/camaraon.png';
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


setInterval(recibirDatos, 2000);

async function recibirDatos() {
    try {
        // Opciones de la solicitud
        const opciones = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const url = 'https://662f217a43b6a7dce30e7873.mockapi.io/orden_casa';
        // Recibir los datos de la URL proporcionada
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('Error en la solicitud GET a la URL');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        // Arreglo
        datosRecibidos = data;
        // Último dígito del arreglo
        const ultimoDato = datosRecibidos.pop();
        console.log('Último dato:', ultimoDato);

        // Verifica si el último dato ha cambiado
        if (!esIgual(ultimoDato, ultimoDatoAnterior)) {
            // Sustitución en los párrafos
      
           
            manejarAccion(ultimoDato.orden);
            ultimoDatoAnterior = ultimoDato;
        }

        
        

    } catch (error) {
        console.error('Error:', error);
    }
}

function esIgual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
}

function manejarAccion(ultimoDato) {
    //switch (ultimoDato.instruccion.toLowerCase()) {
    switch (ultimoDato) {
        case 'enciende la luz de la recámara':
            document.getElementById('focoRecamara').src = 'imagen/recamaraon.png';
            break;
        case 'apaga la luz de la recámara':
            document.getElementById('focoRecamara').src = 'imagen/recamaraoff.png';
            break;
        case 'enciende la luz de la sala':
            document.getElementById('focoSala').src = 'imagen/salaon.png';
            break;
        case 'apaga la luz de la sala':
            document.getElementById('focoSala').src = 'imagen/salaoff.png';
            break;
        case 'enciende las luces del jardín':
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/jardinon.png';
            }
            break;
        case 'apaga las luces del jardín':
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/jardinoff.png';
            }
            break;
        case 'enciende el ventilador':
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imagen/ventiladoron.gif';

            break;
        case 'apaga el ventilador':
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imagen/ventiladoroff.png';
            break;
        case 'abre las cortinas':
            if (!cortinasAbiertas){
                cambiarImagenCortinas();
                cortinasAbiertas = true;
            }
            break;
        case 'cierra las cortinas':
            if (cortinasAbiertas){
                cortinasAbiertas = false;
                cierraImagenCortinas();
            }
            break;
        case 'enciende las cámaras de seguridad':
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/camaraon.png';
            }
            break;
        case 'apaga las cámaras de seguridad':
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imagen/camaraoff.png';
            }
            break;
        case 'enciende la alarma':
            document.getElementById('alarmaEncendida').play();     
            document.getElementById('alarma').src = 'imagen/alarmaon.png';
            break;
        case 'apaga la alarma':
            document.getElementById('alarma').src = 'imagen/alarmaoff.png';
            document.getElementById('sonidoApagado').play(); 
            break;
        default:
            // Instrucción no reconocida
            console.log('Instrucción no reconocida');
    }
}

//var cortinasAbiertas = false;

function cambiarImagenCortinas() {
    // Obtener todas las imágenes de cortinas
    var elementos = document.getElementsByClassName('cortinas');

    // Iterar sobre cada imagen de cortinas
    for (var i = 0; i < elementos.length; i++) {
        // Utilizamos una función de cierre para mantener el contexto de la variable cortina
        (function (cortina) {
            // Verificar si la imagen actual ya ha mostrado el gif de abrirCortinas.gif
            if (!cortinasAbiertas) {
                // Mostrar abrirCortinas.gif si aún no se ha mostrado
                cortina.src = 'imagen/abrircortina.gif';

                // Cambiar a la imagen cortinasAbiertas.png después de 1 segundo
                setTimeout(function () {
                    cortina.src = 'imagen/cortinaon.png';
                }, 1016); // 1000 milisegundos = 1 segundo
            }
        })(elementos[i]); // Pasamos la imagen actual como argumento a la función de cierre
    }
}



var cortinasCerradas = false;

function cierraImagenCortinas() {
    // Obtener todas las imágenes de cortinas
    var elementos = document.getElementsByClassName('cortinas');

    // Iterar sobre cada imagen de cortinas
    for (var i = 0; i < elementos.length; i++) {
        // Utilizamos una función de cierre para mantener el contexto de la variable cortina
        (function (cortina) {
            // Verificar si la imagen actual ya ha mostrado el gif de abrirCortinas.gif
            if (!cortinasCerradas) {
                // Mostrar abrirCortinas.gif si aún no se ha mostrado
                cortina.src = 'imagen/cerrarcortina.gif';

                // Cambiar a la imagen cortinasAbiertas.png después de 1 segundo
                setTimeout(function () {
                    cortina.src = 'imagen/cortinaoff.png';
                }, 1016); // 1000 milisegundos = 1 segundo
            }
        })(elementos[i]); // Pasamos la imagen actual como argumento a la función de cierre
    }
}


