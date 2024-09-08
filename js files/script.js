document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  const dropdowns = document.querySelectorAll(".dropdown");
  const contentArea = document.getElementById("content-area");
  const menuItems = document.querySelectorAll(".nav-links a[data-target]");

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuToggle.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("show")
    );
  });

  // Dropdown toggle for mobile
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
    if (
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      window.innerWidth <= 768
    ) {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Function to handle menu item clicks and load content
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = item.getAttribute("data-target");
      menuItems.forEach((menu) => menu.classList.remove("active")); // Remove 'active' class from all menu items
      item.classList.add("active"); // Add 'active' class to the clicked item
      loadContent(target);
      // Hide the nav menu on small screens after menu item click
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("show");
      }
    });
  });

  function loadContent(target) {
    fetch(`/content/${target}.html`)
      .then((response) => response.text())
      .then((html) => {
        contentArea.innerHTML = html;
        // Update URL without page reload
        history.pushState(null, "", `/${target}`);
        // Scroll to top of the page
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        contentArea.innerHTML =
          "<p>Error loading content. Please try again.</p>";
      });
  }

  // Handle browser back/forward navigation
  window.addEventListener("popstate", () => {
    const path = window.location.pathname.substr(1);
    if (path) {
      loadContent(path);
      updateActiveMenuItem(path);
    } else {
      // Load default content for home page
      loadContent("home");
      updateActiveMenuItem("home");
    }
  });

  // Function to update active menu item
  function updateActiveMenuItem(target) {
    menuItems.forEach((menu) => {
      if (menu.getAttribute("data-target") === target) {
        menu.classList.add("active");
      } else {
        menu.classList.remove("active");
      }
    });
  }

  // Load initial content based on current URL
  const initialPath = window.location.pathname.substr(1) || "home";
  loadContent(initialPath);
  updateActiveMenuItem(initialPath);
});
