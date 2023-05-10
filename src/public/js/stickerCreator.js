const form = document.getElementById("stickerForm");

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const data = new FormData(form);
    const response = await fetch("/api/stickers/", {
        method: "POST",
        body: data,
    });
    const result = await response.json();
    console.log(result);
});
