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
  $("#current-weather").addClass("border border-secondary border-2");
  $("#current-weather-title")
    .text(
      weatherData.name +
        " (" +
        dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") +
        ") "
    )
    .append(
      `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`
    );
  $("#current-weather-temp").text(
    "Temperature: " + weatherData.main.temp.toFixed(1) + "°F"
  );
  $("#current-weather-humidity").text(
    "Humidity: " + weatherData.main.humidity + "%"
  );
  $("#current-weather-wind").text(
    "Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph"
  );

  // use lat & lon to make get uvi and 5-day forecast
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      weatherData.coord.lat +
      "&lon=" +
      weatherData.coord.lon +
      "&appid=a42b1bffc45c35fcb28a1fcc1fc29685&units=imperial"
  ).then(function (response) {
    response.json().then(function (data) {
      // display the uv index value
      $("#current-weather-uvi").text("UVI Index: " + data.current.uvi);

      // display 5-day forecast
      displayForecast(data);
    });
  });
};

var displayForecast = function (data) {
  $("#forecast-title").text("5-Day Forecast:");

  // clear any previous entries in the five-day forecast
  $("#forecast").empty();

  // get data for 5 days
  for (i = 1; i <= 5; i++) {
    // insert data into my day forecast card template
    var fiveDayCard =
      `
                    <div class="col-md-2 m-2 py-3 card text-white bg-primary">
                        <div class="card-body p-1">
                            <h5 class="card-title">` +
      dayjs(data.daily[i].dt * 1000).format("MM/DD/YYYY") +
      `</h5>
                            <img src="https://openweathermap.org/img/wn/` +
      data.daily[i].weather[0].icon +
      `.png" alt="rain">
                            <p class="card-text">Temp: ` +
      data.daily[i].temp.day.toFixed(1) +
      `°F</p>
                            <p class="card-text">Humidity: ` +
      data.daily[i].humidity +
      `</p>
                        </div>
                    </div>
                    `;

    // append the day to the five-day forecast
    $("#forecast").append(fiveDayCard);
  }
};

// add event listeners to forms
$("#search").on("click", formSubmitHandler);
