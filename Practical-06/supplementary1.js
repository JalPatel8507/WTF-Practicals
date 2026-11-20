
window.onload = function() {
    let savedCity = localStorage.getItem("preferredCity");

    if (savedCity) {
        document.getElementById("city").value = savedCity;
        getWeather();
    }
};

async function getWeather() {

    let city = document.getElementById("city").value.trim();
    let weather = document.getElementById("weather");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    weather.innerHTML = "<p>Loading weather information...</p>";

    try {

        // Get city coordinates
        let locationResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) + "&count=1&language=en&format=json"
        );

        if (!locationResponse.ok) {
            throw new Error("Unable to find city!");
        }

        let locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found!");
        }

        let location = locationData.results[0];

        let latitude = location.latitude;
        let longitude = location.longitude;

        // Save preferred city
        localStorage.setItem("preferredCity", city);

        // Get current weather
        let weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude + "&longitude=" + longitude +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m"
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to retrieve weather!");
        }

        let weatherData = await weatherResponse.json();

        let current = weatherData.current;

        weather.innerHTML = `
            <h2>Weather in ${location.name}</h2>
            <p><strong>Temperature:</strong> ${current.temperature_2m} °C</p>
            <p><strong>Feels Like:</strong> ${current.apparent_temperature} °C</p>
            <p><strong>Humidity:</strong> ${current.relative_humidity_2m}%</p>
            <p><strong>Wind Speed:</strong> ${current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {

        weather.innerHTML =
            "<p style='color:red;'>" + error.message + "</p>";

    }
}
