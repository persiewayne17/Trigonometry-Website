document.addEventListener("DOMContentLoaded", (event) => {
  // Mobile menu toggle
  function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("show");
  }

  document.querySelector(".fa-bars").addEventListener("click", toggleMenu);
  document.querySelector(".fa-xmark").addEventListener("click", toggleMenu);

  // Dropdown toggle for mobile
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const navLinks = document.getElementById("navLinks");
    const isClickInsideMenu = navLinks.contains(e.target);
    const isClickOnMenuIcon = e.target.classList.contains("fa-bars");

    if (!isClickInsideMenu && !isClickOnMenuIcon && window.innerWidth <= 768) {
      navLinks.classList.remove("show");
    }
  });
});
