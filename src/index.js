'use strict';

// DOM elements
const cityInput = document.querySelector('#cityNameInput');
const cityHeader = document.querySelector('#headerCityName');
const skySelect = document.querySelector('#skySelect');
const sky = document.querySelector('#sky');
const gardenContent = document.querySelector('#gardenContent');


// Wave 3: City Name
function updateCityName() {
  cityHeader.textContent = cityInput.value;
}

cityInput.addEventListener('input', updateCityName);

// Display initial city name
updateCityName();

// Wave 4: API calls






// Wave 5: Sky selection
function updateSky() {
  gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

  if (skySelect.value === 'Sunny') {
    sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    gardenContent.classList.add('sunny');
  }
  else if (skySelect.value === 'Cloudy') {
    sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    gardenContent.classList.add('cloudy');
  }
  else if (skySelect.value === 'Rainy') {
    sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    gardenContent.classList.add('rainy');
  }
  else if (skySelect.value === 'Snowy') {
    sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    gardenContent.classList.add('snowy');
  }
}
// Display default sky and listen for changes
updateSky();
skySelect.addEventListener('change', updateSky);



// Wave 6: Reset city name