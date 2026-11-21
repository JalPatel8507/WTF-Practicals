
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "Please enter a city name.";
        return;
    }

    result.innerHTML = "Loading weather information...";

    try {
        // Get city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "City not found. Try another city.";
            return;
        }

        const location = geoData.results[0];

        // Get current weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();
        const weather = weatherData.current;

        result.innerHTML = `
            <h2>${location.name}, ${location.country}</h2>
            <h1>${weather.temperature_2m} °C</h1>
            <p><strong>Humidity:</strong> ${weather.relative_humidity_2m}%</p>
            <p><strong>Wind Speed:</strong> ${weather.wind_speed_10m} km/h</p>
            <p><strong>Time:</strong> ${weather.time}</p>
        `;

    } catch (error) {
        result.innerHTML = "Unable to fetch weather data. Please try again.";
        console.error(error);
    }
}
