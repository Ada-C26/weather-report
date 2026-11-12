"use strict";


//Grab elements from index.html
const cityNameInput = document.getElementById("cityNameInput");//Wave3
const headerCityName = document.getElementById("headerCityName");//Wave3
const tempValue = document.getElementById("tempValue");//Wave2
const landscape = document.getElementById("landscape");//Wave2
const increaseTempControl = document.getElementById("increaseTempControl");//Wave2
const decreaseTempControl = document.getElementById("decreaseTempControl");//Wave2

//Default data
let temperature = 62;//Wave2

tempValue.textContent = temperature + "°F"; //textContent changes the text inside an HTML element

// function updates the number, color and landscape shown in HTML
const updateTempDisplay = () => {
    tempValue.textContent = `${temperature}°F`;
    updateTempColor();
    updateLandscape();
};

// Increase the temperature.
const increaseTemp = () => {
    temperature++;
    updateTempDisplay();
};

// Decrease the temperature.
const decreaseTemp = () => {
    temperature--;
    updateTempDisplay();
};

// Register event handlers for temperature controls.
const registerTempEventHandlers = () => {
    increaseTempControl.addEventListener("click", increaseTemp);
    decreaseTempControl.addEventListener("click", decreaseTemp);
};

// Initialize the temperature display and register event handlers.
document.addEventListener("DOMContentLoaded", () => {
    updateTempDisplay();
    registerTempEventHandlers();
});

// Change the temperature color based on the temperature.
const updateTempColor = () => {
    if (temperature >= 80) {
        tempValue.style.color = "red";
    } else if (temperature >= 70) {
        tempValue.style.color = "orange";
    } else if (temperature >= 60) {
        tempValue.style.color = "yellow";
    } else if (temperature >= 50) {
        tempValue.style.color = "green";
    } else {
        tempValue.style.color = "teal";
    }
};

// Change the landscape based on the temperature.
const updateLandscape = () => {
    if (temperature >= 80) {
        landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜️_🦂";
    } else if (temperature >= 70) {
        landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temperature >= 60) {
        landscape.textContent = "🌾🌾_🍃_🪨__🛤️_🌾🌾🌾_🍃";
    } else {
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};


//Update city name
const updateCityName = () => {
    headerCityName.textContent = cityNameInput.value;//Wave3
};




//Listeners
const registerEventHandlers = () => {
    cityNameInput.addEventListener("input", updateCityName);//Wave3
};


//Page loading tasks
document.addEventListener("DOMContentLoaded", () => {
    updateCityName();//Wave3
    registerEventHandlers();//Wave3
});
