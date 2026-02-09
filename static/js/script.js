const button = document.getElementById("getWeatherButton")
const resultDiv = document.getElementById("weatherResult");

button.addEventListener("click", getWeather);

function getWeather() {
  const latitude = 34.05;
  const longitude = -118.25;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temperature = data.current_weather.temperature;
      const windSpeed = data.current_weather.windspeed;

      resultDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = "Error fetching weather data.";
      console.error(error);
    });
}
