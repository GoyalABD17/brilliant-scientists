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