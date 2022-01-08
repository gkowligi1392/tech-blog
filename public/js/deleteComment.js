async function deleteCommentHandler(event) {
    event.stopPropagation();
    if (event.target.classList.contains("delete-comment")) {
        const id = event.target.dataset.id;
        const response = await fetch(`/api/comments/${id}`, {
            method: "DELETE",
        });
    
        if (response.ok) {
            document.location.reload(true);
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector(".list-group")
    .addEventListener("click", deleteCommentHandler);