
function GetInfo() {
    const element = document.getElementById("local");
    if (!element.classList.contains("block")) {
        element.classList.add("block");
      } 
      document.getElementById("iconsContainer").style.display = "";
      document.getElementById("aqi-container").style.display = "";

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
            console.log(aqi)
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
  let co;
function callbylatlon(latitude, longitude, successCallback, errorCallback) {
    if (latitude.length !== 0 && longitude.length !== 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
      )
        .then((response) => response.json())
        .then((data) => {
         co  = [data.main.temp,data.main.humidity,data.weather[0].main,data.weather[0].description]
          console.log("Successfully fetched weather:", data.weather[0].main,data.weather[0].description); 
          // Invoke the success callback
          successCallback(data);
          createlocal(co)
          // Determine weather URL and set background image
          const igurl = determineweatherurl();
          document.body.style.background = `#f3f3f3 url('${igurl}') no-repeat`;
          document.body.style.backgroundSize = 'cover';
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          
          // Invoke the error callback
          errorCallback(error);
        });
    } else {
      // If latitude or longitude is not available
      console.warn("Please give location permission");
  
      // Invoke the error callback
      errorCallback("Location permission not granted");
    }
  }
  
  // Example usage:
  const successCallback = (data) => {
    console.log("Success callback with data:", data);
    // Handle the success scenario, e.g., update UI
  };
  
  const errorCallback = (error) => {
    console.error("Error callback with error:", error);
    // Handle the error scenario, e.g., display an error message
  };
  
  // Call the function with latitude, longitude, success callback, and error callback
  
  

const getLocation = () => {
    document.getElementById("iconsContainer").style.display = "none";
    document.getElementById("aqi-container").style.display = "none";

    document.getElementById("local").classList.toggle("block");
    document.getElementById("local").innerHTML="";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Your logic with latitude and longitude
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                callbylatlon(latitude, longitude, successCallback, errorCallback);
            },
            (error) => {
                console.error("Error getting geolocation:", error.message);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
};
   function createlocal(co){
  let cont = document.createElement('div');
  console.log(co[0])
  let img  = imgurl(co[2])
  console.log(img);
  cont.innerHTML= `
  <img src=${img} id="img">
  <h3>${(co[0] - 273).toFixed(1)} C</h3>
  <p>${co[1]}</p>`
  let sho = document.getElementById("local");
   sho.appendChild(cont);
   }


   function imgurl(mg){
    if(mg=='Clouds'){
       return 'images/clouds.jpg';
     }else if(mg=='Rain'){
        return 'images/rain.jpg';
     }else if(mg=='Clear'){
        return  'images/sun.jpg';
     }         
   }
// Call the function to get the current location

// <---------------------------FontFaceSet.js------------>
let page =3 ;
let k = 0;
let t = 0;
let sea = document.getElementById('cardContainer');
let parentElement = document.getElementById('cardContainer');
let query = 'aqi';

function search() {
    parentElement.innerHTML = '';
    query = document.getElementById('search-input').value;
    console.log(query);
    checknews(query);
}

sea = '';
var cardData = [
    { title: 'Card ' + t, content: 'This is the content of Card 1.' },
];

async function checknews(query) {
    sea.innerHTML = '';
    const apiKey = 'd80ba0c8034e4dd79ad334819a0d88f4';
    const api = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${page}`;

    try {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        console.log(data.articles.length);

        const newCardData = [];
       
        for (let i = k; i <k+8; i++) {
            if (data.articles[i].description == null) {
                continue;
            }
            newCardData.push({
                title: data.articles[i].title.slice(0,60)+ ". . . ",
                content: data.articles[i].description.slice(0,120) + ". . .",
                image: data.articles[i].urlToImage,
            });
            t++;
        }

        addCardsToContainer(newCardData);
    } catch (error) {
        console.error('Error fetching news data:', error);
    }
}


console.log(k);

function createCard(title, content, image) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${image}" id="img">
        <h3>${title}</h3>
        <p>${content}</p>
    `;
    return card;
}

function addCardsToContainer(data) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = " ";
    data.forEach(item => {
        console.log(item.image);
        if(item.image!==null){
        const card = createCard(item.title, item.content, item.image);
        cardContainer.appendChild(card);
        }
    });
    
}

// Add cards to the container
checknews(query);
showbtn=()=>{
    var element = document.getElementById("navigationButtons");
    element.classList.toggle("btn");
}


function increpage(){
    if(k>=50){
        alert("end of page");
    }else{
        k=k+8;
    }

    checknews(query);
}
function decrepage(){
    if(k<=0){
        alert("home page");
    }else{
        k=k-8;
    }

    checknews(query);
}
var input = document.getElementById("cityInput");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("button").click();
    }
  });