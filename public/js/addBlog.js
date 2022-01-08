async function addBlogHandler(event) {
    event.preventDefault();
    const blog = {
        title: document.getElementById("inputTitle").value,
        body: document.getElementById("textareaBody").value,
    };
    const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

document
    .getElementById("addBlogForm")
    .addEventListener("submit", addBlogHandler);