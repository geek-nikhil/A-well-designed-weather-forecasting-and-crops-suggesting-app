let k=0;
let i=0;
var t=0;
var sea=document.getElementById(cardContainer);
let parentElement = document.getElementById('cardContainer');
var query = "aqi";
  function search(){
        parentElement.innerHTML="";
     query = document.getElementById("search-input").value;
    console.log(query); 
    checknews(query);
  }

sea ="";
var cardData = [
    { title: "Card " + t, content: "This is the content of Card 1." },
];
  function myFunction() {
    var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
  }

const key="4fe360bea1754332b25594ca6cc98ccc";
const api = "https://newsapi.org/v2/everything?q="+`${query}`+"&apiKey=4fe360bea1754332b25594ca6cc98ccc";
async function checknews(query){
    sea.innerHTML="";
    const api = "https://newsapi.org/v2/everything?q="+`${query}`+"&apiKey=4fe360bea1754332b25594ca6cc98ccc";
    const response = await fetch(api + `&appid=${key}`);
    var data = await response.json();
    console.log(data);
    console.log(data.articles.length)
    k=data.articles.length;
    for(i=0;i<k;i++){
        if(data.articles[i].description==null){
            continue;
        }
    cardData = [
            { title: data.articles[i].title, content: data.articles[i].description ,image: data.articles[i].urlToImage},
        ];
        addCardsToContainer(cardData);
    t++;
    }
}
console.log(k);
    function createCard(title, content,image) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${image}" id="img">
            <h3>${title}</h3>
            <p>${content}</p>
        `;
        return card;
    }

    function addCardsToContainer(data) {
        const cardContainer = document.getElementById("cardContainer");
        data.forEach(item => {
            const card = createCard(item.title, item.content,item.image);
            cardContainer.appendChild(card);
        });

    }
    // Add cards to the container
    checknews(query);
