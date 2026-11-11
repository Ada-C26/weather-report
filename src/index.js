// Temp control variables

const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const currentTempButton = document.getElementById('currentTempButton');
const cityNameInput = document.getElementById('cityNameInput');
const tempValue = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');
const headerCityName = document.getElementById('headerCityName');

let temperature = 0;


// Update temperature display color and landscapes

const updateTempGraphics = (temperature) => {
    if (temperature >= 90) {
        tempValue.style.color = 'red';
        changeLandscape('desert.jpg');
    } else if (temperature < 90 && temperature >= 80) {
        tempValue.style.color = 'pink';
        changeLandscape('beach.jpg');
    } else if (temperature < 80 && temperature >= 70) {
        tempValue.style.color = 'orange'
        changeLandscape('meadow.jpg');
    } else if (temperature < 70 && temperature >= 60) {
        tempValue.style.color = 'yellow'
        changeLandscape('springs.jpg');
    } else if (temperature < 60 && temperature >= 50) {
        tempValue.style.color = 'green'
        changeLandscape('forest.jpg');
    } else if (temperature < 50 && temperature >= 40) {
        tempValue.style.color = 'teal'
        changeLandscape('mist.jpg');
    } else {
        tempValue.style.color = 'blue'
        changeLandscape('snow.jpg');
    }
};


// Change landscape

const changeLandscape = (imageName) => {
    const image = document.createElement('img');

    image.src = `./assets/landscape_photos/${imageName}`;
    landscape.replaceChildren(image);
};


// Temperature controls

const updateTemp = () => {
    tempValue.textContent = `${temperature}°F`;
    updateTempGraphics(temperature);
};

// Increase temperature
const increaseTemperature = () => {
    temperature += 1;
    updateTemp();
};

// Decrease temperature
const decreaseTemperature = () => {
    temperature -= 1;
    updateTemp();
};


// Location and weather API

const findLatitudeAndLongitude = (query) => {
    return axios
        .get('https://ada-weather-report-proxy-server.onrender.com/location', {
            params: {
                q: query,
            },
        })
        .then((response) => {
            if (!response.data || response.data.length === 0) {
                throw new Error('City not found');
            }

            const lat = response.data[0].lat;
            const lon = response.data[0].lon;

            return findWeather(lat, lon);
        })
        .catch((error) => {
            console.log('error!', error);
            throw error;
        });
};


const findWeather = (lat, lon) => {
    return axios
        .get('https://ada-weather-report-proxy-server.onrender.com/weather', {
            params: {
                lat: lat,
                lon: lon,
            },
        })
        .then((response) => {
            const tempKelvin = response.data.main.temp;
            const tempFahrenheit = Math.round(
                (tempKelvin - 273.15) * (9 / 5) + 32
            );

            return tempFahrenheit;
        })
        .catch((error) => {
            console.log('error!', error);
            throw error;
        });
};


// Change temperature with city

const changeTempWithCity = (city) => {
    return findLatitudeAndLongitude(city)
        .then((newTemp) => {
            temperature = newTemp;
            updateTemp();

            return newTemp;
        })
        .catch((error) => {
            console.log('Error updating temp:', error);
        });
};

// Update city name

const updateCityName = () => {
    headerCityName.textContent = cityNameInput.value;
};


// Event logic

const registerEventHandlers = () => {
    decreaseTempControl.addEventListener('click', decreaseTemperature);
    increaseTempControl.addEventListener('click', increaseTemperature);
    cityNameInput.addEventListener('input', updateCityName);
    currentTempButton.addEventListener('click', () => {
        const city = cityNameInput.value.trim();
        changeTempWithCity(city);
    });
};


// Application initialization

document.addEventListener('DOMContentLoaded', () => {
    // Initialize temperature display
    updateTemp();
    // Initialize city name display
    updateCityName();
    // Register event handlers
    registerEventHandlers();

});
