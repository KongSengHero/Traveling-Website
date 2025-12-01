const menuToggle = document.querySelector("#menu-toggle");
const menuDropdown = document.querySelector(".menu-dropdown");
menuToggle.addEventListener("change", () => {
 menuDropdown.classList.toggle("hidden");
});