import { tempColor, landscapeBackground, skyOptions, cityDefaultName ,defaultTempScale} from './constants.js';
import { kelvinToFahrenheit, kelvinToCelsius, fahrenheitToCelsius, celsiusToFahrenheit } from './helpers.js';
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
  restBtn: null,
  skySelect: null,
  displaySky: null,
  gardenContent: null,
  convertTempBtn: null,
  scaleText :null,
  errorMessage: null,
  currentTempScale: null,
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
  state.cityName = document.getElementById('headerCityName');
  state.cityNameInput = document.getElementById('cityNameInput');
  state.currentTempBtn = document.getElementById('currentTempButton');
  state.skySelect = document.getElementById('skySelect');
  state.displaySky = document.getElementById('sky');
  state.gardenContent = document.getElementById('gardenContent');
  state.restBtn = document.getElementById('cityNameReset');
  state.convertTempBtn = document.getElementById('convertTempButton');
  state.scaleText = document.getElementById('scale');
  state.errorMessage = document.getElementById('errorMessage');

  updateScale();
  updateTempColor();
  updateLandscape();
  updateSky();
  updateCityName();

  handleEvent();
};

const updateCityName = (cityName= cityDefaultName)=>{
  state.cityName.textContent = cityName;
  state.cityNameInput.value = cityName;
};

const updateScale = (currentScale = defaultTempScale)=>{
  state.currentTempScale = currentScale;
  state.scaleText.textContent = currentScale;
};

const switchTemp = ()=>{
  if(state.currentTempScale == defaultTempScale){//  c=>f
    updateScale('C');
    state.currentTemp = Math.round(fahrenheitToCelsius(state.currentTemp));
  }else{
    updateScale();
    state.currentTemp = Math.round(celsiusToFahrenheit(state.currentTemp));
  }

  state.displayTemp.textContent = state.currentTemp;
  updateTempColor();
  updateLandscape();
};

const getTempInFahrenheit = () => {
  if (state.currentTempScale === 'C') {
    return celsiusToFahrenheit(state.currentTemp);
  }
  return state.currentTemp;
};

const updateTempColor = () => {
  const tempF = getTempInFahrenheit();

  for (const [key, value] of Object.entries(tempColor)) {
    if (tempF >= Number(key)) {
      state.displayTemp.className = value;
      document.body.style.backgroundColor = value;
    }
  }
};

const updateLandscape = () => {
  const tempF = getTempInFahrenheit();
  state.displayLandscape.textContent = landscapeBackground[0];
  for (const [key, value] of Object.entries(landscapeBackground)) {
    if (tempF >= Number(key)) {
      state.displayLandscape.textContent = value;
    }
  }
};

const getRealtimeTemperature = async () => {
  const cityName = state.cityNameInput.value.trim();
  state.errorMessage.textContent = '';

  if (!cityName) {
    state.errorMessage.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const coordinates = await getCoordinates(cityName);
    const kelvin = await getWeather(coordinates);

    if (state.currentTempScale === 'C') {
      state.currentTemp = kelvinToCelsius(kelvin);
    } else {
      state.currentTemp = kelvinToFahrenheit(kelvin);
    }
    state.displayTemp.textContent = state.currentTemp;
    updateTempColor();
    updateLandscape();
  } catch (error) {
    console.log('Error getting temperature:', error);
    state.errorMessage.textContent = `Couldn't get the temperature for "${cityName}".`;
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
    updateCityName( e.target.value );
  });

  state.restBtn.addEventListener('click', ()=>{
    updateCityName();
  });

  state.currentTempBtn.addEventListener('click', getRealtimeTemperature);

  state.skySelect.addEventListener('change', updateSky);

  state.convertTempBtn.addEventListener('click',switchTemp);
};

initUI();
