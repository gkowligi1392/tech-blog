async function addCommentHandler(event) {
    event.preventDefault();
    const blogId = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const data = {
        comment: document.getElementById("textareaComment").value.trim(),
        blogId,
    };

    const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        document.location.replace("/");
    } else {
        alert("Error: " + response.statusText);
    }
}

document
    .getElementById("commentForm")
    .addEventListener("submit", addCommentHandler);