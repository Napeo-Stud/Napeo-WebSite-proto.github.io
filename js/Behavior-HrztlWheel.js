document.addEventListener('DOMContentLoaded', () => {
    var pagDiv = document.querySelector('.pages');
    window.addEventListener('wheel', function(event) {
        // Vérifier si la largeur de la fenêtre est supérieure à 770px et si la hauteur est inférieure à 400px
        if (window.innerWidth > 770 || window.innerHeight < 400) {
            // Empêcher le défilement par défaut
            event.preventDefault();
            
            // Faire défiler horizontalement en fonction de la direction de la molette de la souris
            pagDiv.scrollBy({
                left: event.deltaY,
                behavior: 'auto'
            });
        }
    });
    
});
/* document.addEventListener('DOMContentLoaded', () => {
    var pagDiv = document.querySelector('.pages');
    var lastScrollTime = 0;
    var scrollInProgress = false;
    var scrollDistance = 0;

    // Paramètres modifiables
    const scrollDuration = 200; // Durée de l'animation en millisecondes
    const scrollFactor = 3; // Puissance du scroll

    window.addEventListener('wheel', function(event) {
        if (window.innerWidth > 770 || window.innerHeight < 400) {
            event.preventDefault();

            const currentTime = performance.now();
            const timeSinceLastScroll = currentTime - lastScrollTime;

            if (timeSinceLastScroll < 200 && scrollInProgress) {
                scrollDistance += event.deltaY * scrollFactor;
            } else {
                scrollDistance = event.deltaY * scrollFactor;
                smoothScroll(pagDiv, scrollDistance, scrollDuration);
            }

            lastScrollTime = currentTime;
        }
    });

    function smoothScroll(element, distance, duration) {
        const start = element.scrollLeft;
        const startTime = performance.now();
        scrollInProgress = true;

        function animateScroll(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            element.scrollLeft = start + distance * progress;

            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                scrollInProgress = false;
            }
        }

        requestAnimationFrame(animateScroll);
    }
});

 */



/* 
import LocomotiveScroll from './locomotive-scroll.min.js';
document.addEventListener("DOMContentLoaded", function() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#hrztl'),
        smooth: true,
        gestureDirection : horizontal
    });
}); */