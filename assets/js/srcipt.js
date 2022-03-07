var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("city-search-term");

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getCityWeather(cityName);

    // clear old content
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getCityWeather = function (city) {
  // format OpenWeather api url
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=a42b1bffc45c35fcb28a1fcc1fc29685&units=imperial";

  // make a request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};
