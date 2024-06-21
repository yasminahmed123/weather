const searchLocationInput= document.getElementById('searchLocation')


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        console.log(lat);
        console.log(long);

        getWeatherData(`${lat} , ${long}`)
    })
} else {
    alert("geolocation not found")
}

async function getWeatherData(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=abce036efb1140f7826192258242006`);
    let data = await res.json()

    console.log(data)
    DisplayTodayWeather(data)
    displayTomm(data)
    displayAfterTomm(data)

}

searchLocationInput.addEventListener('input', function (e) {
    getWeatherData(e.target.value) 
})

function DisplayTodayWeather(data) {
    console.log(data, 'from DisplayTodayWeather');

    const todayDate = data.current.last_updated
    let date = new Date(todayDate)
    const todayWeekDay = date.toLocaleString('en-us', { weekday: 'long' });
    const todayDay = date.getDate()
    const todayMonth = date.toLocaleString('en-us', { month: 'long' });
    const cityName = data.location.name;
    const todayDegree = data.current.temp_c;
    const todayCondition = data.current.condition.text;
    const humidity = data.current.humidity;
    CityToday.innerHTML = cityName;
    TodayWeekDayMarkup.innerHTML = todayWeekDay
    DateToday.innerHTML = `${todayDay} ${todayMonth}`;
    TempToday.innerHTML = todayDegree;
    Todaycond.innerHTML = todayCondition;
    imgToday.setAttribute("src",`https:${data.current.condition.icon}`);
    humdityToday.innerHTML = humidity;
    WindSpeedToday.innerHTML = data.current.wind_kph;
    dirToday.innerHTML = data.current.wind_dir;
}






function displayTomm({ forecast }) {
    console.log(forecast, 'forecast from displayTomm');
    tomorrowDay.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString('en-us', { weekday: 'long' });
    iconTommorow.setAttribute('src',`https:${ forecast.forecastday[1].day.condition.icon}`);
    tMaxTemp.innerHTML = forecast.forecastday[1].day.maxtemp_c
    MinTemp.innerHTML = forecast.forecastday[1].day.mintemp_c
    tCond.innerHTML = forecast.forecastday[1].day.condition.text
    // console.log(forecast.forecastday[1].day);

}


function displayAfterTomm({ forecast }) {
    console.log(forecast, 'forecast from displayTomm');
    afterTomorow.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString('en-us', { weekday: 'long' });
    iconAfterTom.setAttribute('src',`https:${forecast.forecastday[2].day.condition.icon}`);
    afterTomMaxTemp.innerHTML = forecast.forecastday[2].day.maxtemp_c
    afterTomorrowMintemp.innerHTML = forecast.forecastday[2].day.mintemp_c
    afterTomCond.innerHTML =forecast.forecastday[2].day.condition.text
}