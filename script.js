document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let isAnimating = false;

    // Fonction pour afficher une slide spécifique
    function showSlide(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[index];

        // Gérer la slide sortante
        currentSlide.classList.remove('active');
        if (direction === 'next') {
            currentSlide.classList.add('leaving-up'); // Sort par le haut
        }

        // Préparer la slide entrante
        if (direction === 'next') {
            nextSlide.style.transform = 'translateY(100%)'; // Commence du bas
        }
        nextSlide.style.opacity = '0'; // Cache la slide entrante avant l'animation

        // Attendre que la transition de sortie commence (pour ne pas perturber l'animation d'entrée)
        setTimeout(() => {
            nextSlide.classList.add('active'); // Active la nouvelle slide
            nextSlide.style.transform = 'translateY(0%)'; // Anime vers le centre
            nextSlide.style.opacity = '1'; // Anime vers l'opacité 1
            
            // Écouter la fin de la transition de la slide entrante (la plus longue)
            nextSlide.addEventListener('transitionend', function handler() {
                // Nettoyer les classes des slides précédentes
                currentSlide.classList.remove('leaving-up', 'leaving-down');
                currentSlide.style.opacity = '0';
                currentSlide.style.transform = 'translateY(100%)'; // Réinitialise pour une future entrée par le bas

                slides.forEach((slide, idx) => {
                    if (idx !== index) {
                        slide.classList.remove('active', 'leaving-up', 'leaving-down');
                        slide.style.opacity = '0';
                        slide.style.transform = 'translateY(100%)';
                    }
                });
                
                currentIndex = index;
                isAnimating = false;
                nextSlide.removeEventListener('transitionend', handler);
            }, { once: true });
        }, 10); // Petit délai pour laisser le navigateur appliquer les styles de sortie
    }

    // Gérer le clic "Suivant"
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        showSlide(nextIndex, 'next');
    });


    // Initialiser l'affichage de la première slide au chargement
    slides[currentIndex].classList.add('active');
    slides[currentIndex].style.opacity = '1';
    slides[currentIndex].style.transform = 'translateY(0%)';

    // Assurez-vous que les autres slides sont bien cachées au démarrage
    slides.forEach((slide, index) => {
        if (index !== currentIndex) {
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(100%)';
        }
    });
});

const svgPath = document.querySelectorAll('.path');

const svgText = anime({
  targets: svgPath,
  loop: true,
  direction: 'alternate',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 700,
  delay: (el, i) => { return i * 500 }
});