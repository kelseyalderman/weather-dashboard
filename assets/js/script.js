var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var cityTitleEl = document.querySelector("#current-weather-title");
var forecastTitle = document.querySelector("#forecast-title");

var getCityWeather = function (city) {
  // format OpenWeather api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=a42b1bffc45c35fcb28a1fcc1fc29685&units=imperial";

  // make a request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getCityWeather(cityName);

    // clear the search input
    $("#city").val("");
  } else {
    alert("Please enter a city");
  }
};

var displayWeather = function (weatherData) {
  // format and display data
  console.log(weatherData);
  console.log("test");
  $("#current-weather-title").text("test");
};

// add event listeners to forms
$("#search").on("click", formSubmitHandler);
