document.addEventListener("DOMContentLoaded", () => {

    let temperature = 51;

    const increaseControl = document.getElementById("increase_control");
    const temperatureValue = document.getElementById("temperature_value");
    const decreaseControl = document.getElementById("decrease_control");
    const landscape = document.getElementById("emojis");
    const temperatureButton = document.getElementById("temperature_button");
    const cityInput = document.getElementById("city");
    const citySubtitle = document.getElementById("city_subtitle");
    const resetButton = document.getElementById("reset_button");
    const proxyURL = "https://weather-report-proxy-server-r1lr.onrender.com";
    const weatherOptions = document.getElementById("weather_options");
    const skyDisplay = document.getElementById("sky-display");

    // Update city subtitle
    function updateSubtitle() {
        const cityName = cityInput.value;
        citySubtitle.textContent = `For the lovely city of ${cityName}`;
    }

    // Update temperature color and landscape
    function updateTemperatureDisplay() {
        temperatureValue.textContent = temperature;

        const temperatureRanges = [
            {
                min: 80,
                color: "red",
                landscape: "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
            },
            {
                min: 70,
                color: "orange",
                landscape: "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
            },
            {
                min: 60,
                color: "yellow",
                landscape: "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
            },
            {
                min: 50,
                color: "green",
                landscape: "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
            },
            {
                min: -Infinity,
                color: "teal",
                landscape: "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
            }
        ];

        for (const range of temperatureRanges) {
            if (temperature >= range.min) {
                temperatureValue.style.color = range.color;
                landscape.textContent = range.landscape;
                break;
            }
        }
    }

    // Increase temperature
    function increaseTemperature() {
        temperature += 1;
        updateTemperatureDisplay();
    }

    // Decrease temperature
    function decreaseTemperature() {
        temperature -= 1;
        updateTemperatureDisplay();
    }

    // Get city coordinates
    function getLocation(cityName) {
        return axios.get(`${proxyURL}/location`, {
            params: {
                q: cityName
            }
        })
        .then((response) => {
            const locations = response.data;

            if (!Array.isArray(locations) || locations.length === 0) {
                throw new Error("City not found.");
            }

            const latitude = locations[0].lat;
            const longitude = locations[0].lon;

            return {
                latitude: latitude,
                longitude: longitude
            };
        });
    }

    // Get weather using coordinates
    function getWeather(latitude, longitude) {
        return axios.get(`${proxyURL}/weather`, {
            params: {
                lat: latitude,
                lon: longitude
            }
        });
    }

    // Update temperature from weather data
    function updateWeatherTemperature(weatherData) {
        if (!weatherData.main || typeof weatherData.main.temp !== "number") {
            throw new Error(
                weatherData.message || "Invalid weather data."
            );
        }

        const kelvin = weatherData.main.temp;

        temperature = Math.round(
            (kelvin - 273.15) * 9 / 5 + 32
        );

        updateTemperatureDisplay();
    }

    // Handle realtime temperature button
    function handleTemperatureClick() {
        const cityName = cityInput.value.trim();

        if (cityName === "") {
            alert("Please enter a city name.");
            return;
        }

        getLocation(cityName)
        .then((coordinates) => {
            return getWeather(
                coordinates.latitude,
                coordinates.longitude
            );
        })
        .then((response) => {
            updateWeatherTemperature(response.data);
        })
        .catch((error) => {
            console.error("Could not fetch weather data:", error);
            alert("Could not get weather data.");
        });
    }

    // Update sky
    function updateSky() {
        const selectedWeather = weatherOptions.value;

        if (selectedWeather === "Sunny") {
            skyDisplay.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
        } else if (selectedWeather === "Cloudy") {
            skyDisplay.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
        } else if (selectedWeather === "Rainy") {
            skyDisplay.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
        } else if (selectedWeather === "Snowy") {
            skyDisplay.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
        }
    }

    // Reset city to Seattle
    function resetCity() {
        cityInput.value = "Seattle";
        updateSubtitle();
    }

    // Event listeners
    cityInput.addEventListener("input", updateSubtitle);
    increaseControl.addEventListener("click", increaseTemperature);
    decreaseControl.addEventListener("click", decreaseTemperature);
    temperatureButton.addEventListener("click", handleTemperatureClick);
    weatherOptions.addEventListener("change", updateSky);
    resetButton.addEventListener("click", resetCity);

    // Initial display
    updateSubtitle();
    updateTemperatureDisplay();
    updateSky();

});