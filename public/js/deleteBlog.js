async function deleteBlogHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

document
    .getElementById("blogForm")
    .addEventListener("submit", deleteBlogHandler);