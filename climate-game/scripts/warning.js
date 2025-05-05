document.addEventListener("DOMContentLoaded", () => {
    const warningPopup = document.createElement("div");
    warningPopup.id = "warning-popup";
    warningPopup.textContent = "The website might not work properly on this screen size.";
    document.body.appendChild(warningPopup);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth < 1400 || screenHeight < 1000) {
        warningPopup.style.display = "block";
        setTimeout(() => {
            warningPopup.classList.add("fade-out");
        }, 5500); // Start fading out after 4.5 seconds
        setTimeout(() => {
            warningPopup.style.display = "none";
        }, 6000); // Hide completely after 5 seconds
    }
});
