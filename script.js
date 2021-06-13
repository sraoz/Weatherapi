

 var finding_pos=true;
 function geoFindMe() {
   function success(position) {
     const latitude = position.coords.latitude;
     const longitude = position.coords.longitude;
     
     weather.fetchWeatherbylatlong(latitude,longitude);
   
     console.log(latitude, " and  ", longitude);
     finding_pos=false;
   }
   function error() {
     alert("Unable to Fetch your location, Please enter your city name");
     console.log(error);
   }
   if (!navigator.geolocation) {
     alert('Geolocation is not supported by your browser, Please enter your city name');
   } else {
     navigator.geolocation.getCurrentPosition(success, error);
   }
 }
 
 if(finding_pos){
 geoFindMe();
 }



let weather = {
  apiKey: "429f47ffbb97ab4190d71d9539ca11bb",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  fetchWeatherbylatlong: function (lat,long) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat+"&lon="+long+
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  }
  ,
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Delhi");

const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];
  return day;
};
const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  var now = new Date();
  var month = months[now.getMonth() + 1];
  var date = now.getDate();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let periods = "AM";
  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  return `${month} ${date} | ${hours}:${mins}${periods}`;
};

document.getElementById('date').innerHTML = getCurrentDay() + " | " + getCurrentTime();


var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); 
}
