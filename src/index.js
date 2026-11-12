import { tempColor, landscapeBackground, skyOptions } from './constants.js';
import { kelvinToFahrenheit } from './helpers.js';
import { getCoordinates, getWeather } from './services.js';

const state = {
  currentTemp: 60,
  displayTemp: 0,
  increaseBtn: null,
  decreaseBtn: null,
  displayLandscape: null,
  cityName: null,
  cityNameInput: null,
  currentTempBtn: null,
  skySelect: null,
  displaySky: null,
  gardenContent: null,
};

const increaseTemperature = () => {
  state.currentTemp += 1;
  state.displayTemp.textContent = state.currentTemp;
  updateTempColor();
  updateLandscape();
};

const decreaseTemperature = () => {
  state.currentTemp -= 1;
  state.displayTemp.textContent = state.currentTemp;
  updateTempColor();
  updateLandscape();
};

const initUI = () =>{
  state.displayTemp = document.getElementById('tempValue');
  state.displayTemp.textContent = state.currentTemp;

  state.increaseBtn = document.getElementById('increaseTempControl');
  state.decreaseBtn = document.getElementById('decreaseTempControl');
  state.displayLandscape = document.getElementById('landscape');
  state.cityName = document.getElementById('cityName');
  state.cityNameInput = document.getElementById('cityNameInput');
  state.currentTempBtn = document.getElementById('currentTempButton');
  state.skySelect = document.getElementById('skySelect');
  state.displaySky = document.getElementById('sky');
  state.gardenContent = document.getElementById('gardenContent');

  updateTempColor();
  updateLandscape();
  updateSky();

  handleEvent();
};

const updateTempColor = () => {
  state.displayTemp.style.color = 'teal';
  for (const [key, value] of Object.entries(tempColor)) {
    if (state.currentTemp >= Number(key)) {
      state.displayTemp.style.color = value;
    }
  }
};

const updateLandscape = () => {
  state.displayLandscape.textContent = landscapeBackground[0];
  for (const [key, value] of Object.entries(landscapeBackground)) {
    if (state.currentTemp >= Number(key)) {
      state.displayLandscape.textContent = value;
    }
  }
};

const getRealtimeTemperature = async () => {
  const cityName = state.cityNameInput.value.trim();
  if (!cityName) {
    return;
  }

  try {
    const coordinates = await getCoordinates(cityName);
    const kelvin = await getWeather(coordinates);

    state.currentTemp = kelvinToFahrenheit(kelvin);
    state.displayTemp.textContent = state.currentTemp;
    updateTempColor();
    updateLandscape();
  } catch (error) {
    console.log('Error getting temperature:', error);
  }
};

const updateSky = () => {
  const sky = state.skySelect.value;
  state.displaySky.textContent = skyOptions[sky];
  state.gardenContent.className = `garden__content ${sky.toLowerCase()}`;
};

const handleEvent = () =>{
  state.increaseBtn.addEventListener('click', () => {
    increaseTemperature();
  });

  state.decreaseBtn.addEventListener('click', () => {
    decreaseTemperature();
  });

  state.cityNameInput.addEventListener('input', (e) => {
    state.cityName.textContent = e.target.value || 'City Name';
  });

  state.currentTempBtn.addEventListener('click', getRealtimeTemperature);

  state.skySelect.addEventListener('change', updateSky);
};

initUI();
