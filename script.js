const button = document.querySelector(".button")

button.addEventListener("click", getWeather)
document.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        getWeather();
    }
})


function getWeather(){
    const city = document.querySelector("#city").value 
    const apiKey = "1476ae6554527c8bb8a179fe0c758dd9";
    const info = document.querySelector(".info-card")
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if(!city){
        alert("Please enter a city")
    }

    fetch(apiUrl)
    .then(response =>{
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        return response.json();
    })
    .then(data =>{
        if(data.cod === "404"){
            alert("City not found")
            return;
        }
        console.log(data);
        info.innerHTML = `<div class="inner-card">
                            <h2>City: ${data.name} <br> Country: ${data.sys.country}</h2>
                            <p>Temperature: ${Math.floor(data.main.temp)}°C</p>
                            <p> Feels like: ${Math.floor(data.main.feels_like)}°C</p>
                            <p>${data.weather[0].description}</p>
                            </div>`
    })
}
