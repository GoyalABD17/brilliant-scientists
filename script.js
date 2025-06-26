document.addEventListener("DOMContentLoaded", () => {
    const phrases = [
      "Exploring the Brilliant Minds..",
      "Understanding the Genius Within..",
      "Innovators Who Changed the World.."
    ];
    
    const textContainer = document.getElementById("typewriter-text");
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;            // Typing Speed
    const erasingSpeed = 40;            // Erasing Speed
    const delayBetweenPhrases = 3000; // 3s pause after typing

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        textContainer.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeLoop, 500); // short pause before typing next
        } else {
          setTimeout(typeLoop, erasingSpeed);
        }
      } else {
        textContainer.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeLoop, delayBetweenPhrases);
        } else {
          setTimeout(typeLoop, typingSpeed);
        }
      }
    }

    setTimeout(typeLoop, 2000); // 2 second initial delay
  });

//                                       YAHA SE SHURU HUI HAI CODING

  const cards = document.querySelectorAll('.scientist-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10; // adjust tilt intensity
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(800px) rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.2s ease';
    });
  });