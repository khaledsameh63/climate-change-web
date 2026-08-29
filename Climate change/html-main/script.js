document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ACTIVE NAVIGATION
    // =========================

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".header-links a");

    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    // =========================
    // MOBILE MENU
    // =========================

    const header = document.querySelector(".header");
    const nav = document.querySelector(".header-links");

    const menuButton = document.createElement("button");

    menuButton.classList.add("menu-button");
    menuButton.innerHTML = "☰";

    header.insertBefore(menuButton, nav);

    menuButton.addEventListener("click", function () {
        nav.classList.toggle("show");
    });


    // =========================
    // BACK TO TOP
    // =========================

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


    // =========================
    // WEATHER API
    // =========================

    const apiKey = "1b59494146e75098baffca23a8c90c15";

    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const weatherResult = document.getElementById("weatherResult");


    // Make sure weather elements exist
    if (cityInput && searchButton && weatherResult) {

        searchButton.addEventListener("click", function () {

            const city = cityInput.value.trim();

            if (city === "") {

                weatherResult.innerHTML = `
                    <p class="weather-error">
                        Please enter a city name.
                    </p>
                `;

                return;
            }

            weatherResult.innerHTML = `
                <p class="weather-message">
                    Loading weather...
                </p>
            `;

            getWeather(city);

        });

    }


    async function getWeather(city) {

        try {

            const url =
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();

            weatherResult.innerHTML = `

                <h3 class="weather-city">
                    ${data.name}, ${data.sys.country}
                </h3>

                <p class="weather-temperature">
                    ${Math.round(data.main.temp)}°C
                </p>

                <p class="weather-description">
                    ${data.weather[0].description}
                </p>

                <div class="weather-details">

                    <div>
                        💧<br>
                        Humidity<br>
                        ${data.main.humidity}%
                    </div>

                    <div>
                        💨<br>
                        Wind<br>
                        ${data.wind.speed} m/s
                    </div>

                </div>

            `;

        } catch (error) {

            weatherResult.innerHTML = `
                <p class="weather-error">
                    City not found. Please try again.
                </p>
            `;

        }

    }

});