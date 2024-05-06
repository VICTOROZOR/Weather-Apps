function getWeather() {
  const apiKey = "95b972b465343cab24e43841683998f1";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data: ", error);
      alert("Error fetching current weather data. Please try again.");
    });

  function displayHourlyForecast(houlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast')
  const next24Hours = houlyData.slice(0, 8)

  next24Hours.forEach(item => {
    const dataTime = new Date(item.dt * 1000)
    const hour = dataTime.getHours()
    const temperature = Math.round(item.main.temp - 273.15)
    const iconCode = item.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`
  })
}

  
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data: ", error);
      alert("Error fetching hourly forecast data. Please try again.");
    });
}

function displayWeather(data) {
  const tempInfo = document.getElementById("temp-div");
  const weatherInfo = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecast = document.getElementById(hourly - forecast);

  weatherInfo.innerHTML = " ";
  hourlyForecast.innerHTML = " ";
  tempInfo.innerHTML = " ";

  if (data.cod === "404") {
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.cityName;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

     const temperatureHTML = `<p>${temperature}oC</p>`
    const weatherHtml = `<p>${cityName}</p> <p>${description}</p>`

    tempInfo.innerHTML = temperatureHTML
    weatherInfo.innerHTML = weatherHtml
    weatherIcon.src = iconUrl
    weatherIcon.alt = description
    showImage()
  }
}
