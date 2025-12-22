// JavaScript: lang-switch.js
document.addEventListener("DOMContentLoaded", function () {
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  const langEnButton = document.getElementById("lang-en");
  const langArButton = document.getElementById("lang-ar");

  // HTML Head element for dynamically adding/removing CSS
  const headElement = document.querySelector("head");
  let rtlStylesheet;

  // Load translations dynamically based on chosen language
  async function loadLanguage(lang) {
    const response = await fetch(`translations/${lang}.json`);
    const translations = await response.json();
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-translate");
      element.textContent = translations[key];
    });

    // Handle direction (RTL or LTR) and styles applied
    if (lang === "ar") {
      document.body.setAttribute("dir", "rtl");

      // Add rtl-style.css dynamically
      if (!rtlStylesheet) {
        rtlStylesheet = document.createElement("link");
        rtlStylesheet.setAttribute("rel", "stylesheet");
        rtlStylesheet.setAttribute("href", "css/rtl-style.css");
        headElement.appendChild(rtlStylesheet);
      }
    } else {
      document.body.setAttribute("dir", "ltr");

      // Remove rtl-style.css dynamically
      if (rtlStylesheet) {
        rtlStylesheet.remove();
        rtlStylesheet = null;
      }
    }
  }

  // Event Listeners for Language Buttons
  langEnButton.addEventListener("click", () => loadLanguage("en"));
  langArButton.addEventListener("click", () => loadLanguage("ar"));

  // Default Language
  loadLanguage("en");
});