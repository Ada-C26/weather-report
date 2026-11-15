// 'use strict'; reemember to export

const state = {
  temperature: 70,
};

const updateTemperature = () => {
  tempValue.textContent = state.temperature;
};

const tempValue = document.getElementById('tempValue');
const tempUp = document.getElementById('increaseTempControl');
const tempDown = document.getElementById('decreaseTempControl');
const cityNameInput = document.getElementById('cityNameInput');
const cityNameDisplay = document.getElementById('headerCityName');
const cityNameButton = document.getElementById('cityNameReset');
const currentTempButton = document.getElementById('currentTempButton');
const skySelect = document.getElementById('skySelect');

const tempColorChange = () => {
  const tempClasses = {
    0: 'teal',
    50: 'green',
    60: 'yellow',
    70: 'orange',
    80: 'red',
  };

  let colorInd = Math.floor(state.temperature / 10) * 10;
  if (colorInd < 50) {
    colorInd = 0;
  }
  tempValue.classList.remove(...Object.values(tempClasses));
  tempValue.classList.add(tempClasses[colorInd]);
};

const changeLandscape = () => {
  const landscape = document.getElementById('landscape');
  if (state.temperature >= 80) {
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70 && state.temperature < 80) {
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature < 70) {
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature < 60) {
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeSky = () => {
  const sky = document.getElementById('skySelect').value;
  const skyDisplay = document.getElementById('sky');
  const background = document.getElementById('weather-background');
  if (sky === 'Sunny') {
    skyDisplay.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    background.style.backgroundImage = "url('./assets/sunny.jpg')";
  } else if (sky === 'Cloudy') {
    skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    background.style.backgroundImage = "url('./assets/cloudy.jpg')";
  } else if (sky === 'Rainy') {
    skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    background.style.backgroundImage = "url('./assets/rainy.jpg')";
  } else if (sky === 'Snowy') {
    skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    background.style.backgroundImage = "url('./assets/snowy.jpg')";
  }
};

const updateCityName = () => {
  cityNameDisplay.textContent = cityNameInput.value;
};

const resetCityName = () => {
  cityNameDisplay.textContent = 'Seattle';
  cityNameInput.value = 'Seattle';
};

const tempApiCall = async () => {
  const apiTemp = await getWeather(cityNameInput.value);
  state.temperature = convertKtoF(apiTemp.temp);
  updateTemperature();
  tempColorChange();
  changeLandscape();
};

const registerEventHandlers = () => {
  tempUp.addEventListener('click', () => {
    state.temperature += 1;
    updateTemperature();
    tempColorChange();
    changeLandscape();
  });
  tempDown.addEventListener('click', () => {
    state.temperature -= 1;
    updateTemperature();
    tempColorChange();
    changeLandscape();
  });
  cityNameInput.addEventListener('input', () => {
    updateCityName();
  });
  cityNameButton.addEventListener('click', () => {
    resetCityName();
  });
  currentTempButton.addEventListener('click', () => {
    tempApiCall();
  });
  skySelect.addEventListener('change', () => {
    changeSky();
  });
};

changeLandscape();
tempColorChange();
changeSky();

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const findLatitudeAndLongitude = async (query) => {
  // Return the promise chain created by the axios call
  try {
    const response = await axios.get(
      'https://ada-weather-report-proxy-server.onrender.com/location',
      {
        params: {
          q: query,
          format: 'json',
        },
      },
    );

    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    const city = response.data[0].display_name;

    console.log('success in findLatitudeAndLongitude!', lat, lon);

    return { lat, lon, city }; // Return the data we want to pass on
  } catch (error) {
    console.log('error in findLatitudeAndLongitude!');
    throw error;
    // console.log(error); // If we want to see more info about the issue
  }
};

const getWeatherByLocation = async (lat, lon) => {
  try {
    const response = await axios.get(
      'https://ada-weather-report-proxy-server.onrender.com/weather',
      {
        params: {
          lat: lat,
          lon: lon,
          format: 'json',
        },
      },
    );

    const temp = response.data.main.temp;
    console.log('success in getWeatherByLocation!', temp);

    return { temp };
  } catch (error) {
    console.log('error in getWeatherByLocation!');
    throw error;
    // console.log(error); // If we want to see more info about the issue
  }
};

const getWeather = async (query) => {
  try {
    const coord = await findLatitudeAndLongitude(query);
    return await getWeatherByLocation(coord.lat, coord.lon);
  } catch (error) {
    console.log('getWeather: error fetching weather from query!');
    throw error;
    // console.log(error); // If we want to see more info about the issue
  }
};

const convertKtoF = (K) => {
  const F = (K - 273.15) * (9 / 5) + 32;
  return Math.round(F);
};
