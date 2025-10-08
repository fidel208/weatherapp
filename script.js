const form = document.getElementById("weather-form");
const locationInput = document.getElementById("location");
const timeInput = document.getElementById("time");
const resultContainer = document.getElementById("result");
const loading = document.getElementById("loading");

const apikey = "6AD52FSWF7NT79EN5RD6RDEFS";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  const time = timeInput.value;

  if (!location) {
    console.warn("Please, enter location");
    resultContainer.innerHTML = "<p>Please enter a location</p>";
    return;
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apikey}&contentType=json`;

  loading.innerHTML = `<div class="spinner"></div><p>Fetching weather data...</p>`;
  loading.style.visibility = "visible";
  resultContainer.innerHTML = "";


  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {

      loading.style.visibility = "hidden";


      const weather = data.currentConditions;
      const condition = weather.conditions;
      const temperature = weather.temp;
      const humidity = weather.humidity;
      const wind = weather.windspeed;
      const address = data.resolvedAddress;

      resultContainer.innerHTML = `
      <h2> ${address}</h2>
      <p><b>Condition: </b> ${condition}</p>
      <p><b>Temperature: </b> ${temperature} &deg;C</p>
      <p><b>Humidity: </b> ${humidity}</p>
      <p><b>wind: </b> ${wind}</p>
      <div id="icon"></div>`;

      loadWeatherIcon(condition);
    })
    .catch((error) => {
      console.error("❌ Error fetching weather data:", error);
      resultContainer.innerHTML = "<p>Failed to fetch weather data.</p>";
    });

  function loadWeatherIcon(condition) {
    const iconName = condition.toLowerCase().replace(/\s+/g, "-");
    const iconBox = document.getElementById("icon");

    const icons = {
      clear: "sun.svg",
      rain: "rain.svg",
      cloudy: "cloud.svg",
      snow: "snow.svg",
    };

    const iconFile = icons[iconName] || "default.svg";
    iconBox.innerHTML = `<img src="icons/${iconFile}" alt="${condition}" width="50px">`;

  }
});

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  loader.classList.add("hidden");
});
