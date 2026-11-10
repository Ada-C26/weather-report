'use strict';

const cityInput = document.querySelector('#cityNameInput');
const cityHeader = document.querySelector('#headerCityName');

cityHeader.textContent = cityInput.value;

cityInput.addEventListener('input' , () => {
  cityHeader.textContent = cityInput.value;
});