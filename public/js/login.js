async function loginFormHandler(event) {
    event.preventDefault();
    
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();
    
    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
    
        console.log(response);
        if (response.ok) {
            document.location.replace("/dashboard/");
        } else {
            alert("Invalid email or password");
        }
    }
}

document
    .getElementById("loginForm")
    .addEventListener("submit", loginFormHandler);