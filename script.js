// const userTab = document.querySelector('[data-userWeather]');
// const searchTab = document.querySelector('[data-searchWeather]');
// const userContainer = document.querySelector('.weather-container');
// const grantAcessContainer = document.querySelector('.grant-location-container');
// const searchForm = document.querySelector('[data-searchForm]');
// const loadingScreen = document.querySelector('.loading-container');
// const userInfoContainer = document.querySelector('.user-info-container');

// let currentTab = userTab;
// const API_KEY = '6e932b278a53b735d98823ad86b22e61';
// currentTab.classList.add('current-tab');
// getfromSessionStorage();

// function switchTab(clickedTab){
//     if(clickedTab != currentTab){
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active")){
//             userInfoContainer.classList.remove("active");
//             grantAcessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }else{
//             searchForm.classList.remove('active');
//             userInfoContainer.classList.remove('active');
//             getfromSessionStorage(); 
//         }
//     }
// }

// userTab.addEventListener("click", () => {
//     switchTab(userTab)
// });

// searchTab.addEventListener("click", () => {
//     switchTab(searchTab)
// });

// function getfromSessionStorage(){
//     const localCoordinates = sessionStorage.getItem("user-coordinates");
//     if(!localCoordinates){
//         grantAcessContainer.classList.add("active");
//     }else{
//         const coordinates = JSON.parse(localCoordinates);
//         fetchUserWeatherInfo(coordinates);
//     }
// }

// async function fetchUserWeatherInfo(coordinates){
//     const {lat, lon} = coordinates;
//     // marke loading screen visible
//     grantAcessContainer.classList.add("active");
//     loadingScreen.classList.add("active");

//     // API call
//     try{
//         const result = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_key}`)
//         const data = await result.json();
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         renderWeatherInfo(data);
//     }catch(arr){
//         loadingScreen.classList.remove("active");
//     }
// }

// function renderWeatherInfo(data){
//     // fetch the required element
//     const cityName = document.querySelector('[data-cityName]');
//     const countryIcon = document.querySelector("[data-CountryIcon]");
//     const desc = document.querySelector('[data-weatherDesc]');
//     const weatherIcon = document.querySelector('[data-weatherIcon]');
//     const temp = document.querySelector('[data-temp]');
//     const windSpeed = document.querySelector('[data-windSpeed]');
//     const humidity = document.querySelector('[data-humidity]');
//     const cloudliness = document.querySelector('[data-cloudliness]');

//     cityName.innerText = weatherInfo?.name;
//     countryIcon.src = `https://flaqcdn.com/144x108/${wetherInfo?.sys?.country.toLowerCase()}.png `;
//     desc.innerText = weatherInfo?.weather?.[0]?.description;
//     weatherIcon.src = `https://openweathermap.org/img/w/${wetherInfo?.weather?.[0]?.icon}.png`;
//     temp.innerText = weatherInfo?.main?.temp;
//     windSpeed.innerText = weatherInfo?.wind?.speed;
//     humidity.innerText = weatherInfo?.main?.humidity; 
//     cloudliness.innerText = weatherInfo?.clouds?.all;
// }

// const grantAccessButton = document.querySelector('[ data-grantAccess]');
// grantAccessButton.addEventListener('click', getLocation);
// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }else{
//         alert("No Gelocation Support Avaiable");
//     }
// }

// function showPosition(position){
//     const userCoordinates = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude,
//     }
//     sessionStorage.setItem('userCoordinates', JSON.stringify(userCoordinates));
//     fetchUserWeatherInfo(userCoordinates);
// }

// const searchInput = document.querySelector('[data-searchInput]');
// searchForm.addEventListener("click", (e) => {
//     e.preventDefault();
//     let cityName = searchInput.value;
//     if(cityName === ""){
//         return;
//     }else{
//         fetchSearchWeatherInfo(cityName);
//     }
// })

// async function fetchSearchWeatherInfo(city){
//     loadingScreen.classList.add("active");
//     userInfoContainer.classList.remove("active");
//     grantAcessContainer.classList.remove("active");

//     try{
//         const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`);
//         const data = await respone.json();
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         renderWeatherInfo(data);
//     }
//     catch(e){

//     }
// }

// --------------------------------------------------------------------------------------------------

// running code
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;
const API_KEY = "6e932b278a53b735d98823ad86b22e61";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp}°C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed}m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}