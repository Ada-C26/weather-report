"use strict";

//Grab elements from index.html
const cityNameInput = document.getElementById("cityNameInput");//Wave3
const headerCityName = document.getElementById("headerCityName");//Wave3


//Starting data


//Temp color change


//Temp landscape change


//Temp display


//Temp buttons, increase and decrease


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
