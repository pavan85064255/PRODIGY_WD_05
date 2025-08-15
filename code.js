async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherInfo");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    weatherDiv.innerHTML = "<p>Loading...</p>";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const temp = data.main.temp;
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind} m/s</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
