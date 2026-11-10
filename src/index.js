let temperature = 51;
const increaseControl = document.getElementById("increase_control")
const temperatureValue = document.getElementById("temperature_value")
const decreaseControl = document.getElementById("decrease_control")
const landscape = document.getElementById("emojis");

function updateTemperatureColor() {
    temperatureValue.textContent = temperature;

    if (temperature >= 80) {
        temperatureValue.style.color = "red";
    } else if (temperature >= 70) {
        temperatureValue.style.color = "orange";
    } else if (temperature >= 60) {
        temperatureValue.style.color = "yellow";
    } else if (temperature >= 50) {
        temperatureValue.style.color = "green";
    } else {
        temperatureValue.style.color = "teal";
    }
}

function updateLandscape() {
    temperatureValue.textContent = temperature;

    if (temperature >= 80) {
        landscape.textContent= "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temperature >= 70) {
        landscape.textContent= "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temperature >= 60) {
        landscape.textContent= "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else {
        landscape.textContent= "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
}

increaseControl.addEventListener("click",() => {
    temperature += 1;
    updateTemperatureColor ();
    updateLandscape();
});

decreaseControl.addEventListener("click",() => {
    temperature -= 1;
    updateTemperatureColor ();
    updateLandscape();
});

updateTemperatureColor();
updateLandscape();

