async function editBlogHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const blog = {
        title: document.getElementById("inputTitle").value,
        body: document.getElementById("textareaBody").value,
    };
    const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
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

document.getElementById("blogForm").addEventListener("submit", editBlogHandler);