document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

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


    /* =========================
       DARK / LIGHT MODE
    ========================= */

    const themeButton = document.getElementById("themeButton");


    // Check saved theme

    const savedTheme = localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeButton) {
            themeButton.innerHTML = "☀️";
        }

    }


    // Change theme

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");


            if (document.body.classList.contains("dark-mode")) {

                // Dark Mode

                localStorage.setItem("theme", "dark");

                themeButton.innerHTML = "☀️";

            } else {

                // Light Mode

                localStorage.setItem("theme", "light");

                themeButton.innerHTML = "🌙";

            }

        });

    }


    /* =========================
       MOBILE MENU
    ========================= */

    const header = document.querySelector(".header");
    const nav = document.querySelector(".header-links");


    if (header && nav) {

        const menuButton = document.createElement("button");

        menuButton.classList.add("menu-button");

        menuButton.innerHTML = "☰";


        header.insertBefore(menuButton, nav);


        menuButton.addEventListener("click", function () {

            nav.classList.toggle("show");

        });

    }


    /* =========================
       BACK TO TOP
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


    /* =========================
       WEATHER API
    ========================= */

    const apiKey = "1b59494146e75098baffca23a8c90c15";


    const cityInput = document.getElementById("cityInput");

    const searchButton = document.getElementById("searchButton");

    const weatherResult = document.getElementById("weatherResult");

    const celsiusButton = document.getElementById("celsiusButton");

    const fahrenheitButton = document.getElementById("fahrenheitButton");


    // Store temperature

    let currentTemperature = null;

    let currentUnit = "celsius";


    /* =========================
       SEARCH WEATHER
    ========================= */

    if (cityInput && searchButton && weatherResult) {


        searchButton.addEventListener("click", function () {

            const city = cityInput.value.trim();


            // Empty input

            if (city === "") {

                weatherResult.innerHTML = `
                    <p class="weather-error">
                        Please enter a city name.
                    </p>
                `;

                return;

            }


            // Loading

            weatherResult.innerHTML = `
                <p class="weather-message">
                    Loading weather...
                </p>
            `;


            getWeather(city);

        });


        // Press Enter

        cityInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                searchButton.click();

            }

        });

    }


    /* =========================
       GET WEATHER
    ========================= */

    async function getWeather(city) {

        try {

            const url =
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;


            const response = await fetch(url);


            if (!response.ok) {

                throw new Error("City not found");

            }


            const data = await response.json();


            // Save Celsius temperature

            currentTemperature = data.main.temp;


            // Reset to Celsius

            currentUnit = "celsius";


            updateUnitButtons();


            // Display weather

            displayWeather(data);


        } catch (error) {

            weatherResult.innerHTML = `
                <p class="weather-error">
                    City not found. Please try again.
                </p>
            `;

        }

    }


    /* =========================
       DISPLAY WEATHER
    ========================= */

    function displayWeather(data) {


        let temperature;


        if (currentUnit === "celsius") {

            temperature = currentTemperature;

        } else {

            temperature = (currentTemperature * 9 / 5) + 32;

        }


        const unit =
            currentUnit === "celsius" ? "°C" : "°F";


        weatherResult.innerHTML = `

            <h3 class="weather-city">
                ${data.name}, ${data.sys.country}
            </h3>

            <p class="weather-temperature">
                ${Math.round(temperature)}${unit}
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

    }


    /* =========================
       CELSIUS BUTTON
    ========================= */

    if (celsiusButton) {

        celsiusButton.addEventListener("click", function () {

            if (currentTemperature === null) {
                return;
            }


            currentUnit = "celsius";


            updateUnitButtons();


            // Update temperature only

            updateTemperature();

        });

    }


    /* =========================
       FAHRENHEIT BUTTON
    ========================= */

    if (fahrenheitButton) {

        fahrenheitButton.addEventListener("click", function () {

            if (currentTemperature === null) {
                return;
            }


            currentUnit = "fahrenheit";


            updateUnitButtons();


            // Update temperature only

            updateTemperature();

        });

    }


    /* =========================
       UPDATE TEMPERATURE
    ========================= */

    function updateTemperature() {


        const temperatureElement =
            document.querySelector(".weather-temperature");


        if (!temperatureElement) {
            return;
        }


        let temperature;


        if (currentUnit === "celsius") {

            temperature = currentTemperature;

        } else {

            temperature =
                (currentTemperature * 9 / 5) + 32;

        }


        const unit =
            currentUnit === "celsius" ? "°C" : "°F";


        temperatureElement.innerHTML =
            `${Math.round(temperature)}${unit}`;

    }


    /* =========================
       UPDATE UNIT BUTTONS
    ========================= */

    function updateUnitButtons() {


        if (celsiusButton) {

            celsiusButton.classList.remove("active-unit");

        }


        if (fahrenheitButton) {

            fahrenheitButton.classList.remove("active-unit");

        }


        if (currentUnit === "celsius") {

            if (celsiusButton) {

                celsiusButton.classList.add("active-unit");

            }

        } else {

            if (fahrenheitButton) {

                fahrenheitButton.classList.add("active-unit");

            }

        }

    }

});