async function signupHandler(event) {
    event.preventDefault();
    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
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