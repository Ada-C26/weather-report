'use strict';

const state = {
    currentTemp: 0,
    displayTemp: 0,
    increaseBtn: null,
    decreaseBtn: null,
    displayLandscape: null,
};

const tempColor = {
    80: 'red',
    70: 'orange',
    60: 'yellow',
    50: 'green',
    0: 'teal',
};

const landscapeBackground = [
    [ '-128.6', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' ],
    [ 60, '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃' ],
    [ 70, '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷' ],
    [ 80, '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂' ],
];


const increaseTemperature = () => {
    state.currentTemp += 1;
    state.displayTemp.textContent = state.currentTemp;
    updateTempColor();
    updateLandscape();
};

const decreaseTemperature = () => {
    state.currentTemp -= 1;
    state.displayTemp.textContent = state.currentTemp;
    updateTempColor();
    updateLandscape();
};

const initUI = () =>{
    state.displayTemp = document.getElementById('tempValue');
    state.displayTemp.textContent = state.currentTemp;
    state.increaseBtn = document.getElementById('increaseTempControl');
    state.decreaseBtn = document.getElementById('decreaseTempControl');
    state.displayLandscape = document.getElementById('landscape');

    updateTempColor();
    updateLandscape();

    handleEvent();
};

const updateTempColor = () => {
    for (const [key, value] of Object.entries(tempColor)) {
        if (state.currentTemp >= Number(key)) {
            state.displayTemp.style.color = value;
    }
    }
};

// const updateLandscape = () => {
//     for (const [key, value] of Object.entries(landscapeBackground)) {
//         if (state.currentTemp >= Number(key)) {
//             state.displayLandscape.textContent = value;
//     }
//     }
// };

    const updateLandscape = () => {
        for (const item of landscapeBackground) {
            if (state.currentTemp >= Number(item[0])) {
                state.displayLandscape.textContent = item[1];
            }
        }
    }

const handleEvent = () => {
    state.increaseBtn.addEventListener('click', () => {
        increaseTemperature();
    });

    state.decreaseBtn.addEventListener('click', () => {
        decreaseTemperature();
    });
};

initUI();
