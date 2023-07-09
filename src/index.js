function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function searchCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#city-input");
  displayCity(changeCity.value);
}

function displayCity(city) {
  let apiKey = "ae3ffbb2ba5fd172289cc56d929ac85e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchWeather = document.querySelector("#search-form");
searchWeather.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchLocation(position) {
  let apiKey = "ae3ffbb2ba5fd172289cc56d929ac85e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

let geolocateButton = document.querySelector("#geolocate-button");
geolocateButton.addEventListener("click", getCurrentLocation);