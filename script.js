
function GetInfo() {
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--";
   

    async function fetchData() {
        try {
            const response = await fetch('https://api.waqi.info/feed/'+newName.value+'/?token=362fd0e01d4f28069afd4feb9319b9545125d3e5');
            const data = await response.json();
            return data.data.aqi;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function updateAQIRepresentation(aqi) {
        const aqiCircle = document.getElementById('aqi-circle');

        aqiCircle.textContent = aqi;

        if (aqi <= 50) {
            aqiCircle.className = 'good';
        } else if (aqi <= 100) {
            aqiCircle.className = 'moderate';
        } else {
            aqiCircle.className = 'unhealthy';
        }
    }

    async function updateAQI() {
        try {
            const aqi = await fetchData();
            updateAQIRepresentation(aqi);
        } catch (error) {
            console.error('Error updating AQI:', error);
        }
    }

    updateAQI();

    setInterval(updateAQI, 5 * 60 * 1000);

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=ce43e15daba37b83f3c9290def769506')
.then(response => response.json())
.then(data => {
    var hiddenElements = document.getElementById("weatherContainer");
    hiddenElements.style.display = "block";
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
  
    }
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }

     for(i = 0; i<5; i++){
        
        const mainCondition = data.list[i].weather[0].main;
        console.log('Main condition:', mainCondition);
        if(mainCondition=='Clouds'){
        document.getElementById("img" + (i+1)).src = 'images/clouds.jpg';
     }else if( mainCondition=='Rain'){
        document.getElementById("img" + (i+1)).src = 'images/rain.jpg';
     }else if(mainCondition=='Clear'){
        document.getElementById("img" + (i+1)).src = 'images/sun.jpg';
     }
    }
    console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton")
)
}


var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }
            
