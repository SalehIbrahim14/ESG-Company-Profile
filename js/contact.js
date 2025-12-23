// Contact form functionality
// Note: Commented out DOMContentLoaded listener as submit button uses onclick instead

async function sendEmail() {
    console.log("sendEmail function called");

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const companyName = document.getElementById("companyName").value;

    console.log("Form data:", { name, email, message, phone, service, companyName });
    const formMessage = document.getElementById("formMessage");

    // Get current language from global variable or localStorage
    const currentLang = window.currentLang || localStorage.getItem("preferredLanguage") || "ar";

    try {
        const response = await fetch("http://localhost:3000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message, phone, service, companyName, lang: currentLang })
        });

        if (response.ok) {
            const responseText = await response.text();
            formMessage.textContent = responseText;
            formMessage.className = "alert alert-success";
            formMessage.style.display = "block";
            contactForm.reset();
        } else {
            const errorText = await response.text();
            formMessage.textContent = errorText;
            formMessage.className = "alert alert-danger";
            formMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        const errorMsg = currentLang === "en" 
            ? "An error occurred. Please try again." 
            : "حدث خطأ. يرجى المحاولة مرة أخرى.";
        formMessage.textContent = errorMsg;
        formMessage.className = "alert alert-danger";
        formMessage.style.display = "block";
    }
}