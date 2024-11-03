// Function to detect and return the default language based on browser language
function detectLanguage() {
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    return savedLang; // Use saved language if available
  }

  // Detect browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('tr')) {
    return 'tr'; // Default to Turkish for Turkish-speaking browsers
  } else {
    return 'en'; // Default to English otherwise
  }
}

// Function to load and apply language settings
function setLanguage(lang) {
  fetch(`Language/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      // Update all elements with data-translate attributes
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (data[key]) {
          element.innerText = data[key];
        }
      });

      // Update the dropdown icon based on selected language
      const flagIcon = lang === 'tr' ? 'Images/flag-tr.svg' : 'Images/flag-en.svg';
      document.getElementById('selectedFlag').src = flagIcon;
    })
    .catch(error => console.error('Error loading language file:', error));
  localStorage.setItem('language', lang);
}

// Initialize language on page load
const defaultLang = detectLanguage();
setLanguage(defaultLang);