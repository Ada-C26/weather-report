const findLatitudeAndLongitude = async (query) => {
  const response = await axios.get(
    'https://ada-weather-report-proxy-server.onrender.com/location',
    {
      params: {
        q: query,
        format: 'json',
      },
    },
  );

  const lat = response.data[0].lat;
  const lon = response.data[0].lon;

  console.log('success in findLatitudeAndLongitude!', lat, lon);

  return { lat, lon };
};

const getWeatherByLocation = async (lat, lon) => {
  const response = await axios.get(
    'https://ada-weather-report-proxy-server.onrender.com/weather',
    {
      params: {
        lat: lat,
        lon: lon,
        format: 'json',
      },
    },
  );

  const temp = response.data.main.temp;
  console.log('success in getWeatherByLocation!', temp);

  return { temp };
};

// assigning the function globally, like export
window.getWeather = async (query) => {
  const coord = await findLatitudeAndLongitude(query);
  return await getWeatherByLocation(coord.lat, coord.lon);
};
