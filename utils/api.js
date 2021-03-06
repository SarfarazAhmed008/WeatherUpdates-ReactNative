export const fetchLocationId = async city => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`,
  );
  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async woeid => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`,
  );
  const { title, consolidated_weather} = await response.json();
  const { weather_state_name, min_temp, max_temp, the_temp, humidity } = consolidated_weather[0];

  return {
      location: title,
      weather: weather_state_name,
      minTemp: min_temp,
      maxTemp: max_temp,
      temperature: the_temp,
      humidity: humidity,
  };
};
