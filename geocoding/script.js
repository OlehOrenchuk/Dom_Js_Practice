'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////

const renderCountry = function (data, className = '') {
    const html1 = ` 
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html1)
    countriesContainer.style.opacity = 1;
}

const renderError = function (msg){
    countriesContainer.insertAdjacentText('beforeend',msg)
    countriesContainer.style.opacity = 1
}

// const getCountryAndNeighbour = function (country) {
//
//     // AJAX call country 1
//     const request = new XMLHttpRequest()
//     request.open('GET', `https://restcountries.com/v2/name/${country}`)
//     request.send()
//
//     request.addEventListener('load',function (){
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);
//
//         // Render country 1
//         renderCountry(data)
//
//         // Get neighbour country(2)
//         const neighbour = data.borders?.[0]
//
//         if(!neighbour) return
//
//         // AJAX call country 2
//         const request2 = new XMLHttpRequest()
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`)
//         request2.send()
//
//         request2.addEventListener('load',function (){
//             const data2 = JSON.parse(this.responseText)
//             renderCountry(data2, 'neighbour')
//         })
//     })
// }

// getCountryAndNeighbour('ukraine')

// Callback hell
// setTimeout(function (){
//     console.log('1 second passed')
//     setTimeout(function (){
//         console.log('2 seconds passed')
//         setTimeout(function (){
//             console.log('3 seconds passed')
//             setTimeout(function (){
//                 console.log('4 seconds passed')
//             },1000)
//         },1000)
//     },1000)
// },1000)

// AJAX is an old way for async JS and Promises is a new one ,
// also for escaping callback hell
// https://restcountries.com/v2/

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v2/name/${country}`).then(function (response){
//         console.log(response)
//         return response.json()
//     }).then(function (data) {
//         console.log(data)
//         renderCountry(data[0])
//     })
// }

const getJSON = function (url, errorMsg = 'Something went wrong!'){
    return fetch(url)
        .then(response => {
            if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);
            return response.json();
        });
};
const getCountryData = function (country) {
    // Country 1
    getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
        .then( data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.[0];

            if(!neighbour) throw new Error('No neighbour found');

            // Country 2
            return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`,'Country not found!')
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.error(`${err}`)
            renderError(`Something went wrong ${err.message}.Try again!`)
        })
        .finally(() => {
            countriesContainer.style.opacity = 1
        })
}

// btn.addEventListener('click',function (){
//     getCountryData('australia')
// })


///////////////////////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that,
 you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng)
 (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful
location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API
 and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the
provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403.
This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to
reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API
result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code,
 no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474
//
// GOOD LUCK 😀 */

// const whereAmI = function (lat,lng){
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=996637318272597472791x50635`)
//         .then(response => {
//             if(!response.ok) throw new Error(`Problem with geocoding (${response.status})`)
//             return response.json();
//         })
//         .then(data => {
//             if(!data.country) throw new Error('No location found');
//             console.log(`You are in ${data.city}, ${data.country}`)
//             return fetch(`https://restcountries.com/v2/name/${data.country}`)
//         })
//         .then(response => {
//             if(!response.ok) throw new Error(`Country not found (${response.status})`)
//             return response.json()
//         })
//         .then(data => {
//             renderCountry(...data)
//         })
//         .catch(err => {
//             console.error(`${err.message} Boom!`)
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1
//         })
// }

// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)

const getMyPosition = async function () {
    return new Promise(function (resolve,reject){
        navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords),reject)
    })
}

const whereAmI = async function (lat,lng){
    try {
        // Reverse geocoding
        let geo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=996637318272597472791x50635`)
        if(!geo.ok) throw new Error('Problem getting location data')
        geo = await geo.json()


        // Country data
        let country = await fetch(`https://restcountries.com/v2/name/${geo.country}`)
        if(!country.ok) throw new Error('Problem getting country')
        country = await country.json()

        renderCountry(...country)
    } catch (err) {
        console.error(err)
        renderError(`${err.message}`)
    }

};

// getMyPosition().then(data => whereAmI(data.latitude,data.longitude))
(async function(){
    const geoData = await getMyPosition()
    await whereAmI(geoData.latitude, geoData.longitude)

})();
whereAmI(52.508, 13.381)
whereAmI(19.037, 72.873)
whereAmI(-33.933, 18.474)

// Promise.any([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another Success')
// ]).then(res => console.log('-----any-----\n',res))
//     .catch(err => console.error(err))
//
// Promise.all([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another Success')
// ]).then(res => console.log('-----all-----\n',res))
//     .catch(err => console.error('-----all-----\n',err))
//
// Promise.allSettled([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another Success')
// ]).then(res => console.log('-----allSettled-----\n',res))
//     .catch(err => console.error(err))
//
// Promise.race([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another Success')
// ]).then(res => console.log('-----race-----\n',res))
//     .catch(err => console.error(err))


