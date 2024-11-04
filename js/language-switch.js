// Function to detect and return the default language based on browser language
function detectLanguage() {
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    return savedLang; // Use saved language if available
  }

  // Detect browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('tr')) {
    return 'tr'; // Turkish
  } else if (browserLang.startsWith('ar')) {
    return 'ar'; // Arabic
  } else {
    return 'en'; // Default to English
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

      // Set the appropriate flag based on language and browser region
      let flagIcon;
      let navbarClass = 'navbar-left-align'; // Default to left alignment
      if (lang === 'tr') {
        flagIcon = 'Images/flag-tr.svg';
        document.documentElement.setAttribute('dir', 'ltr'); // Set direction to left-to-right for Turkish
        navbarClass = 'navbar-left-align'; // Set navbar class for RTL
      } else if (lang === 'en') {
        flagIcon = 'Images/flag-en.svg';
        document.documentElement.setAttribute('dir', 'ltr'); // Set direction to left-to-right for English
        navbarClass = 'navbar-left-align'; // Set navbar class for RTL
      } else if (lang === 'ar') {
        // Determine the specific Arabic flag based on the browser language region
        const browserLang = navigator.language || navigator.languages[0];
        switch (browserLang) {
          case 'ar-AE': flagIcon = 'Images/flag-ae.svg'; break; // UAE flag
          case 'ar-SA': flagIcon = 'Images/flag-sa.svg'; break; // Saudi Arabia flag
          case 'ar-KW': flagIcon = 'Images/flag-kw.svg'; break; // Kuwait flag
          case 'ar-QA': flagIcon = 'Images/flag-qa.svg'; break; // Qatar flag
          default: flagIcon = 'Images/flag-ae.svg'; // Generic Arabic flag
        }
        document.documentElement.setAttribute('dir', 'rtl'); // Set direction to right-to-left for Arabic
        navbarClass = 'navbar-right-align'; // Set navbar class for RTL
      }

      // Ensure the flag element exists before setting its src
      const flagElement = document.getElementById('selectedFlag');
      if (flagElement) {
        flagElement.src = flagIcon;
      }

      // Update the navbar with the appropriate class
      const navbar = document.querySelector('.navbar-collapse');
      navbar.classList.remove('navbar-left-align', 'navbar-right-align');
      navbar.classList.add(navbarClass);
    })
    .catch(error => console.error('Error loading language file:', error));
  
  // Save the selected language to localStorage
  localStorage.setItem('language', lang);
}

// Initialize language on page load
const defaultLang = detectLanguage();
setLanguage(defaultLang);