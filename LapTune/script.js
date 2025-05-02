// ===== Registration Form Validation =====
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    clearErrorMessages();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    let isValid = true;

    if (!validateEmail(email)) {
        showError("emailError", "Lūdzu, ievadiet derīgu e-pastu.");
        document.getElementById("email").focus();
        isValid = false;
    }

    if (password.length < 9) {
        showError("passwordError", "Parolei jābūt vismaz 9 rakstzīmēm garai.");
        document.getElementById("password").focus();
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError("confirmPasswordError", "Paroles nesakrīt.");
        document.getElementById("confirmPassword").focus();
        isValid = false;
    }

    if (isValid) {
        const user = {
            email,
            registrationDate: new Date().toLocaleString()
        };
    
        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        users.push(user);
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    
        alert("Reģistrācija veiksmīga!");
        window.location.href = "login.html"; // Pāradresē uz pieslēgšanos
    }
});

// ===== Login Form Validation =====
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrorMessages();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let isValid = true;

    if (!validateEmail(email)) {
        showError("loginEmailError", "Lūdzu, ievadiet derīgu e-pastu.");
        document.getElementById("loginEmail").focus();
        isValid = false;
    }

    if (password === "") {
        showError("loginPasswordError", "Parole ir obligāta.");
        document.getElementById("loginPassword").focus();
        isValid = false;
    }

    if (isValid) {
        alert("Pieslēgšanās veiksmīga!");

        // ✅ Saglabā ielogoto lietotāju localStorage
        localStorage.setItem("loggedInUser", JSON.stringify({ email }));

        // ✅ Pāradresē uz sākumlapu
        window.location.href = "index.html";
    }
});

// ===== Contact Form Validation =====
document.getElementById("contactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrorMessages();

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (!validateEmail(email)) {
        showError("emailError", "Lūdzu, ievadiet derīgu e-pastu.");
        document.getElementById("email").focus();
        isValid = false;
    }

    if (message === "" || message.length > 500) {
        showError("messageError", "Ziņai jābūt ne tukšai un līdz 500 rakstzīmēm.");
        document.getElementById("message").focus();
        isValid = false;
    }

    if (isValid) {
        alert("Ziņa veiksmīgi nosūtīta!");
    }
});

// ===== Utility Functions =====
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|lv)$/;
    return emailPattern.test(email);
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (error) {
        error.innerText = "";
        error.style.visibility = "hidden";
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.style.visibility = "visible";
}
