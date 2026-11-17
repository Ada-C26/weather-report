'use strict';

const DEFAULT_CITY_NAME = 'Seattle';

const skyOptions = {
  Sunny: '☁️ ☁️ ☀️ ☁️ ☁️',
  Cloudy: '☁️ ☁️ 🌤 ☁️ ☁️',
  Rainy: '🌈 🌧 💧 🌦 🌈',
  Snowy: '❄️ 🌨 ❄️ 🌨 ❄️',
};

const landscapeOptions = {
  hot: '🐍 🦂 🌵 🐍 🏜',
  warm: '🌸 🌿 🌼 🌻 🌷',
  mild: '🌾 🪨 🛤 🌾 🍃',
  cold: '🌲 ⛄️ 🍂 ⛄️ 🌲',
};

// Define the application's default state
const state = {
  city: DEFAULT_CITY_NAME,
  tempFahrenheit: 72,
  sky: 'Sunny',
  tempUnit: 'F',
};

// DOM Element Selectors
const tempDisplay = document.getElementById('tempValue');
const increaseButton = document.getElementById('increaseTempControl');
const decreaseButton = document.getElementById('decreaseTempControl');
const landscape = document.getElementById('landscape');
const cityInput = document.getElementById('cityNameInput');
const cityDisplay = document.getElementById('headerCityName');
const currentTempButton = document.getElementById('currentTempButton');
const skySelect = document.getElementById('skySelect');
const skyContainer = document.getElementById('sky');
const resetButton = document.getElementById('cityNameReset');
const convertTempButton = document.getElementById('convertTempButton');
const gardenContent = document.getElementById('gardenContent');
const body = document.querySelector('body');


// Helper functions to convert temperatures

const kelvinToFahrenheit = tempKelvin => {
  return (tempKelvin - 273.15) * 9 / 5 + 32;
};

const fahrenheitToCelsius = tempFahrenheit => {
  return (tempFahrenheit - 32) * 5 / 9;
};

const celsiusToFahrenheit = tempCelsius => {
  return tempCelsius * 9 / 5 + 32;
};

// Get displayed temperature
const getDisplayedTemp = () => {
  if (state.tempUnit === 'F') {
    return state.tempFahrenheit;
  }
  return fahrenheitToCelsius(state.tempFahrenheit);
};

// Change temperature by a given amount (tempChange)
const changeTemperature = tempChange => {
  if (state.tempUnit === 'F') {
    state.tempFahrenheit += tempChange;
  } else {
    const currentCelsius = fahrenheitToCelsius(state.tempFahrenheit);
    const updatedCelsius = currentCelsius + tempChange;
    state.tempFahrenheit = celsiusToFahrenheit(updatedCelsius);
  }

  renderTempRelated();
};

// Display the temperature
const renderTemp = () => {
  const displayedTemperature = getDisplayedTemp();
  tempDisplay.textContent = `${Math.round(displayedTemperature)}°${state.tempUnit}`;
};

// Render the text for the convert button
const renderConvertTempButton = () => {
  const targetUnit = state.tempUnit === 'F' ? '°C' : '°F';
  convertTempButton.textContent = `Convert Temperature to ${targetUnit}`;
};

// Change temperature color
const updateTemperatureColor = () => {
  const temperature = state.tempFahrenheit;
  let temperatureColor;
  let backgroundColor;

  if (temperature >= 80) {
    temperatureColor = 'red';
    backgroundColor = 'soft-coral';
  } else if (temperature >= 70) {
    temperatureColor = 'orange';
    backgroundColor = 'soft-orange';
  } else if (temperature >= 60) {
    temperatureColor = 'yellow';
    backgroundColor = 'soft-yellow';
  } else if (temperature >= 50) {
    temperatureColor = 'green';
    backgroundColor = 'soft-mint';
  } else {
    temperatureColor = 'teal';
    backgroundColor = 'soft-gray';
  }

  tempDisplay.className = temperatureColor;
  body.className = backgroundColor;
};

// Change the landscape
const updateLandscape = () => {
  const temperature = state.tempFahrenheit;
  let landscapeType;

  if (temperature >= 80) {
    landscapeType = 'hot';
  } else if (temperature >= 70) {
    landscapeType = 'warm';
  } else if (temperature >= 60) {
    landscapeType = 'mild';
  } else {
    landscapeType = 'cold';
  }

  landscape.textContent = landscapeOptions[landscapeType];
};

const renderTempRelated = () => {
  renderTemp();
  updateTemperatureColor();
  updateLandscape();
};

// Increase temperature by 1
const increaseTemperature = () => {
  changeTemperature(1);
};

// Decrease temperature by 1
const decreaseTemperature = () => {
  changeTemperature(-1);
};

// Convert Temperature
const convertTemp = () => {
  state.tempUnit = state.tempUnit === 'F' ? 'C' : 'F';
  renderTempRelated();
  renderConvertTempButton();
};

// Display the city
const renderCity = () => {
  cityInput.value = state.city;
  cityDisplay.textContent = state.city;
};

// Update city name
const updateCityName = () => {
  state.city = cityInput.value;
  renderCity();
};

// Reset the city name
const resetCityName = () => {
  state.city = DEFAULT_CITY_NAME;
  renderCity();
};

// Display the sky
const renderSky = () => {
  skySelect.value = state.sky;
  skyContainer.textContent = skyOptions[state.sky];

  // Display the background color of the garden content based on the selected sky
  gardenContent.className = `garden__content ${state.sky.toLowerCase()}`;
};

// Update sky
const updateSky = () => {
  state.sky = skySelect.value;
  renderSky();
};

const render = () => {
  renderTempRelated();
  renderConvertTempButton();
  renderCity();
  renderSky();
};

// Calling APIs

const API_BASE_URL = 'https://ada-weather-report-proxy-server.onrender.com';

// Input: query: string
// Returns: Promise<{ latitude: string, longitude: string}>
const getLatitudeAndLongitude = async query => {
  try {
    const response = await axios.get(`${API_BASE_URL}/location`,
      {
        params: {
          q: query
        }
      });

    const { lat: latitude, lon: longitude } = response.data[0];
    return { latitude, longitude };
  } catch (error) {
    console.log(`getLatitudeAndLongitude: ${error}`);
    throw error;
  }
};

// Input: latitude: string, longitude: string
// Returns: Promise containing the current weather response
const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`,
      {
        params: {
          lat: latitude,
          lon: longitude
        }
      });

    return response.data;
  } catch (error) {
    console.log(`getWeather: ${error}`);
    throw error;
  }
};

// Input: query: string
// Returns: Promise containing the current weather response
const getWeatherFromQuery = async query => {
  try {
    const { latitude, longitude } = await getLatitudeAndLongitude(query);
    return getWeather(latitude, longitude);
  } catch (error) {
    console.log(`getWeatherFromQuery: ${error}`);
    throw error;
  }
};

// Get Realtime Temperature
const getCurrentTemp = async () => {
  const city = state.city;

  try {
    const weather = await getWeatherFromQuery(city);
    const tempInKelvin = weather.main.temp;
    const tempInFahrenheit = kelvinToFahrenheit(tempInKelvin);

    state.tempFahrenheit = tempInFahrenheit;
    state.tempUnit = 'F';
    render();

  } catch (error) {
    console.log(`Failed to get the current temperature: ${error}`);
  }
};

// Register all events
const registerEventHandlers = () => {
  increaseButton.addEventListener('click', increaseTemperature);
  decreaseButton.addEventListener('click', decreaseTemperature);
  cityInput.addEventListener('input', updateCityName);
  currentTempButton.addEventListener('click', getCurrentTemp);
  skySelect.addEventListener('change', updateSky);
  resetButton.addEventListener('click', resetCityName);
  convertTempButton.addEventListener('click', convertTemp);
};


render(); // Render the initial application state
registerEventHandlers();
