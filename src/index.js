let temperature = 51;
const increaseControl = document.getElementById("increase_control")
const temperatureValue = document.getElementById("temperature_value")
const decreaseControl = document.getElementById("decrease_control")
const landscape = document.getElementById("emojis");
const temperatureButton = document.getElementById("temperature_button");
const cityInput = document.getElementById("city");
const resetButton = document.getElementById("reset_button");
const proxyURL = "http://127.0.0.1:5000";
const weatherOptions = document.getElementById("weather_options");
const subtitle = document.getElementById("subtitle");

function updateSubtitle(cityName) {
    subtitle.textContent = `For the lovely city of ${cityName}`;
}

function updateTemperatureColor() {
    temperatureValue.textContent = temperature;
    if (temperature >= 80) {
        temperatureValue.style.color = "red";
    } else if (temperature >= 70) {
        temperatureValue.style.color = "orange";
    } else if (temperature >= 60) {
        temperatureValue.style.color = "yellow";
    } else if (temperature >= 50) {
        temperatureValue.style.color = "green";
    } else {
        temperatureValue.style.color = "teal";
    }
}

function updateLandscape() {
    temperatureValue.textContent = temperature;

    if (temperature >= 80) {
        landscape.textContent= "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temperature >= 70) {
        landscape.textContent= "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temperature >= 60) {
        landscape.textContent= "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else {
        landscape.textContent= "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
}

increaseControl.addEventListener("click",() => {
    temperature += 1;
    updateTemperatureColor ();
    updateLandscape();
});

decreaseControl.addEventListener("click",() => {
    temperature -= 1;
    updateTemperatureColor ();
    updateLandscape();
});

updateTemperatureColor();
updateLandscape();

temperatureButton.addEventListener("click", () => {
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }

    axios.get(`${proxyURL}/location`, {
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

        return axios.get(`${proxyURL}/weather`, {
            params: {
                lat: latitude,
                lon: longitude
            }
        });
    })
    .then((response) => {
        const weatherData = response.data;
        console.log("Resposta de /weather:", weatherData);

        if (!weatherData.main || typeof weatherData.main.temp !== "number") {
            throw new Error(
                weatherData.message || "Invalid weather data."
            );
        }

        const kelvin = weatherData.main.temp;

        temperature = Math.round(
            (kelvin - 273.15) * 9 / 5 + 32
        );

        updateTemperatureColor();
        updateLandscape();
        updateSubtitle(cityName);
    })
    .catch((error) => {
        console.error("Could not fetch weather data:", error);
        alert("Could not get weather data.");
    });
});

const updateSky = () => {
  const selectedWeather = weatherOptions.value;
  const skyDisplay = document.querySelector("#sky-display");

  if (selectedWeather === "Sunny") {
    skyDisplay.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
  } else if (selectedWeather === "Cloudy") {
    skyDisplay.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
  } else if (selectedWeather === "Rainy") {
    skyDisplay.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
  } else if (selectedWeather === "Snowy") {
    skyDisplay.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
  }
};



weatherOptions.addEventListener("change", updateSky);
updateSky();

resetButton.addEventListener("click", () => {
  cityInput.value = "Seattle";
});