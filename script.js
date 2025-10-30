document.addEventListener('DOMContentLoaded', () => {
    const pasos = document.querySelectorAll('.paso');
    const btnSi = document.getElementById('btn-si');
    const btnNo = document.getElementById('btn-no');
    
    // --- NUEVO: Seleccionamos el elemento de audio ---
    const musicaFondo = document.getElementById('musica-fondo');

    let pasoActual = 0;
    let fontSizeSi = 1.2;
    let paddingSi = [15, 30];
    
    // --- NUEVO: Una bandera para saber si la música ya empezó ---
    let musicaIniciada = false;

    function mostrarSiguientePaso() {
        if (pasoActual < pasos.length - 1) {
            pasos[pasoActual].classList.remove('activo');
            pasos[pasoActual].classList.add('oculto');
            pasoActual++;
            pasos[pasoActual].classList.remove('oculto');
            pasos[pasoActual].classList.add('activo');
        }
    }

    document.addEventListener('click', (e) => {
        // --- NUEVO: Lógica para iniciar la música con el primer clic ---
        if (!musicaIniciada) {
            // Intentamos reproducir la música y manejamos posibles errores
            musicaFondo.play().catch(error => {
                console.log("El usuario debe interactuar con la página primero para reproducir audio.");
            });
            musicaIniciada = true; // Marcamos que la música ya ha intentado empezar
        }

        const idDelPasoActual = pasos[pasoActual].id;
        if (e.target.tagName !== 'BUTTON') {
            if (idDelPasoActual !== 'pregunta-final' && idDelPasoActual !== 'mensaje-final') {
                mostrarSiguientePaso();
            }
        }
    });

    btnNo.addEventListener('click', () => {
        fontSizeSi += 0.5;
        paddingSi[0] += 5;
        paddingSi[1] += 10;
        
        btnSi.style.fontSize = `${fontSizeSi}em`;
        btnSi.style.padding = `${paddingSi[0]}px ${paddingSi[1]}px`;

        btnNo.classList.add('shake');
        setTimeout(() => {
            btnNo.classList.remove('shake');
        }, 400);

        const frasesNo = [
            "¿Segura?", "Inténtalo de nuevo", "Respuesta equivocada",
            "No es una opción", "¡Casi!", "Sigue intentando",
            "Creo que te equivocaste", "Mi corazón dice que sí"
        ];
        
        let nuevaFrase = frasesNo[Math.floor(Math.random() * frasesNo.length)];
        while (nuevaFrase === btnNo.innerText) {
            nuevaFrase = frasesNo[Math.floor(Math.random() * frasesNo.length)];
        }
        btnNo.innerText = nuevaFrase;
    });
    
    btnSi.addEventListener('click', () => {
        const preguntaFinal = document.getElementById('pregunta-final');
        const mensajeFinal = document.getElementById('mensaje-final');
        
        preguntaFinal.classList.add('oculto');
        preguntaFinal.classList.remove('activo');

        mensajeFinal.classList.remove('oculto');
        mensajeFinal.classList.add('activo');
    });
});