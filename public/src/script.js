const menuToggle = document.querySelector("#menu-toggle");
const menuDropdown = document.querySelector(".menu-dropdown");
// Removed unused toggleMenu and incorrect event listener as CSS handles dropdown toggle entirely.

menuToggle.addEventListener("change", () => {
    menuDropdown.classList.toggle("hidden");
});