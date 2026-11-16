"use strict";


//Grab elements from index.html
const cityNameInput = document.getElementById("cityNameInput");//Wave3
const headerCityName = document.getElementById("headerCityName");//Wave3
const tempValue = document.getElementById("tempValue");//Wave2
const landscape = document.getElementById("landscape");//Wave2
const increaseTempControl = document.getElementById("increaseTempControl");//Wave2
const decreaseTempControl = document.getElementById("decreaseTempControl");//Wave2
const sky = document.getElementById("sky"); // Wave 5
const skySelect = document.getElementById("skySelect"); // Wave 5

//Default data
let temperature = 62;//Wave2

tempValue.textContent = temperature + "°F"; //textContent changes the text inside an HTML element

// function updates the number, color and landscape shown in HTML
const updateTempDisplay = () => {
    tempValue.textContent = `${temperature}°F`;
    updateTempColor();
    updateLandscape();
    updateSky(); // Wave 5
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
    updateCityName();//Wave3
    registerEventHandlers();//Wave3
    updateSky(); //Wave 5

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
    currentTempButton.addEventListener("click", getRealtimeTemp);
    skySelect.addEventListener("change", updateSky); // Wave 5
    cityNameReset.addEventListener("click", resetCityName);//Wave 6
};




//----------WAVE 4 ----------
//connect proxy to website
const PROXY_URL = "http://127.0.0.1:5001";

//grab the button
const currentTempButton = document.getElementById("currentTempButton");

//city name -> latitude and longitude from LocationIQ
const getLatLon = async(city) => {
    const response = await axios.get(`${PROXY_URL}/location`, {
        params: { q: city },
    });
    const firstResult = response.data[0];
    return { lat: firstResult.lat, lon: firstResult.lon };
};

//lat & long -> temp in Kelvin
const getTempKelvin = async (lat, lon) => {
    const response = await axios.get(`${PROXY_URL}/weather`, {
        params: { lat: lat, lon: lon},
    });
    return response.data.main.temp;
};

//Kelvin -> Fahrenheit
const kelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * (9/5) + 32);
};

//click the button
const getRealtimeTemp = async () => {
    try {
        const city = headerCityName.textContent;
        const { lat, lon } = await getLatLon(city);
        const kelvin = await getTempKelvin(lat, lon);
        temperature = kelvinToFahrenheit(kelvin);
        updateTempDisplay();
    } catch (error) {
        console.log("Couldn't get the temperature:", error);
    }
};

//---------Wave 5 ------------------------

// Change the sky based on the selected option.
const updateSky = () => {
    const selectedSky = skySelect.value;

    if (selectedSky === "Sunny") {
        sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    } else if (selectedSky === "Cloudy") {
        sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
    } else if (selectedSky === "Rainy") {
        sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    } else if (selectedSky === "Snowy") {
        sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    }
};


//---------Wave 6-------------------------
const DEFAULT_CITY = "Seattle";

const cityNameReset = document.getElementById("cityNameReset");

const resetCityName = () => {
    cityNameInput.value = DEFAULT_CITY;
    updateCityName();
};
