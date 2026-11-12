'use strict';

const state ={
  currentTemp : 49,
  displayTemp :0,
  increaseBtn: null,
  decreaseBtn: null,
  cityNameInput: null,
  currentTempBtn: null,
};

const tempColor = {
  80: 'red',
  70: 'orange',
  60: 'yellow',
  50: 'green',
  0: 'teal',
};


const increaseTemperature = () => {
  state.currentTemp += 1;
  state.displayTemp.textContent = state.currentTemp;
  updateTempColor();
};

const decreaseTemperature = () => {
  state.currentTemp -= 1;
  state.displayTemp.textContent = state.currentTemp;
  updateTempColor();
};

const initUI = () =>{
  state.displayTemp = document.getElementById('tempValue');
  state.displayTemp.textContent = state.currentTemp;

  state.increaseBtn = document.getElementById('increaseTempControl');
  state.decreaseBtn = document.getElementById('decreaseTempControl');
  state.cityNameInput = document.getElementById('cityNameInput');
  state.currentTempBtn = document.getElementById('currentTempButton');

  updateTempColor();

  handleEvent();
};

const updateTempColor = () => {
  for (const [key, value] of Object.entries(tempColor)) {
    if (state.currentTemp >= Number(key)) {
      state.displayTemp.style.color = value;
    }
  }
};

const getRealtimeTemperature = () => {
  const cityName = state.cityNameInput.value.trim();
  console.log('Getting temperature for:', cityName);
};

const handleEvent = () =>{
  state.increaseBtn.addEventListener('click', () => {
    increaseTemperature();
  });

  state.decreaseBtn.addEventListener('click', () => {
    decreaseTemperature();
  });

  state.currentTempBtn.addEventListener('click', getRealtimeTemperature);
};

initUI();
