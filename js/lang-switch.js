// جافا سكريبت: lang-switch.js
document.addEventListener("DOMContentLoaded", function () {
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  const langEnButton = document.getElementById("lang-en");
  const langArButton = document.getElementById("lang-ar");

  // عنصر Head في HTML لإضافة/إزالة CSS ديناميكيًا
  const headElement = document.querySelector("head");
  let rtlStylesheet;

  // تحميل الترجمات ديناميكيًا بناءً على اللغة المختارة
  async function loadLanguage(lang) {
    const response = await fetch(`translations/${lang}.json`);
    const translations = await response.json();
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-translate");
      element.textContent = translations[key];
    });

    // التعامل مع الاتجاه (RTL أو LTR) والأنماط المطبقة
    if (lang === "ar") {
      document.body.setAttribute("dir", "rtl");

      // إضافة rtl-style.css ديناميكيًا
      if (!rtlStylesheet) {
        rtlStylesheet = document.createElement("link");
        rtlStylesheet.setAttribute("rel", "stylesheet");
        rtlStylesheet.setAttribute("href", "css/rtl-style.css");
        headElement.appendChild(rtlStylesheet);
      }
    } else {
      document.body.setAttribute("dir", "ltr");

      // إزالة rtl-style.css ديناميكيًا
      if (rtlStylesheet) {
        rtlStylesheet.remove();
        rtlStylesheet = null;
      }
    }
  }

  // مستمعي الأحداث لأزرار اللغة
  langEnButton.addEventListener("click", () => loadLanguage("en"));
  langArButton.addEventListener("click", () => loadLanguage("ar"));

  // اللغة الافتراضية
  loadLanguage("en");
});