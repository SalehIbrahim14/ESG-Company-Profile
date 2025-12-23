// document.addEventListener("DOMContentLoaded", () => {
//     console.log("تم تشغيل حدث DOMContentLoaded!");
//     const contactForm = document.getElementById("contactForm");
//     console.log('نموذج الاتصال: ', contactForm);

//     // التحقق من وجود النموذج
//     if (!contactForm) {
//         console.error("لم يتم العثور على نموذج الاتصال في DOM!");
//         return;
//     }

//     // إضافة مستمع حدث للنموذج
//     contactForm.addEventListener("submit", async (event) => {
//         event.preventDefault(); // منع إرسال النموذج الافتراضي

//         // منطق إرسال النموذج
//         await sendEmail();
//     });
// });

async function sendEmail() {
    console.log("دالة إرسال البريد الإلكتروني");

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const companyName = document.getElementById("companyName").value;

    console.log("بيانات النموذج:", { name, email, message, phone, service, companyName });
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
            formMessage.content = "شكرًا لتواصلك معنا. سنتواصل معك قريبًا.";
            formMessage.style.display = "block";
            contactForm.reset();
        } else {
            formMessage.content = "فشل إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقًا.";
            formMessage.style.display = "block";
        }
    } catch (error) {
        console.error("خطأ:", error);
        alert("حدث خطأ. يرجى المحاولة مرة أخرى.");
    }
}