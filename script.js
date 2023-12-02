

function GetInfo() {
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--";
   
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

    