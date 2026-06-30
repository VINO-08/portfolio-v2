const apiKey = "e08cf77907dba0f54823cf13e8838263";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");
const error = document.getElementById("error");

async function getWeather(cityName){

    try{

        error.textContent = "";

        city.textContent = "Loading...";
        temp.textContent = "--";
        humidity.textContent = "--";
        wind.textContent = "--";
        description.textContent = "--";

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        city.textContent = data.name;
        temp.textContent = data.main.temp + " °C";
        humidity.textContent = data.main.humidity + " %";
        wind.textContent = data.wind.speed + " m/s";
        description.textContent = data.weather[0].description;

    }

    catch(err){

        city.textContent = "--";
        temp.textContent = "--";
        humidity.textContent = "--";
        wind.textContent = "--";
        description.textContent = "--";

        error.textContent = err.message;

    }

}

searchBtn.addEventListener("click", ()=>{

    const cityName = cityInput.value.trim();

    if(cityName===""){
        error.textContent="Please enter a city name.";
        return;
    }

    getWeather(cityName);

});

cityInput.addEventListener("keypress",(event)=>{

    if(event.key==="Enter"){

        searchBtn.click();

    }

});