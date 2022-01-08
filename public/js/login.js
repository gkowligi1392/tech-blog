async function loginFormHandler(event) {
    event.preventDefault();
    
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }
    
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

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }