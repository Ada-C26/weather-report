"use strict";




























//-----Wave 3-----
//get the two elements from index.html
const cityNameInput = document.getElementById("cityNameInput");
const headerCityName = document.getElementById("headerCityName");

//user input = text of the header
const updateCityName = () => {
    headerCityName.textContent = cityNameInput.value;
};

//run updateCityName when input changes
const registerEventHandlers = () => {
    cityNameInput.addEventListener("input", updateCityName);
};

//when the page is finished loading, run our two functions
document.addEventListener("DOMContentLoaded", () => {
    updateCityName();
    registerEventHandlers();
});
