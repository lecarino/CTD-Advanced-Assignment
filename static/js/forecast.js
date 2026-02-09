console.log("Forecast JS loaded");

// Inputs
const latitudeUser = document.getElementById("latitude");
const longitudeUser = document.getElementById("longitude");
const button = document.getElementById("getForecastButton");

// Results container
const forecastResults = document.getElementById("forecastResults");

// Click event
button.addEventListener("click", getForecast);

// Get Forecast using API
function getForecast() {
    const latitude = latitudeUser.value;
    const longitude = longitudeUser.value;

    // If no inputs
    console.log("Forecast clicked:", latitude, longitude);
    if (!latitude || !longitude) {
    alert("Please enter both latitude and longitude");
    return;
    }

     // If wrong inputs
    if (latitude < -90 || latitude > 90) {
        alert("Latitude must be between -90 and 90");
        return;
    } else if (longitude < -180 || longitude > 180){
        alert("Longitude must be between -180 and 180 degrees");
        return;
    } else if ((latitude < -90 || latitude > 90) && (longitude < -180 || longitude > 180)) {
        alert("Latitude must be between -90 and 90 and Longitude must be between -180 and 180");
        return;
    } 

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weathercode&timezone=auto`
    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log("Forecast data:", data);
    
        displayForecast(data.daily, data.timezone);
        });
    }

// Display Forecast for the next 7 days
function displayForecast(daily,timezone) {
    forecastResults.innerHTML = ""; // Clear old results

    for (let i = 0; i < daily.time.length; i++) {
        const dayHTML = `
            <div class="forecast-day">
                <h2>${daily.time[i]}</h2>

                <div class="results-row"> 
                    <p class="results-p">Max Temp:</p> 
                    <p> ${daily.temperature_2m_max[i]}°C or ${((daily.temperature_2m_max[i] * 9/5) + 32).toFixed(1)}°F</p>
                </div>

                <div class="results-row"> 
                    <p class="results-p">Min Temp:</p> 
                    <p> ${daily.temperature_2m_min[i]}°C or ${((daily.temperature_2m_min[i] * 9/5) + 32).toFixed(1)}°F</p>
                </div>

                <div class="results-row"> 
                    <p class="results-p">Precipitation:</p> 
                    <p>${daily.precipitation_sum[i]} mm</p>
                </div>

                <div class="results-row"> 
                    <p class="results-p">Wind Speed:</p> 
                    <p> ${daily.wind_speed_10m_max[i]} km/h</p>
                </div>

                <div class="results-row"> 
                    <p class="results-p">Condition:</p> 
                    <p> ${getWeatherDescription(daily.weathercode[i])}</p>
                </div>

                <div class="results-row"> 
                    <p class="results-p">Timezone:</p> 
                    <p> ${timezone}</p>
                </div>
            </div>
            <hr>
        `;

    forecastResults.innerHTML += dayHTML;
    }
}

// Turn weather codes to readable text for user
function getWeatherDescription(code) {
    const weatherMap = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Rime fog",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",
        56: "Freezing light drizzle",
        57: "Freezing dense drizzle",
        61: "Light rain",
        63: "Rain",
        65: "Heavy rain",
        66: "Freezing light rain",
        67: "Freezing heavy rain",
        71: "Light snow",
        73: "Snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Moderate snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    return weatherMap[code] || "Unknown weather";
}
