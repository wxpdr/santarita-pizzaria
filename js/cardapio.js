const categoryButtons = document.querySelectorAll(".category-btn");
const menuSections = document.querySelectorAll(".menu-section");

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;

        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        menuSections.forEach((section) => {
            section.classList.remove("active-section");
        });

        button.classList.add("active");

        const activeSection = document.getElementById(selectedCategory);

        if (activeSection) {
            activeSection.classList.add("active-section");
        }
    });
});