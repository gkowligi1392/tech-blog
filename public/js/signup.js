async function signupHandler(event) {
    event.preventDefault();

    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    if (!validateEmail(user.email)) {
        alert("Please enter a valid email address");
        return;
    }

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        window.location.replace("/");
    } else {
        alert(response.statusText);
    }
}

document.getElementById("signupForm").addEventListener("submit", signupHandler);

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}