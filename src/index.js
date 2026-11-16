const state = {
  temperature: 70,
  degree: 'F',
};

// DOM elements
const tempValue = document.getElementById('tempValue');
const tempUp = document.getElementById('increaseTempControl');
const tempDown = document.getElementById('decreaseTempControl');
const fahrenheit = document.getElementById('fahrenheit');
const celsius = document.getElementById('celsius');
const cityNameInput = document.getElementById('cityNameInput');
const cityNameDisplay = document.getElementById('headerCityName');
const currentTempButton = document.getElementById('currentTempButton');
const resetButton = document.getElementById('reset');
const skySelect = document.getElementById('skySelect');

const convertKtoF = (K) => {
  const F = (K - 273.15) * (9 / 5) + 32;
  return Math.round(F);
};

const convertFtoC = (F) => {
  const C = (F - 32) / 1.8;
  return Math.round(C);
};

const updateTemperature = () => {
  if (state.degree === 'F') {
    tempValue.textContent = state.temperature;
  } else if (state.degree === 'C') {
    tempValue.textContent = convertFtoC(state.temperature);
  }
};

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
    skyDisplay.textContent = '☁️ ☀️☀️☁️ ☀️☁️☀️☁️ ☀️☀️';
    background.style.backgroundImage = "url('./assets/sunny.jpg')";
  } else if (sky === 'Cloudy') {
    skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    background.style.backgroundImage = "url('./assets/cloudy.jpg')";
  } else if (sky === 'Rainy') {
    skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧';
    background.style.backgroundImage = "url('./assets/rainy.jpg')";
  } else if (sky === 'Snowy') {
    skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨';
    background.style.backgroundImage = "url('./assets/snowy.jpg')";
  }
};

const renderTemperature = () => {
  updateTemperature();
  tempColorChange();
  changeLandscape();
  changeSky();
};

const tempApiCall = async () => {
  try {
    const apiTemp = await getWeather(cityNameInput.value);
    state.temperature = convertKtoF(apiTemp.temp);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateCityName = () => {
  cityNameDisplay.textContent = cityNameInput.value;
};

const resetCityName = () => {
  cityNameDisplay.textContent = 'Seattle';
  cityNameInput.value = 'Seattle';
};

const registerEventHandlers = () => {
  tempUp.addEventListener('click', () => {
    state.temperature += 1;
    renderTemperature();
  });
  tempDown.addEventListener('click', () => {
    state.temperature -= 1;
    renderTemperature();
  });
  cityNameInput.addEventListener('input', () => {
    updateCityName();
  });
  resetButton.addEventListener('click', () => {
    resetCityName();
    state.temperature = 70;
    state.degree = 'F';
    fahrenheit.checked = true;
    renderTemperature();
  });
  currentTempButton.addEventListener('click', async () => {
    await tempApiCall();
    renderTemperature();
  });
  skySelect.addEventListener('change', () => {
    changeSky();
  });
  fahrenheit.addEventListener('change', () => {
    state.degree = 'F';
    renderTemperature();
  });
  celsius.addEventListener('change', () => {
    state.degree = 'C';
    renderTemperature();
  });
};

renderTemperature();

document.addEventListener('DOMContentLoaded', registerEventHandlers);
