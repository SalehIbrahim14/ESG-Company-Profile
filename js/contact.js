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

    try {
        const response = await fetch("http://localhost:3000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            alert("Your message has been sent successfully!");
            contactForm.reset();
        } else {
            alert("Failed to send your message. Please try again later.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}