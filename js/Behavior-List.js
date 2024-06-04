document.addEventListener("DOMContentLoaded", function() {
    // INTERFACE DE SCROLL (affiche les infos de chaque projets lorsque leur titre et aligné horizontalement avec le menu lors du scroll)
    const ProjLst = document.getElementById('proj-lst');
    const liElements = document.querySelectorAll('#proj-lst li');
    const ovrBox = document.getElementById('ovr-box');

    // Fonction pour vérifier si un élément entre en collision avec #ovr-box
    const isColliding = function(element) {
        const elementRect = element.getBoundingClientRect();
        const boxRect = ovrBox.getBoundingClientRect();
        const tolerance = 5; // Marge de tolérance en pixels

        return (
            elementRect.top < boxRect.bottom - tolerance &&
            elementRect.bottom > boxRect.top + tolerance &&
            elementRect.left < boxRect.right - tolerance &&
            elementRect.right > boxRect.left + tolerance
        );
    };

    // Variable pour garder la trace de l'ID actif précédent
    let previousActiveId = null;
    let intervalId = null;
    const IntTime = 1500;

    // Fonction pour mettre à jour les classes .actv de tout les éléments comportant la même ID que l'élément en gras
    const updateActiveState = function() {
        let currentActiveId = null;
        liElements.forEach(function(li) {
            const liId = li.id;
            const correspondingElements = liId ? document.querySelectorAll('#' + liId) : [];
            correspondingElements.forEach(function(element) {
                if (isColliding(li)) {
                    element.classList.add('actv');
                    currentActiveId = liId; // Met à jour l'ID actif actuel
                } else {
                    element.classList.remove('actv');
                }
            });
        });

        // Si l'ID actif a changé et n'est pas null, réinitialiser l'intervalle
        if (currentActiveId && currentActiveId !== previousActiveId) {
            previousActiveId = currentActiveId;

            // Réinitialise l'intervalle
            if (intervalId) {
                clearInterval(intervalId);
            }
            intervalId = setInterval(nextImage, IntTime); // Crée un nouvel intervalle
        }
    };

    // Ajoute un gestionnaire d'événements de défilement pour mettre à jour les classes lorsque l'utilisateur fait défiler la page
    ProjLst.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateActiveState);
    });

    /* --------------------------------------------------------- */

    // DÉFILEMENT RÉGULIER DES IMAGES DE LA SECTION INFOS AFFICHÉE

    const images = document.querySelectorAll('.proj-lst-infos .image');

    // Fonction pour cacher toutes les images sauf celle avec l'index spécifié
    function showImage(indexToShow) {
        images.forEach(image => {
            if (parseInt(image.dataset.index) === indexToShow) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    }

    let currentIndex = 1;
    let imageCounter = 0;

    // Fonction pour passer à l'image suivante
    function nextImage() {
        currentIndex++;
        imageCounter++;

        if (currentIndex > images.length) {
            currentIndex = 1;
        }
        if (imageCounter === 3) {
            currentIndex = 1;
            imageCounter = 0;
        }

        showImage(currentIndex);
    }

    // Appel de la fonction pour afficher la première image au chargement de la page
    showImage(currentIndex);

    // Appel de la fonction nextImage toutes les 1500 millisecondes pour faire défiler les images
    intervalId = setInterval(nextImage, IntTime); // Initialiser l'intervalle au chargement de la page
    window.requestAnimationFrame(updateActiveState);

    /* --------------------------------------------------- */

    //GESTION DU SCROLL DE LISTE

    var projList = document.getElementById('proj-lst');
    var articles = document.querySelectorAll('article');

    // Variable pour stocker la position initiale du touch
    var startY;

    // Ajoute un écouteur d'événement de scroll à chaque "article" pour les événements de souris
    articles.forEach(function(article) {
        article.addEventListener('wheel', function(event) {
            event.preventDefault();
            
            var delta = event.deltaY * .2;
            projList.scrollTop += delta;
        }, { passive: false });

        article.addEventListener('touchstart', function(event) {
            startY = event.touches[0].pageY;
        });

        article.addEventListener('touchmove', function(event) {
            event.preventDefault();
            var deltaY = startY - event.touches[0].pageY;
            startY = event.touches[0].pageY;
            projList.scrollTop += deltaY;
        });
    });
    document.addEventListener('wheel', function(event) {
        event.preventDefault();
        
        var delta = event.deltaY * .2;
        projList.scrollTop += delta;
    }, { passive: false });
});