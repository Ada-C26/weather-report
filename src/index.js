import { tempColor, landscapeBackground, skyOptions, cityDefaultName ,defaultTempScale} from './constants.js';
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
  restBtn: null,
  skySelect: null,
  displaySky: null,
  gardenContent: null,
  convertTempBtn: null,
  scaleText :null,
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
    // F -> C More accurate: (num - 32) * 5/9
    updateScale('C');
    state.currentTemp = Math.ceil((state.currentTemp- 32)*(5/9));
  }else{
    //  C -> F formula : More accurate (num * 9/5) + 32
    updateScale();
    state.currentTemp = Math.ceil((state.currentTemp* (9/5)) + 32);
  }

  state.displayTemp.textContent = state.currentTemp;
};


const updateTempColor = () => {
  for (const [key, value] of Object.entries(tempColor)) {
    if (state.currentTemp >= Number(key)) {
      state.displayTemp.className = value;
      document.body.style.backgroundColor = value;
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
