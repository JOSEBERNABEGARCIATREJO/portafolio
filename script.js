


/* =========================
   CARRUSEL
========================= */

const slides = document.querySelectorAll(".carrusel .slide");
const indicadores = document.querySelectorAll(".carrusel .indicador");

const botonAnterior = document.querySelector(".carrusel-btn.anterior");
const botonSiguiente = document.querySelector(".carrusel-btn.siguiente");

let slideActual = 0;
let intervalo;


/* =========================
   MOSTRAR SLIDE
========================= */

function mostrarSlide(numero) {

    // Quitar la clase activo de todos los slides
    slides.forEach((slide) => {
        slide.classList.remove("activo");
    });

    // Quitar activo de todos los indicadores
    indicadores.forEach((indicador) => {
        indicador.classList.remove("activo");
    });


    // Mostrar el slide seleccionado
    slides[numero].classList.add("activo");

    // Activar indicador correspondiente
    if (indicadores[numero]) {
        indicadores[numero].classList.add("activo");
    }


    // Pausar todos los videos
    slides.forEach((slide) => {

        const video = slide.querySelector("video");

        if (video) {
            video.pause();
            video.currentTime = 0;
        }

    });


    // Si el slide actual tiene video, reproducirlo
    const videoActual = slides[numero].querySelector("video");

    if (videoActual) {

        videoActual.currentTime = 0;

        videoActual.play().catch(() => {
            console.log("El navegador bloqueó la reproducción automática.");
        });

    }

}


/* =========================
   SIGUIENTE SLIDE
========================= */

function siguienteSlide() {

    slideActual++;

    if (slideActual >= slides.length) {
        slideActual = 0;
    }

    mostrarSlide(slideActual);

}


/* =========================
   SLIDE ANTERIOR
========================= */

function anteriorSlide() {

    slideActual--;

    if (slideActual < 0) {
        slideActual = slides.length - 1;
    }

    mostrarSlide(slideActual);

}


/* =========================
   BOTÓN SIGUIENTE
========================= */

botonSiguiente.addEventListener("click", () => {

    siguienteSlide();

    reiniciarTemporizador();

});


/* =========================
   BOTÓN ANTERIOR
========================= */

botonAnterior.addEventListener("click", () => {

    anteriorSlide();

    reiniciarTemporizador();

});


/* =========================
   INDICADORES
========================= */

indicadores.forEach((indicador, indice) => {

    indicador.addEventListener("click", () => {

        slideActual = indice;

        mostrarSlide(slideActual);

        reiniciarTemporizador();

    });

});


/* =========================
   CAMBIO AUTOMÁTICO
========================= */

function iniciarTemporizador() {

    intervalo = setInterval(() => {

        siguienteSlide();

    }, 4000);

}


/* =========================
   REINICIAR TEMPORIZADOR
========================= */

function reiniciarTemporizador() {

    clearInterval(intervalo);

    iniciarTemporizador();

}


/* =========================
   INICIAR CARRUSEL
========================= */

mostrarSlide(slideActual);

iniciarTemporizador();

