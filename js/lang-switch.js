// JavaScript: Language switcher for ESG HR Consulting website
let currentTranslations = {};
let currentLang = "ar"; // Default language is Arabic

document.addEventListener("DOMContentLoaded", function () {
  const langEnButton = document.getElementById("lang-en");
  const langArButton = document.getElementById("lang-ar");

  // Head element for dynamically adding/removing CSS
  const headElement = document.querySelector("head");
  let rtlStylesheet;

  // Load translations dynamically based on selected language
  async function loadLanguage(lang) {
    try {
      const response = await fetch(`translations/${lang}.json`);
      const translations = await response.json();
      
      // Store current translations and language globally
      currentTranslations = translations;
      currentLang = lang;
      localStorage.setItem("preferredLanguage", lang);

      // Apply translations
      applyTranslations(translations);

      // Update page title and meta tags
      if (translations.site_title) {
        document.title = translations.site_title;
      }
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && translations.site_description) {
        metaDescription.setAttribute("content", translations.site_description);
      }

      // Update HTML lang attribute
      document.documentElement.setAttribute("lang", lang);

      // Handle direction (RTL or LTR) and applied styles
      if (lang === "ar") {
        document.body.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("dir", "rtl");

        // Add rtl-style.css dynamically if it exists
        if (!rtlStylesheet) {
          rtlStylesheet = document.createElement("link");
          rtlStylesheet.setAttribute("rel", "stylesheet");
          rtlStylesheet.setAttribute("href", "css/rtl-style.css");
          headElement.appendChild(rtlStylesheet);
        }
      } else {
        document.body.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("dir", "ltr");

        // Remove rtl-style.css dynamically
        if (rtlStylesheet) {
          rtlStylesheet.remove();
          rtlStylesheet = null;
        }
      }

      // Update active button states
      updateActiveButton(lang);
      
    } catch (error) {
      console.error("Error loading language file:", error);
    }
  }

  // Apply translations to all elements
  function applyTranslations(translations) {
    // Update all elements with data-translate attribute
    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[key]) {
        // Check if element contains HTML (like <br> tags)
        if (translations[key].includes("<br>")) {
          element.innerHTML = translations[key];
        } else {
          element.textContent = translations[key];
        }
      }
    });
  }

  // Update active button styling
  function updateActiveButton(lang) {
    if (lang === "ar") {
      langArButton.classList.add("active");
      langArButton.classList.remove("btn-light");
      langArButton.classList.add("btn-primary");
      langEnButton.classList.remove("active", "btn-primary");
      langEnButton.classList.add("btn-light");
    } else {
      langEnButton.classList.add("active");
      langEnButton.classList.remove("btn-light");
      langEnButton.classList.add("btn-primary");
      langArButton.classList.remove("active", "btn-primary");
      langArButton.classList.add("btn-light");
    }
  }

  // Event listeners for language buttons
  langEnButton.addEventListener("click", () => loadLanguage("en"));
  langArButton.addEventListener("click", () => loadLanguage("ar"));

  // Load saved language preference or default to Arabic
  const savedLang = localStorage.getItem("preferredLanguage") || "ar";
  loadLanguage(savedLang);
});

// Global function to translate dynamically loaded content
window.translateDynamicContent = function() {
  if (Object.keys(currentTranslations).length > 0) {
    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (currentTranslations[key]) {
        if (currentTranslations[key].includes("<br>")) {
          element.innerHTML = currentTranslations[key];
        } else {
          element.textContent = currentTranslations[key];
        }
      }
    });
  }
};