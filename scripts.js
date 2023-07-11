let weather = {
    "apiKey": "dc15e6a71f707332c3f58b970a924fe2",

    //integrating the weather api
    fetchWeather:function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    //getting the specific information
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        //replaces the placeholder name with the below
        document.querySelector(".city").innerText = "weather in " + name.toLowerCase();
        //the "@2x" means the icon is 2x the size
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp + " °C";
        document.querySelector(".humidity").innerText = "humidity: " + humidity + " %";
        document.querySelector(".wind").innerText = "the wind speed is " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading")
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

//make the search button work
document
    .querySelector(".search button")
    .addEventListener("click", function (){
        weather.search();
});

//make clicking the enter button work
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event){
        if(event.key == "Enter"){
            weather.search();
        }   
});

//default to search a specific city when startup
weather.fetchWeather("new york")