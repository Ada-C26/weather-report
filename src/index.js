
'use strict';

// Wave 2: Temperature

let temperature = 65;

const temperatureElement = document.querySelector('#tempValue');
const increaseButton = document.querySelector('#increaseTempControl');
const decreaseButton = document.querySelector('#decreaseTempControl');
const landscapeElement = document.querySelector('#landscape');

// Temperature color changing based on provided limits
const updateTemperatureColor = (newTemperature) => {
    if (newTemperature >= 80) {
        temperatureElement.style.color = 'red';
    } else if (newTemperature >= 70) {
        temperatureElement.style.color = 'orange';
    } else if (newTemperature >= 60) {
        temperatureElement.style.color = 'yellow';
    } else if (newTemperature >= 50) {
        temperatureElement.style.color = 'green';
    } else {
        temperatureElement.style.color = 'teal';
    }
};

// Landscape
const updateLandscape = (newTemperature) => {
    if (newTemperature >= 80) {
        landscapeElement.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (newTemperature >= 70) {
        landscapeElement.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (newTemperature >= 60) {
        landscapeElement.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else {
        landscapeElement.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
};

// Temperature + color + landscape
const updateTemperature = () => {
    temperatureElement.textContent = `${temperature}°F`;
    updateTemperatureColor(temperature);
    updateLandscape(temperature);
};

// Temperature +1
const increaseTemperature = () => {
    temperature += 1;
    updateTemperature();
};

// Temperature -1
const decreaseTemperature = () => {
    temperature -= 1;
    updateTemperature();
};

// Event listeners
increaseButton.addEventListener('click', increaseTemperature);
decreaseButton.addEventListener('click', decreaseTemperature);

// Temperature and landscape initialization
updateTemperature();


// DOM elements
const cityInput = document.querySelector('#cityNameInput');
const cityHeader = document.querySelector('#headerCityName');
const skySelect = document.querySelector('#skySelect');
const sky = document.querySelector('#sky');
const gardenContent = document.querySelector('#gardenContent');
const cityNameReset = document.querySelector('#cityNameReset');
const currentTempButton = document.querySelector('#currentTempButton');


// Wave 3: City Name
function updateCityName() {
    cityHeader.textContent = cityInput.value;
}

cityInput.addEventListener('input', updateCityName);

updateCityName();


// Wave 4: API calls
const getCurrentTemperature = async () => {
    const cityName = cityHeader.textContent.trim();

    const locationResponse = await axios.get(
        'http://127.0.0.1:5000/location',
        {
            params: {
                q: cityName
            }
        }
    );

    const latitude = locationResponse.data[0].lat;
    const longitude = locationResponse.data[0].lon;

    const weatherResponse = await axios.get(
        'http://127.0.0.1:5000/weather',
        {
            params: {
                lat: latitude,
                lon: longitude
            }
        }
    );

    const kelvinTemperature = weatherResponse.data.main.temp;

    const fahrenheitTemperature =
        (kelvinTemperature - 273.15) * (9 / 5) + 32;

    temperature = Math.round(fahrenheitTemperature);

    updateTemperature();
};

currentTempButton.addEventListener('click', getCurrentTemperature);


// Wave 5: Sky selection
function updateSky() {
    gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

    if (skySelect.value === 'Sunny') {
        sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
        gardenContent.classList.add('sunny');
    }
    else if (skySelect.value === 'Cloudy') {
        sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
        gardenContent.classList.add('cloudy');
    }
    else if (skySelect.value === 'Rainy') {
        sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
        gardenContent.classList.add('rainy');
    }
    else if (skySelect.value === 'Snowy') {
        sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
        gardenContent.classList.add('snowy');
    }
}

// Display default sky and listen for changes
updateSky();
skySelect.addEventListener('change', updateSky);


// Wave 6: Reset city name
function resetCityName() {
    cityInput.value = 'Seattle';
    cityHeader.textContent = 'Seattle';
}

cityNameReset.addEventListener('click', resetCityName);
