const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const password = passwordInput.value;

    const account = usernameInput
        ? usernameInput.value.trim()
        : emailInput.value.trim();

    const message = document.getElementById("loginMessage");

    let users = [];

    try {
        users = JSON.parse(
            localStorage.getItem("bookeryUsers")
        ) || [];
    } catch (error) {
        showMessage("Unable to read account data.", "error");
        return;
    }

    const user = users.find(user => {

        const accountMatches =
            user.username.toLowerCase() === account.toLowerCase() ||
            user.email.toLowerCase() === account.toLowerCase();

        return accountMatches && user.password === password;
    });

    if (!user) {
        showMessage("Incorrect username, email or password.", "error");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify({
        username: user.username,
        email: user.email
    }));

    showMessage("Login successful! Welcome to Bookery.", "success");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1200);

});

function showMessage(text, type) {

    const message = document.getElementById("loginMessage");

    if (message) {
        message.textContent = text;
        message.className = type;
    } else {
        alert(text);
    }
}