'use strict';

const baseURL = 'https://ada-weather-report-proxy-server.onrender.com/';

// const TEMPER_COLOR = {
//   80: 'red',
//   70: 'orange',
//   60: 'yellow',
//   50: 'green',
//   [-Infinity]: 'teal',
// };

// const TEMPER_LANDSCAPE = {
//   80: `🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂`,
//   70: `🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷`,
//   60: `🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃`,
//   [-Infinity]: `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`,
// };

const temperatureRanges = [
  { min: 80, color: 'red', landscape: '🌵 🐍 🦂 🌵🌵 🐍 🏜 🦂' },
  { min: 70, color: 'orange', landscape: '🌸🌿🌼 🌷🌻🌿 ☘️🌱 🌻🌷' },
  { min: 60, color: 'salmon', landscape: '🌾🌾 🍃 🪨 🛤 🌾🌾🌾 🍃' },
  { min: 50, color: 'green', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' },
  { min: -Infinity, color: 'blue', landscape: '⛄️ ⛄️ ⛄️' }, // Default for temperatures <= 49
];

const SKY = {
  Sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  Cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  Rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  Snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const state = {
  defaultTemperature: 70,
  defaultSky: 'Sunny',
  defaultCityName: 'Seattle',
  // defaultLandscape: TEMPER_LANDSCAPE[70],
  defaultLandscape: temperatureRanges.find((range) => range.min <= 70)
    .landscape,
};

const elements = {
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

document.addEventListener('DOMContentLoaded', () => {
  elements.increaseTempControl.addEventListener('click', () => {
    changeTemperature(1);
  });

  elements.decreaseTempControl.addEventListener('click', () => {
    changeTemperature(-1);
  });

  elements.cityNameInput.addEventListener('input', () => {
    elements.headerCityName.textContent = elements.cityNameInput.value;
  });

  elements.currentTempButton.addEventListener(
    'click',
    async () => await updateTemp(),
  );

  elements.skySelect.addEventListener('change', () => {
    updateSky();
  });

  elements.cityNameReset.addEventListener('click', () => {
    elements.cityNameInput.value = state.defaultCityName;
    elements.headerCityName.textContent = state.defaultCityName;
  });
});

const changeTemperature = (change) => {
  elements.tempValue.textContent =
    parseInt(elements.tempValue.textContent) + change;

  updateTempRange();
  // updateTempColor();
  // updateLandscape();
};

const updateTempRange = () => {
  const temp = parseInt(elements.tempValue.textContent);
  for (const range of temperatureRanges) {
    if (temp >= range.min) {
      elements.tempValue.style.color = range.color;
      elements.landscape.textContent = range.landscape;
      return;
    }
  }
};

// const updateTempColor = () => {
//   const temp = parseInt(state.tempValue.textContent);

//   const thresholds = Object.keys(TEMPER_COLOR)
//     .map(Number)
//     .sort((a, b) => b - a);

//   for (const threshold of thresholds) {
//     if (temp >= threshold) {
//       state.tempValue.style.color = TEMPER_COLOR[threshold];
//       break;
//     }
//   }
// };

// const updateLandscape = () => {
//   const temp = parseInt(state.tempValue.textContent);

//   const thresholds = Object.keys(TEMPER_LANDSCAPE)
//     .map(Number)
//     .sort((a, b) => b - a);

//   for (const threshold of thresholds) {
//     if (temp >= threshold) {
//       state.landscape.textContent = TEMPER_LANDSCAPE[threshold];
//       return;
//     }
//   }
// };

const updateSky = () => {
  const selectedValue = elements.skySelect.value;
  elements.sky.textContent = SKY[selectedValue];

  const skyBackground = selectedValue.toLowerCase();

  const skyClasses = Object.keys(SKY).map((k) => k.toLowerCase());
  elements.gardenContent.classList.remove(...skyClasses);
  elements.gardenContent.classList.add(skyBackground);
};

const getLatitudeAndLongitude = (query) => {
  return axios
    .get(`${baseURL}location`, {
      params: {
        q: query,
      },
    })
    .then((response) => {
      const { lat: latitude, lon: longtitude } = response.data[0];
      return { latitude, longtitude };
    })
    .catch((error) => {
      console.log(
        `Failed to get latitude and longitude for ${query}: ${error}`,
      );
    });
};

const getCurrentTemp = (latitude, longtitude) => {
  return axios
    .get(`${baseURL}weather`, {
      params: {
        lat: latitude,
        lon: longtitude,
      },
    })
    .then((response) => {
      return response.data.main.temp;
    })
    .catch((error) => {
      console.log(
        `Failed to get current temperature for ${latitude}, ${longtitude}: ${error}`,
      );
    });
};

const kelvinToFahrenheit = (kelvin) => ((kelvin - 273.15) * 9) / 5 + 32;

const updateTemp = () => {
  const city = elements.cityNameInput.value;

  if (!city) {
    console.log('City name is empty. Please enter a valid city name.');
    alert('City name is empty. Please enter a valid city name.');
    return Promise.reject('City name is empty');
  }

  const cityLocation = getLatitudeAndLongitude(city);

  const cityCurrentTemp = cityLocation.then(({ latitude, longtitude }) => {
    return getCurrentTemp(latitude, longtitude);
  });

  return cityCurrentTemp.then((temp) => {
    const tempFahrenheit = kelvinToFahrenheit(temp);
    elements.tempValue.textContent = Math.round(tempFahrenheit);
    // updateTempColor();
    // updateLandscape();
    updateTempRange();
    return tempFahrenheit;
  });
};

const onload = () => {
  elements.tempValue.textContent = state.defaultTemperature;
  // updateTempColor();
  elements.landscape.textContent = state.defaultLandscape;
  // updateLandscape();
  updateTempRange();
  elements.skySelect.value = state.defaultSky;
  updateSky();
  elements.cityNameInput.value = state.defaultCityName;
  elements.headerCityName.textContent = state.defaultCityName;
};

window.addEventListener('load', onload);
