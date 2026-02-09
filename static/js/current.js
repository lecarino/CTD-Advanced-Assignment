// console.log("Current weather JS loaded");
const longitudeUser = document.getElementById("longitude");
const latitudeUser = document.getElementById("latitude");
const button = document.getElementById("getWeatherButton");

button.addEventListener("click", getCurrentWeather);

// Get current weather function from API
function getCurrentWeather() {
    const latitude = latitudeUser.value;
    const longitude = longitudeUser.value;

    console.log("Clicked:", latitude, longitude);

    // If no input
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

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,wind_speed_10m&timezone=auto`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data);

        const current = data.current;

        document.getElementById("temperature").textContent = current.temperature_2m + " °C or " + ((current.temperature_2m * 9/5) + 32).toFixed(1) + " °F";
        document.getElementById("isDay").textContent = current.is_day === 1 ? "Day" : "Night";
        document.getElementById("precipitation").textContent = current.precipitation + " mm";
        document.getElementById("windSpeed").textContent = current.wind_speed_10m;
        document.getElementById("timezone").textContent = data.timezone;
         })

    .catch(error => {
      console.error("Error fetching weather:", error);
    });
}
