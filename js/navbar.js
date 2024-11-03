// JavaScript to set active class based on current page URL
document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    if (currentPath.includes("index")) {
        document.getElementById("homeLink").classList.add("active");
    } else if (currentPath.includes("services")) {
        document.getElementById("servicesLink").classList.add("active");
    } else if (currentPath.includes("contact-us")) {
        document.getElementById("contactLink").classList.add("active");
    }
});

document.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { // Change `50` to the scroll distance you prefer
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });