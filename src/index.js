let temperature = 51;
const increaseControl = document.getElementById("increase_control")
const temperatureValue = document.getElementById("temperature_value")
const decreaseControl = document.getElementById("decrease_control")
const landscape = document.getElementById("emojis");
const temperatureButton = document.getElementById("temperature_button");
const cityInput = document.getElementById("city");
const proxyURL = "http://127.0.0.1:5000";

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
        console.log("Location response:", response.data);

        if (!Array.isArray(response.data) || response.data.length === 0) {
            throw new Error("City not found");
        }

        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;

        return axios.get(`${proxyURL}/weather`, {
            params: {
                lat: latitude,
                lon: longitude
            }
        });
    })
    .then((response) => {
        console.log("Weather response:", response.data);

        const kelvin = response.data.main.temp;

        temperature = Math.round(
            (kelvin - 273.15) * 9 / 5 + 32
        );

        temperatureValue.textContent = temperature;

        updateTemperatureColor();
        updateLandscape();
    })
    .catch((error) => {
        console.error("Could not fetch weather data:", error);
        alert("Could not get weather data.");
    });
});
