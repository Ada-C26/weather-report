// Temp control variables
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const tempValue = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');

let temperature = 50;

tempValue.textContent = `${temperature}°F`;

// Update temperature display color and landscapes
const updateTempGraphics = (temperature) => {
    if (temperature >= 90) {
        tempValue.style.color = 'red';
        changeLandscape('desert.jpg');
    } else if (temperature < 90 && temperature >= 80) {
        tempValue.style.color = 'pink';
        changeLandscape('beach.jpg');
    } else if (temperature < 80 && temperature >= 70) {
        tempValue.style.color = 'orange'
        changeLandscape('meadow.jpg');
    } else if (temperature < 70 && temperature >= 60) {
        tempValue.style.color = 'yellow'
        changeLandscape('springs.jpg');
    } else if (temperature < 60 && temperature >= 50) {
        tempValue.style.color = 'green'
        changeLandscape('forest.jpg');
    } else if (temperature < 50 && temperature >= 40) {
        tempValue.style.color = 'teal'
        changeLandscape('mist.jpg');
    } else {
        tempValue.style.color = 'blue'
        changeLandscape('snow.jpg');
    }
};

const changeLandscape = (imageName) => {
    const image = document.createElement('img');
    image.src = `./assets/landscape_photos/${imageName}`;
    landscape.replaceChildren(image);
}

// Increase temperature
const increaseTemperature = () => {
    temperature += 1;
    tempValue.textContent = `${temperature}°F`;
    updateTempGraphics(temperature);
};

// Decrease temperature
const decreaseTemperature = () => {
    temperature -= 1;
    tempValue.textContent = `${temperature}°F`;
    updateTempGraphics(temperature);
};

updateTempGraphics(temperature);

// Event logic
decreaseTempControl.addEventListener('click', decreaseTemperature);
increaseTempControl.addEventListener('click', increaseTemperature);
