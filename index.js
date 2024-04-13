try {           //this begins the try block for the testing of erros
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature") //initiates an synchronous operations using the fetch API
    const data = await res.json() //extracts the JSON body content from the response
    document.body.style.backgroundImage = `url(${data.urls.regular})` //sets the background image of the document
    document.getElementById("author").textContent = `By: ${data.user.name}` //sets the text content of the element with the ID "author" to the anme of the user who uploaded the image
} catch (err) { //begins the catch block which is executed if an error occurs within the try block.
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    document.getElementById("author").textContent = `By: Dodi Achmad`
}

try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin") // initates an asynchronous operation to fetch data about Dogecoin from the CoinGecko API
    if (!res.ok) {  //checks if the response status is not okay
        throw Error("Something went wrong")  //response if not okay
    }
    const data = await res.json() // extracts JSOn data from the rsponse
    document.getElementById("crypto-top").innerHTML = `         
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
    //Appends HTML content to an element with the ID "crypto" to display the current, high, and low prices of Dogecoin.
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
    `
} catch (err) { //Catches any errors that occur within the try block and logs them to the console
    console.error(err)
}

function getCurrentTime() {   //Defines a function named getCurrentTime to update the current time on the webpage
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(getCurrentTime, 1000) //Calls the getCurrentTime function every second to update the current time continuously.

navigator.geolocation.getCurrentPosition(async position => {  //Uses the Geolocation API to get the current position of the user.
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`) //Initiates an asynchronous operation to fetch weather data based on the user's current position.
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` //Constructs the URL for the weather icon based on the received data
        //Sets the HTML content of an element with the ID "weather" to display the weather icon, temperature, and city name
        document.getElementById("weather").innerHTML = `  
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    } catch (err) {
        console.error(err)
    }
});
