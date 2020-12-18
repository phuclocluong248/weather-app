const apiKey = "5ed4f4ba02361f20cab1a37bd0c893d5";
const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=vi`;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const iconURL = "http://openweathermap.org/img/wn/";

async function getWeatherByLocation(location) {
    const resp = await fetch(url(location),{origin: "cors"});
    const respData = await resp.json();
    console.log(respData);
    addWeatherToPage(respData);

};

function KtoC(K) {
    return (K - 273.15).toFixed(0); 
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp); 
    const w_des = data.weather[0].description;
    
    const weather = document.createElement('div');

    main.innerHTML = '';

    weather.classList.add('weather');

    weather.innerHTML = `
            <h2> <img src="${iconURL}${data.weather[0].icon}@2x.png"/> ${temp}°C <img src="${iconURL}${data.weather[0].icon}@2x.png"/></h2>
            <p> ${data.weather[0].description}</p>
            <p>tại <strong>${data.name}, ${data.sys.country}</strong></p>
    `;
    main.appendChild(weather);


}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value; 

    if(city) {
        getWeatherByLocation(city);
    }
}); 



