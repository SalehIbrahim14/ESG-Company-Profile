// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOMContentLoaded event triggered!");
//     const contactForm = document.getElementById("contactForm");
//     console.log('contact form: ', contactForm);

//     // Verify that the form exists
//     if (!contactForm) {
//         console.error("Contact Form not found in the DOM!");
//         return;
//     }

//     // Add an event listener to the form
//     contactForm.addEventListener("submit", async (event) => {
//         event.preventDefault(); // Prevent default form submission

//         // Form submission logic
//         await sendEmail();
//     });
// });

async function sendEmail() {
    console.log("send email function");

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const companyName = document.getElementById("companyName").value;

    console.log("form data:", { name, email, message, phone, service, companyName });
    const formMessage = document.getElementById("formMessage");

    try {
        const response = await fetch("http://localhost:3000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message, phone, service, companyName })
        });

        if (response.ok) {
            formMessage.content = "Thank you for contacting us. We will get back to you shortly.";
            formMessage.style.display = "block";
            contactForm.reset();
        } else {
            formMessage.content = "Failed to send your message. Please try again later.";
            formMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}