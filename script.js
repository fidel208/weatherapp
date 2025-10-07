const form = document.getElementById("weather-form");
const locationInput = document.getElementById("location");
const timeInput = document.getElementById("time");

const apikey = "6AD52FSWF7NT79EN5RD6RDEFS";

form.addEventListener("submit", (e) => {
  e.preventDefault(e);

  const location = locationInput.value.trim();
  const time = timeInput.value;

  if (!location) {
    console.warn("Please, enter location");
    return;
  }

  console.log(
    `Fetching weather location for ${location} ${time ? "at " + time : ""}`
  );

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apikey}&contentType=json`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather date:", data);
      console.log("LOcation:", data.resolvedAddress);
      console.log("Temperature:", data.currentConditions.temp + "°C");
      console.log("Conditions:", data.currentConditions.conditions);
    })
    .catch((error) => {
      console.error("❌ Error fetching weather data:", error);
    });
});
