document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".header-links a");

    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const header = document.querySelector(".header");
    const nav = document.querySelector(".header-links");

    const menuButton = document.createElement("button");

    menuButton.classList.add("menu-button");
    menuButton.innerHTML = "☰";

    header.insertBefore(menuButton, nav);

    menuButton.addEventListener("click", function () {

        nav.classList.toggle("show");

    });


    /* =========================
       BACK TO TOP BUTTON
    ========================= */

    const backToTop = document.createElement("button");

    backToTop.classList.add("back-to-top");
    backToTop.innerHTML = "↑";

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});