'use strict';

const TEMPER_COLOR = {
  80: 'red',
  70: 'orange',
  60: 'yellow',
  50: 'green',
  49: 'teal',
};

const TEMPER_LANDSCAPE = {
  80: `🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂`,
  70: `🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷`,
  60: `🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃`,
  59: `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`,
};

const state = {
  defaultTemperature: 70,
  defaultSky: 'Sunny',
  defaultCityName: 'Seattle',
  defaultLandscape: TEMPER_LANDSCAPE[70],

  increaseTempControl: document.getElementById('increaseTempControl'),
  decreaseTempControl: document.getElementById('decreaseTempControl'),
  tempValue: document.getElementById('tempValue'),
  currentTempButton: document.getElementById('currentTempButton'),
  skySelect: document.getElementById('skySelect'),
  cityNameInput: document.getElementById('cityNameInput'),
  cityNameReset: document.getElementById('cityNameReset'),
  headerCityName: document.getElementById('headerCityName'),
  gardenContent: document.getElementById('gardenContent'),
  sky: document.getElementById('sky'),
  landscape: document.getElementById('landscape'),
};

state.increaseTempControl.addEventListener('click', () => {
  state.tempValue.textContent = parseInt(state.tempValue.textContent) + 1;
  updateTempColor(state.tempValue.textContent);
  updateLandscape(state.tempValue.textContent);
});
state.decreaseTempControl.addEventListener('click', () => {
  state.tempValue.textContent = parseInt(state.tempValue.textContent) - 1;
  updateTempColor(state.tempValue.textContent);
  updateLandscape(state.tempValue.textContent);
});

const updateTempColor = (temp) => {
  if (temp >= 80) {
    state.tempValue.style.color = TEMPER_COLOR[80];
  } else if (temp >= 70) {
    state.tempValue.style.color = TEMPER_COLOR[70];
  } else if (temp >= 60) {
    state.tempValue.style.color = TEMPER_COLOR[60];
  } else if (temp >= 50) {
    state.tempValue.style.color = TEMPER_COLOR[50];
  } else {
    state.tempValue.style.color = TEMPER_COLOR[49];
  }
};

const updateLandscape = (temp) => {
  if (temp >= 80) {
    state.landscape.textContent = TEMPER_LANDSCAPE[80];
  } else if (temp >= 70) {
    state.landscape.textContent = TEMPER_LANDSCAPE[70];
  } else if (temp >= 60) {
    state.landscape.textContent = TEMPER_LANDSCAPE[60];
  } else {
    state.landscape.textContent = TEMPER_LANDSCAPE[59];
  }
};

const onload = () => {
  state.tempValue.textContent = state.defaultTemperature;
  updateTempColor(state.tempValue.textContent);
  state.skySelect.value = state.defaultSky;
  state.cityNameInput.value = state.defaultCityName;
  state.headerCityName.textContent = state.defaultCityName;
  state.landscape.textContent = state.defaultLandscape;
  updateLandscape(state.tempValue.textContent);
};

window.addEventListener('load', onload);
