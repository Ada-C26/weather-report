//create a function to change colors

const changeTempColor = (temp) => {
    if (temp >= 80) return 'temp--red';
    if (temp >= 70) return 'temp--orange';
    if (temp >= 60) return 'temp--yellow';
    if (temp >= 50) return 'temp--green';
    else return 'temp--teal';
};


//create a function to change landscape                            
const changeLandscape = (temp) => {                                 
    if (temp >= 80) return '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';               
    if (temp >= 70) return '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';               
    if (temp >= 60) return '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';                
    else return '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';                        
};  


//increase, decrease bottom
const increase = document.getElementById('increaseTemp');
const decrease = document.getElementById('decreaseTemp');
const display = document.getElementById('temparature_display');   
const landscape = document.getElementById('landscape'); 
let temperature = 68;                                              

increase.addEventListener('click', () => {
    temperature++;
    display.textContent = `${temperature}°F`;
    display.className = changeTempColor(temperature);  
    landscape.textContent = changeLandscape(temperature);            
});


decrease.addEventListener('click', () => {
    temperature--;
    display.textContent = `${temperature}°F`;
    display.className = changeTempColor(temperature);
    landscape.textContent = changeLandscape(temperature);               
});

display.className = changeTempColor(temperature);                  
landscape.textContent = changeLandscape(temperature); 

//change city name
const cityinput = document.getElementById('cityinput')
const changeCity = document.getElementById('changecity');
const cityName = document.querySelector('.cityname_head');

changeCity.addEventListener('click', () => {
    const newcity = cityinput.value;
    cityName.textContent = newcity;
});

//find realtime weather
const findLatitudeAndLongitude = (query) => {
  return axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: query,
    }
  })
    .then((response) => {
      console.log("Location API response:", response.data);
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);

      return {latitude,longitude};
    })
    .catch( (error) => {
      console.log('error in findLatitudeAndLongitude!');
      throw error;
    });  
};

const findWeather = (latitude, longitude) => {
  return axios.get('http://127.0.0.1:5000/weather', {
    params: {
      lat: latitude,
      lon: longitude,
    }
  })
    .then((response) => {
      console.log('success in finding weather!');
      return response.data;
    })
    .catch( (error) => {
      console.log('error in finding weather!');
      throw error;
    });  
};

const realtimeweather = document.getElementById('realtime_weather');

realtimeweather.addEventListener('click', () => {
   const currentcity = cityName.textContent;

   findLatitudeAndLongitude(currentcity)
   .then((coordinates) => {
    return findWeather(
      coordinates.latitude,
      coordinates.longitude
    );
  })

  .then((weather) => {
    const kelvin = weather.main.temp;
    temperature = Math.round((kelvin - 273.15) * (9 / 5) + 32);

    display.textContent = `${temperature}°F`;
    display.className = changeTempColor(temperature);
    landscape.textContent = changeLandscape(temperature);
  })

  .catch((error) => {
    console.log(error);
    throw error;
  });
});


//change sky
const changeSky = (sky) => {
    if (sky === 'sunny') return '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    if (sky === 'cloudy') return '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    if (sky === 'rainy') return '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    if (sky === 'snowy') return '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
};

const skySelect = document.getElementById('skySelect');
const skyDisplay = document.getElementById('skyDisplay');

skySelect.addEventListener('change', () => {
    skyDisplay.textContent = changeSky(skySelect.value);
});

skyDisplay.textContent = changeSky(skySelect.value);

//reset city
const resetinput = document.getElementById('resetcity')

resetinput.addEventListener('click', () => {
    cityName.textContent = 'Seattle';
    cityinput.value='';
});