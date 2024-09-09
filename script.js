//boo
const navLinks = document.getElementById("navLinks");
const openMenuIcon = document.getElementById("openMenu");
const closeMenuIcon = document.getElementById("closeMenu");

function showMenu() {
  navLinks.style.display = "block";
  openMenuIcon.style.display = "none";
  closeMenuIcon.style.display = "block";
}

function hideMenu() {
  navLinks.style.display = "none";
  openMenuIcon.style.display = "block";
  closeMenuIcon.style.display = "none";
}
