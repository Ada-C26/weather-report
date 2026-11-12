
"use strict";

let temperature = 65;

const temperatureElement = document.querySelector("#tempValue");
const increaseButton = document.querySelector("#increaseTempControl");
const decreaseButton = document.querySelector("#decreaseTempControl");
const landscapeElement = document.querySelector("#landscape");

// Temperature color changing based provided limits
const updateTemperatureColor = (newTemperature) => {
    if (newTemperature >= 80) {
        temperatureElement.style.color = "red";
    } else if (newTemperature >= 70) {
        temperatureElement.style.color = "orange";
    } else if (newTemperature >= 60) {
        temperatureElement.style.color = "yellow";
    } else if (newTemperature >= 50) {
        temperatureElement.style.color = "green";
    } else {
        temperatureElement.style.color = "teal";
    }
};

// Landscape
const updateLandscape = (newTemperature) => {
    if (newTemperature >= 80) {
        landscapeElement.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (newTemperature >= 70) {
        landscapeElement.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (newTemperature >= 60) {
        landscapeElement.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else {
        landscapeElement.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};

// Temperature+color+landscape
const updateTemperature = () => {
    temperatureElement.textContent = `${temperature}°F`;
    updateTemperatureColor(temperature);
    updateLandscape(temperature);
};

// Temperature +1
const increaseTemperature = () => {
    temperature += 1;
    updateTemperature();
};

// Temperature -1
const decreaseTemperature = () => {
    temperature -= 1;
    updateTemperature();
};

// Event listeners
increaseButton.addEventListener("click", increaseTemperature);
decreaseButton.addEventListener("click", decreaseTemperature);

// Temperature and landscape initialization showing
updateTemperature();
