document.addEventListener("DOMContentLoaded", () => {
    const phrases = [
      "Exploring the Brilliant Minds..",
      "Life, Stories and Discoveries..",
      "Exploring History’s Smartest Minds..",
      "Discover, Learn, Be Inspired.."
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

  const cards = document.querySelectorAll('.scientist-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = card.offsetHeight / 2; // Use offsetHeight for actual height
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

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const scientistCards = document.querySelectorAll('.scientist-card');
const searchResultsContainer = document.getElementById('searchResults');

// Collect all scientist names for suggestions
const scientistNames = Array.from(scientistCards).map(card =>
    card.querySelector('h2').textContent
);

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('input', handleSearchInput); // Use 'input' for real-time suggestions
searchInput.addEventListener('focus', handleSearchInput); // Show suggestions on focus
searchInput.addEventListener('blur', () => {
    // Hide suggestions after a short delay to allow click on suggestion
    setTimeout(() => {
        searchResultsContainer.classList.remove('active');
        searchResultsContainer.innerHTML = ''; // Clear suggestions
    }, 150);
});
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
        searchResultsContainer.classList.remove('active'); // Hide suggestions on Enter
        searchResultsContainer.innerHTML = ''; // Clear suggestions
    }
});


function handleSearchInput() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    searchResultsContainer.innerHTML = ''; // Clear previous suggestions

    if (searchTerm.length === 0) {
        searchResultsContainer.classList.remove('active');
        return;
    }

    const matchingNames = scientistNames.filter(name =>
        name.toLowerCase().includes(searchTerm)
    );

    if (matchingNames.length > 0) {
        matchingNames.forEach(name => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('search-result-item');
            suggestionItem.textContent = name;
            suggestionItem.addEventListener('mousedown', (event) => { // Use mousedown to prevent blur from hiding it
                event.preventDefault(); // Prevent default mousedown behavior which might blur the input
                searchInput.value = name;
                searchResultsContainer.classList.remove('active');
                searchResultsContainer.innerHTML = '';
                searchInput.focus(); // Keep focus on the search input
            });
            searchResultsContainer.appendChild(suggestionItem);
        });
        searchResultsContainer.classList.add('active');
    } else {
        searchResultsContainer.classList.remove('active');
    }
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let foundCard = null; // Variable to store the found card

    scientistCards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const paragraph = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || paragraph.includes(searchTerm)) {
            card.style.display = 'block'; // Ensure card is visible
            card.classList.remove('hidden');
            foundCard = card; // Store the card if found

            // Re-apply AOS animation
            const originalAOS = card.getAttribute('data-aos');
            const originalDelay = card.getAttribute('data-aos-delay');

            card.removeAttribute('data-aos');
            card.removeAttribute('data-aos-delay');
            void card.offsetWidth; // Trigger reflow to reset animation
            card.setAttribute('data-aos', originalAOS || 'zoom-in'); // Default to zoom-in if none
            if (originalDelay) {
                card.setAttribute('data-aos-delay', originalDelay);
            }

            AOS.refreshHard(); // Hard refresh to detect new elements/attributes
        } else {
            card.style.display = 'none'; // Hide the card
            card.classList.add('hidden'); // Add hidden class for CSS styling
        }
    });

    // Scroll to the found card if one was identified
    if (foundCard) {
        foundCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/*                                  YAHA SE NAYA CODE SHURU HAI                                         */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContainer = document.getElementById("main-container");
  const openBtn = document.querySelector(".open-btn");

  if (!sidebar.classList.contains("open")) {
    // Open sidebar
    sidebar.classList.add("open");
    mainContainer.classList.add("shifted");
    openBtn.classList.add("hide");
  } else {
    // Close sidebar
    sidebar.classList.remove("open");
    mainContainer.classList.remove("shifted");

    // Delay re-showing with fade-in
    setTimeout(() => {
      openBtn.classList.remove("hide");
      openBtn.classList.add("fade-in");

      // Remove fade-in class after animation ends (optional cleanup)
      setTimeout(() => {
        openBtn.classList.remove("fade-in");
      }, 400);
    }, 700); // Match sidebar transition time
  }
}