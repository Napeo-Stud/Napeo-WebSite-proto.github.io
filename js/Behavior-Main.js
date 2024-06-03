document.addEventListener("DOMContentLoaded", function() {
    //Détermine la var RGB de text-color pour la couleur de la grille de fond
    function hexToRgb(hex) {
        hex = hex.replace("#", "");
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return r + ", " + g + ", " + b;
    }

    // Convert and set the RGB values for the CSS variables
    let root = document.documentElement;
    let backgroundColorHex = getComputedStyle(root).getPropertyValue('--text-color').trim();
    let backgroundColorRgb = hexToRgb(backgroundColorHex);

    root.style.setProperty('--text-color-rgb', backgroundColorRgb);
    /* -------------------------------------- */

    //Détermine le comportement du MenuToggle
    const menuToggle = document.getElementById("toggle");
    const nav = document.getElementById("nav");
    const ClicZone = document.getElementById("ClicZone");

    menuToggle.addEventListener("click", (event) => {
        nav.classList.toggle("show");
        event.stopPropagation(); // Empêche la propagation de l'événement au document
    });

    // Gestionnaire d'événements pour la fermeture au clic en dehors de la navbar
    document.addEventListener("click", (event) => {
        if (nav.classList.contains("show") && !ClicZone.contains(event.target)) {
            nav.classList.remove("show");
        }
    });

    /* -------------------------------------- */
    
    //Détermine le comportement de la LangSwitch
    const SwitchBtns = document.querySelectorAll('.Switch-Btn');
    let currentLang = localStorage.getItem('preferredLang') || 'fr';
    const enElements = document.querySelectorAll('.en');
    const frElements = document.querySelectorAll('.fr');
    const btnCircles = document.querySelectorAll('.BtnCircle');

    function setLanguage(lang) {
        if (lang === 'fr') {
            enElements.forEach(el => el.style.display = 'none');
            frElements.forEach(el => el.style.display = 'block');
            btnCircles.forEach(btnCircle => btnCircle.classList.remove('translate'));
        } else {
            enElements.forEach(el => el.style.display = 'block');
            frElements.forEach(el => el.style.display = 'none');
            btnCircles.forEach(btnCircle => btnCircle.classList.add('translate'));
        }
        localStorage.setItem('preferredLang', lang);
    }

    setLanguage(currentLang);

    SwitchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'fr' : 'en';
            setLanguage(currentLang);
        });
    });

    /* -------------------------------------- */
    //Établie de manière dynamique les images par défault

    var elements = document.querySelectorAll('article.dflt-win');

    elements.forEach(function (element) {
        
        var img = element.querySelector('figure img');

        if (img) {
            // Crée un nouvel objet Image pour obtenir les dimensions réelles
            var image = new Image();
            image.src = img.src;

            image.onload = function () {
                var width = image.naturalWidth;
                var height = image.naturalHeight;

                // Détermine l'orientation et assigne la classe appropriée
                if (width > height) {
                    element.classList.remove('dflt-win');
                    element.classList.add('hrztl-win');
                } else {
                    element.classList.remove('dflt-win');
                    element.classList.add('vrtcl-win');
                }
            };

            image.onerror = function () {
                console.error('Erreur lors du chargement de l\'image : ' + img.src);
            };
        } else {
            console.error('Aucune image trouvée dans l\'élément :', element);
        }
    });

    /* -------------------------------------- */
    
    //Détermine le comportement des Flèches de Passage
    var elements = document.getElementsByClassName("svg");
    var pageDiv = document.querySelector('.pages');

    var ScrollByArw = function() {
        var parent = this.parentElement.parentElement.parentElement;
        // Vérifier la largeur de l'écran
        if (window.innerWidth > 770) {
            // Faites défiler horizontalement par la largeur de l'écran
            pageDiv.scrollTo({
                    left: pageDiv.scrollLeft + parent.offsetWidth,
                    behavior: 'smooth'
            });
        } else {
            // Faites défiler verticalement par la hauteur de l'écran
            const windowHeight = window.innerHeight;
            window.scrollBy({
                top: window.scrollX + parent.offsetHeight + 16,
                behavior: 'smooth'
            });
        }
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', ScrollByArw, false);
    }
});

// Écoute les changements d'orientation
window.addEventListener("orientationchange", function() {
    // Réinitialise le scroll en définissant scrollTop à 0
    document.documentElement.scrollTop = 0;
});