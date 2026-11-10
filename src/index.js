'use strict';

const state ={
    currentTemp : 49,
    displayTemp :0,
    increaseBtn: null,
    decreaseBtn: null
};

// | Temperature (F) | Color  |
// | --------------- | ------ |
// | 80+             | Red    |
// | 70-79           | Orange | current 75
// | 60-69           | Yellow |
// | 50-59           | Green  |
// | 49 or below     | Teal   |

//  for t tempColor
//  if (temp >= tempColor[0]) {
//  else if  (temp  < tempColor[0] and  temp >= tempColor[1]) {. => 70 79
//  set text color tempColor[0].value

const tempColor = [
    { 80 : 'red'},  
    { 70 : 'orange'},
    { 60 : 'yellow'},
    { 50 : 'green'},
    { 49 : 'teal'},
]

const increaseTemperature = () => {
    state.currentTemp += 1;
    state.displayTemp.textContent = state.currentTemp;
    updateTempColor();
};

const decreaseTemperature = () => {
    state.currentTemp -= 1;
    state.displayTemp.textContent = state.currentTemp;
    updateTempColor();
};

const initUI = () =>{
    state.displayTemp = document.getElementById('tempValue');
    state.displayTemp.textContent = state.currentTemp;

    state.increaseBtn = document.getElementById('increaseTempControl');
    state.decreaseBtn = document.getElementById('decreaseTempControl');
    
    updateTempColor();
    
    handleEvent();
}

const updateTempColor = () => {
    if (state.currentTemp >= tempColor[0]) { // 80+
        state.displayTemp.tempColor = tempColor[0].value;
    }else if (state.currentTemp < tempColor[0] && state.currentTemp >= tempColor[1]) {  // 70-79 
        state.displayTemp.tempColor = tempColor[1].value;
    } else if (state.currentTemp < tempColor[1] && state.currentTemp >= tempColor[2]) {  // 60-69 
        state.displayTemp.tempColor = tempColor[2].value;
    } else if (state.currentTemp < tempColor[2] && state.currentTemp >= tempColor[3]){ // 50-59 
        state.displayTemp.tempColor = tempColor[3].value;
    }else{
        state.displayTemp.tempColor = tempColor[4].value;
    }
};

const handleEvent = () =>{
    state.increaseBtn.addEventListener('click', () => {
        increaseTemperature();
    });

    state.decreaseBtn.addEventListener('click', () => {
        decreaseTemperature();
    });
};

initUI();
