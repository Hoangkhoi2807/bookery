const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("registerMessage");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (username.length < 6) {
        showMessage("Username must have at least 6 characters.", "error");
        return;
    }

    if (!passwordRegex.test(password)) {
        showMessage(
            "Password must have at least 8 characters, including uppercase, lowercase and a number.",
            "error"
        );
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "error");
        return;
    }

     let users = JSON.parse(localStorage.getItem("bookeryUsers")) || [];

      const existingUser = users.find(user =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        showMessage("Username or email is already registered.", "error");
        return;
    }

     const newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);

     localStorage.setItem("bookeryUsers", JSON.stringify(users));

    showMessage("Registration successful! You can now log in.", "success");

    registerForm.reset();

});

function showMessage(text, type) {
    const message = document.getElementById("registerMessage");

    message.textContent = text;
    message.className = type;
}