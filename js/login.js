const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username = document
            .getElementById("username")
            .value.trim();

        const password = document
            .getElementById("password")
            .value;

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

        const user = users.find(account =>
            account.username.toLowerCase() === username.toLowerCase() &&
            account.password === password
        );

        if (!user) {
            showMessage(
                "Incorrect username or password. Please try again.",
                "error"
            );
            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                username: user.username,
                email: user.email
            })
        );

        showMessage(
            "Login successful! Welcome to Bookery.",
            "success"
        );

        setTimeout(function() {
            window.location.href = "../index.html";
        }, 1200);

    });

}

function showMessage(text, type) {

    const message = document.getElementById("loginMessage");

    if (!message) return;

    message.textContent = text;
    message.className = type;
}