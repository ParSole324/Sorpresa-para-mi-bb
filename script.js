document.addEventListener('DOMContentLoaded', () => {
    const pasos = document.querySelectorAll('.paso');
    const btnSi = document.getElementById('btn-si');
    const btnNo = document.getElementById('btn-no');
    const musicaFondo = document.getElementById('musica-fondo');

    let pasoActual = 0;
    let fontSizeSi = 1.2;
    let paddingSi = [15, 30];
    let musicaIniciada = false;
    
    // --- NUEVO: Lógica del contador ---
    let clicksEnNo = 0;
    const LIMITE_CLICKS_NO = 6; // Ella puede decir "No" 6 veces antes del final

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
        if (!musicaIniciada) {
            musicaFondo.play().catch(error => {
                console.log("El usuario debe interactuar con la página primero para reproducir audio.");
            });
            musicaIniciada = true;
        }
        const idDelPasoActual = pasos[pasoActual].id;
        if (e.target.tagName !== 'BUTTON') {
            if (idDelPasoActual !== 'pregunta-final' && idDelPasoActual !== 'mensaje-final') {
                mostrarSiguientePaso();
            }
        }
    });

    // --- LÓGICA DEL BOTÓN "NO" ACTUALIZADA ---
    btnNo.addEventListener('click', () => {
        clicksEnNo++;
        
        // Mientras no haya alcanzado el límite, el botón SÍ solo crece
        if (clicksEnNo < LIMITE_CLICKS_NO) {
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
                "Mi corazón dice que sí", "¿Última palabra?"
            ];
            let nuevaFrase = frasesNo[Math.floor(Math.random() * frasesNo.length)];
            while (nuevaFrase === btnNo.innerText) {
                nuevaFrase = frasesNo[Math.floor(Math.random() * frasesNo.length)];
            }
            btnNo.innerText = nuevaFrase;
        
        // Al llegar al límite, se activa el final
        } else {
            // Hacemos desaparecer el botón NO
            btnNo.classList.add('desaparecer');

            // Hacemos que el botón SÍ ocupe toda la pantalla
            btnSi.classList.add('btn-si-final');
        }
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