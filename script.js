"use strict";

const body = document.querySelector("body");

const btn = document.getElementById("btn");
const weatherInput = document.querySelector("input");
const townName = document.querySelector(".town-name");
const townClock = document.querySelector(".town-clock");
const icon = document.querySelector(".icon");
const townMeteo = document.querySelector(".town-meteo");
const townImage = document.querySelector(".town-img");
const hiddenImg = document.querySelector(".hidden-img");

let townForecastTemp = document.querySelector(".town-forecast-temp");

const tDayOneMax = document.querySelector(".t-day-one-max");
const tDayOneMin = document.querySelector(".t-day-one-min");
const tDayTwoMax = document.querySelector(".t-day-two-max");
const tDayTwoMin = document.querySelector(".t-day-two-min");
const tDayThreeMax = document.querySelector(".t-day-three-max");
const tDayThreeMin = document.querySelector(".t-day-three-min");
const tDayFourMax = document.querySelector(".t-day-four-max");
const tDayFourMin = document.querySelector(".t-day-four-min");
const tDayFiveMax = document.querySelector(".t-day-five-max");
const tDayFiveMin = document.querySelector(".t-day-five-min");

const iDayOne = document.querySelector(".i-day-one");
const iDayTwo = document.querySelector(".i-day-two");
const iDayThree = document.querySelector(".i-day-three");
const iDayFour = document.querySelector(".i-day-four");
const iDayFive = document.querySelector(".i-day-five");

// DAY
const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

let hour = today.getHours();
let minute = today.getMinutes();

// FIX FORMAT OF HOURS AND MINUTES 0 to 00

switch (hour) {
  case 0:
    hour += "0";
    break;
  case 1:
    hour = "0" + hour;
    break;
  case 2:
    hour = "0" + hour;
    break;
  case 3:
    hour = "0" + hour;
    break;
  case 4:
    hour = "0" + hour;
    break;
  case 5:
    hour = "0" + hour;
    break;
  case 6:
    hour = "0" + hour;
    break;
  case 7:
    hour = "0" + hour;
    break;
  case 8:
    hour = "0" + hour;
    break;
  case 9:
    hour = "0" + hour;
    break;
}

switch (minute) {
  case 0:
    minute += "0";
    break;
  case 1:
    minute = "0" + minute;
    break;
  case 2:
    minute = "0" + minute;
    break;
  case 3:
    minute = "0" + minute;
    break;
  case 4:
    minute = "0" + minute;
    break;
  case 5:
    minute = "0" + minute;
    break;
  case 6:
    minute = "0" + minute;
    break;
  case 7:
    minute = "0" + minute;
    break;
  case 8:
    minute = "0" + minute;
    break;
  case 9:
    minute = "0" + minute;
    break;
}

const townDate = document.querySelector(".town-date");
const townDay = document.querySelector(".town-day");

const todayDate = day + `/` + month + `/` + year;
const todayHour = hour + `:` + minute;

const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

let currentDayName = today.toLocaleString("fr-be", { weekday: "long" });

//
const weatherCard = document.querySelector(".hidden-div");

// FORECAST DATE
const dDayOne = document.querySelector(".d-day-one");
const dDayTwo = document.querySelector(".d-day-two");
const dDayThree = document.querySelector(".d-day-three");
const dDayFour = document.querySelector(".d-day-four");
const dDayFive = document.querySelector(".d-day-five");

// WEATHER DETAILS
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");

// SAVE LOCAL STORAGE

/////////////////////////////////////
// ADD EVENT LISTENER CURRENT WEATHER
/////////////////////////////////////

btn.addEventListener("click", function () {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      weatherInput.value +
      "&limit=5&appid=d033e292dbd6613c99ffece5e8a26ba9"
  )
    .then((response) => response.json())
    .then((data) => {
      // GET TOWN AND LATTITUDE/LONGITUD

      const nameValue = data[0]["name"];
      const countryValue = data[0]["country"];
      const lat = data[0]["lat"];
      const lon = data[0]["lon"];

      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=metric&appid=d033e292dbd6613c99ffece5e8a26ba9"
      )
        .then((response) => response.json())
        .then((data) => {
          if (weatherInput.value == null || weatherInput.value == "") {
            alert("Vous n'avez pas entrer de ville.");
          }

          body.style.height = "100%";
          // CURRENT WEATHER

          weatherCard.style.display = "block";
          const iconCurrentValue = data["current"]["weather"][0]["icon"];
          const tempValue = data["current"]["temp"];

          townName.innerHTML = nameValue + ", " + countryValue;
          townClock.innerHTML = todayHour;
          townDate.innerHTML = todayDate;
          townDay.innerHTML = currentDayName;

          icon.src =
            "http://openweathermap.org/img/wn/" + iconCurrentValue + "@2x.png";
          townMeteo.innerHTML = Math.round(tempValue) + "°C";

          // FORECAST WEATHER

          const dayOneValue = data["daily"][1]["dt"];
          const dayTwoValue = data["daily"][2]["dt"];
          const dayThreeValue = data["daily"][3]["dt"];
          const dayFourValue = data["daily"][4]["dt"];
          const dayFiveValue = data["daily"][5]["dt"];

          //////////////////////////
          // FUNCTION TIME CONVERTER
          //////////////////////////

          const convertTime = (unix) => {
            let unixTimes = unix;
            const date = new Date(unixTimes * 1000);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            const formattedTime =
              day + "/" + (new Number(month) + new Number(1)) + "/" + year;

            return formattedTime;
          };

          // console.log(dayOneValue);

          dDayOne.innerHTML = convertTime(dayOneValue);
          dDayTwo.innerHTML = convertTime(dayTwoValue);
          dDayThree.innerHTML = convertTime(dayThreeValue);
          dDayFour.innerHTML = convertTime(dayFourValue);
          dDayFive.innerHTML = convertTime(dayFiveValue);

          const aDayValueMax = data["daily"][1]["temp"]["max"];
          const aDayValueMin = data["daily"][1]["temp"]["min"];
          const bDayValueMax = data["daily"][2]["temp"]["max"];
          const bDayValueMin = data["daily"][2]["temp"]["min"];
          const cDayValueMax = data["daily"][3]["temp"]["max"];
          const cDayValueMin = data["daily"][3]["temp"]["min"];
          const dDayValueMax = data["daily"][4]["temp"]["max"];
          const dDayValueMin = data["daily"][4]["temp"]["min"];
          const eDayValueMax = data["daily"][5]["temp"]["max"];
          const eDayValueMin = data["daily"][5]["temp"]["min"];

          tDayOneMax.innerHTML = Math.round(aDayValueMax) + "°";
          tDayOneMin.innerHTML = Math.round(aDayValueMin) + "°";
          tDayTwoMax.innerHTML = Math.round(bDayValueMax) + "°";
          tDayTwoMin.innerHTML = Math.round(bDayValueMin) + "°";
          tDayThreeMax.innerHTML = Math.round(cDayValueMax) + "°";
          tDayThreeMin.innerHTML = Math.round(cDayValueMin) + "°";
          tDayFourMax.innerHTML = Math.round(cDayValueMax) + "°";
          tDayFourMax.innerHTML = Math.round(dDayValueMax) + "°";
          tDayFourMin.innerHTML = Math.round(dDayValueMin) + "°";
          tDayFiveMax.innerHTML = Math.round(eDayValueMax) + "°";
          tDayFiveMin.innerHTML = Math.round(eDayValueMin) + "°";

          const aIconValue = data["daily"][1]["weather"][0]["icon"];
          const bIconValue = data["daily"][2]["weather"][0]["icon"];
          const cIconValue = data["daily"][3]["weather"][0]["icon"];
          const dIconValue = data["daily"][4]["weather"][0]["icon"];
          const eIconValue = data["daily"][5]["weather"][0]["icon"];

          iDayOne.src =
            "http://openweathermap.org/img/wn/" + aIconValue + "@2x.png";
          iDayTwo.src =
            "http://openweathermap.org/img/wn/" + bIconValue + "@2x.png";
          iDayThree.src =
            "http://openweathermap.org/img/wn/" + cIconValue + "@2x.png";
          iDayFour.src =
            "http://openweathermap.org/img/wn/" + dIconValue + "@2x.png";
          iDayFive.src =
            "http://openweathermap.org/img/wn/" + eIconValue + "@2x.png";

          const windSpeed = data["current"]["wind_speed"];
          const humidityPerCent = data["current"]["humidity"];
          const pressureMbar = data["current"]["pressure"];

          wind.innerHTML = Math.round(windSpeed * 3.6) + ` km/h`;
          humidity.innerHTML = humidityPerCent + `%`;
          pressure.innerHTML = pressureMbar + ` mbar`;

          ///////////
          // CHART JS
          ///////////

          const firstHour = data["hourly"][0]["dt"];
          const secondHour = data["hourly"][3]["dt"];
          const thirdHour = data["hourly"][6]["dt"];
          const fourthHour = data["hourly"][9]["dt"];
          const fifthHour = data["hourly"][12]["dt"];
          const sixthHour = data["hourly"][15]["dt"];
          const seventhHour = data["hourly"][18]["dt"];
          const heighthHour = data["hourly"][21]["dt"];

          const firstHourTemp = data["hourly"][0]["temp"];
          const secondHourTemp = data["hourly"][3]["temp"];
          const thirdHourTemp = data["hourly"][6]["temp"];
          const fourthHourTemp = data["hourly"][9]["temp"];
          const fifthHourTemp = data["hourly"][12]["temp"];
          const sixthHourTemp = data["hourly"][15]["temp"];
          const seventhHourTemp = data["hourly"][18]["temp"];
          const heighthHourTemp = data["hourly"][21]["temp"];

          const stHourTemp = Math.round(firstHourTemp);
          const ndHourTemp = Math.round(secondHourTemp);
          const rdHourTemp = Math.round(thirdHourTemp);
          const rthHourTemp = Math.round(fourthHourTemp);
          const fthHourTemp = Math.round(fifthHourTemp);
          const xthHourTemp = Math.round(sixthHourTemp);
          const nthHourTemp = Math.round(seventhHourTemp);
          const hthHourTemp = Math.round(heighthHourTemp);

          const convertHour = (unix) => {
            let unixTimes = unix;
            const date = new Date(unixTimes * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();

            const formattedHour = hours + ":" + minutes.substr(-2);

            return formattedHour;
          };

          const stHour = convertHour(firstHour);
          const ndHour = convertHour(secondHour);
          const rdHour = convertHour(thirdHour);
          const rthHour = convertHour(fourthHour);
          const fthHour = convertHour(fifthHour);
          const xthHour = convertHour(sixthHour);
          const nthHour = convertHour(seventhHour);
          const hthHour = convertHour(heighthHour);

          //
          //
          // CHART JS

          const labels = [
            stHour,
            ndHour,
            rdHour,
            rthHour,
            fthHour,
            xthHour,
            nthHour,
            hthHour,
          ];

          const datas = {
            labels: labels,
            datasets: [
              {
                label: "Temperatures along the hours",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [
                  stHourTemp,
                  ndHourTemp,
                  rdHourTemp,
                  rthHourTemp,
                  fthHourTemp,
                  xthHourTemp,
                  nthHourTemp,
                  hthHourTemp,
                ],
                tension: 0.2,
              },
            ],
          };

          const config = {
            type: "line",
            data: datas,
          };

          const myChart = new Chart(document.getElementById("myChart"), config);
        });
    })
    .catch((error) => console.log("Souriez, vous êtes beaux!"));
});

// btn.addEventListener("click", function () {
//   fetch(
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//       weatherInput.value +
//       "&units=metric&appid=d033e292dbd6613c99ffece5e8a26ba9"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const nameValue = data.name;
//       const countryValue = data["sys"]["country"];
//       const iconCurrentValue = data["weather"][0]["icon"];
//       const tempValue = data["main"]["temp"];
//       const clockValue = data.dt;

//       townName.innerHTML = nameValue + ", " + countryValue;

//       //////////////////////////
//       // FUNCTION TIME CONVERTER
//       //////////////////////////

//       /* const convertTime = (unix) => {
//         let unixTimes = unix;
//         const date = new Date(unixTimes * 1000);
//         const hours = date.getHours();
//         const minutes = "0" + date.getMinutes();

//         const formattedTime = hours + ":" + minutes.substr(-2);

//         console.log(formattedTime);
//         townClock.innerHTML = formattedTime;
//       };

//       convertTime(clockValue); */

//       weatherCard.style.display = "block";
//       townClock.innerHTML = todayHour;
//       townDate.innerHTML = todayDate;
//       console.log(todayHour);

//       icon.src =
//         "http://openweathermap.org/img/wn/" + iconCurrentValue + "@2x.png";
//       townMeteo.innerHTML = Math.round(tempValue * 10) / 10 + "°C";

//       /*       console.log(clockValue);
//       console.log(data["weather"][0]["icon"]); */
//     })
//     .catch((error) => alert("Aucun résultat pour cette ville"));
// });

// //
// //
// //
// //
// //
// //
// /////////////////////////////////
// // AD EVENT LISTENER UNSPLASH API
// /////////////////////////////////

btn.addEventListener("click", function () {
  fetch(
    "https://api.unsplash.com/search/photos?query=" +
      weatherInput.value +
      "&client_id=OGBZEoHNxhCw7LBwbZFtwh0OJ42mSPtBqu0huoAeWHo"
  )
    .then((response) => response.json())
    .then((data) => {
      const randNum = Math.floor(Math.random() * 10);
      const townImgValue = data["results"][randNum]["urls"]["small"];
      hiddenImg.style.display = "block";
      townImage.src = townImgValue;
    })
    .catch((error) =>
      alert(
        "Une erreur a été commise (ou alors il n'existe aucune illustration pour cette ville)"
      )
    );
});

// //
// //
// //
// //
// //
// //
// //////////////////
// //  FORECAST FIRST
// //////////////////

// btn.addEventListener("click", function () {
//   fetch(
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//       weatherInput.value +
//       "&units=metric&appid=d033e292dbd6613c99ffece5e8a26ba9"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const aDayValue = data["list"][8]["main"]["temp"];
//       const bDayValue = data["list"][16]["main"]["temp"];
//       const cDayValue = data["list"][24]["main"]["temp"];
//       const dDayValue = data["list"][32]["main"]["temp"];
//       const eDayValue = data["list"][39]["main"]["temp"];

//       tDayOne.innerHTML = Math.round(aDayValue * 10) / 10 + "°C";
//       tDayTwo.innerHTML = Math.round(bDayValue * 10) / 10 + "°C";
//       tDayThree.innerHTML = Math.round(cDayValue * 10) / 10 + "°C";
//       tDayFour.innerHTML = Math.round(dDayValue * 10) / 10 + "°C";
//       tDayFive.innerHTML = Math.round(eDayValue * 10) / 10 + "°C";

//       hiddenImg.style.display = "block";
//       console.log(data);

//       const aIconValue = data["list"][8]["weather"][0]["icon"];
//       const bIconValue = data["list"][16]["weather"][0]["icon"];
//       const cIconValue = data["list"][24]["weather"][0]["icon"];
//       const dIconValue = data["list"][32]["weather"][0]["icon"];
//       const eIconValue = data["list"][39]["weather"][0]["icon"];

//       iDayOne.src =
//         "http://openweathermap.org/img/wn/" + aIconValue + "@2x.png";
//       iDayTwo.src =
//         "http://openweathermap.org/img/wn/" + bIconValue + "@2x.png";
//       iDayThree.src =
//         "http://openweathermap.org/img/wn/" + cIconValue + "@2x.png";
//       iDayFour.src =
//         "http://openweathermap.org/img/wn/" + dIconValue + "@2x.png";
//       iDayFive.src =
//         "http://openweathermap.org/img/wn/" + eIconValue + "@2x.png";

//       const dayOneValue = data["list"][7]["dt_txt"];
//       const dayTwoValue = data["list"][15]["dt_txt"];
//       const dayThreeValue = data["list"][23]["dt_txt"];
//       const dayFourValue = data["list"][31]["dt_txt"];
//       const dayFiveValue = data["list"][39]["dt_txt"];

//       dDayOne.innerHTML = dayOneValue;
//       dDayTwo.innerHTML = dayTwoValue;
//       dDayThree.innerHTML = dayThreeValue;
//       dDayFour.innerHTML = dayFourValue;
//       dDayFive.innerHTML = dayFiveValue;

//       console.log(dayOneValue);
//     })
//     .catch((error) => alert("Aucun résultat pour les prochains jours"));
// });

//  FORECAST SECOND

// btn.addEventListener("click", function () {
//   console.log(weatherInput);
//   fetch(
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//       weatherInput.value +
//       "&units=metric&appid=d033e292dbd6613c99ffece5e8a26ba9"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const tomorrowValue = data["list"][6]["main"]["temp"];
//       const tomorrowMaxValue = data["list"][6]["main"]["temp_max"];
//       const tomorrowMinValue = data["list"][6]["main"]["temp_min"];

//       townForecastTemp.innerHTML = tomorrowValue + "°";
//       tempMax.innerHTML = tomorrowMaxValue + "°";
//       tempMin.innerHTML = tomorrowMinValue + "°";
//     })
//     .catch((error) => alert("Aucun résultat pour cette ville"));
// });

//
//
//
//
//
//
//
//
//
//
//

//  API FONCTIONNE DS LA CONSOLE
// fetch(
//   "https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&appid=d033e292dbd6613c99ffece5e8a26ba9"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     console.log(data["list"][6]["main"]["temp"]);
//   })
//   .catch((err) => alert("Aucun résultat pour cette ville"));

// DAY
// const today = new Date();
// const day = today.getDate();
// const month = today.getMonth();
// const year = today.getFullYear();

// const hour = today.getHours();
// const minute = today.getMinutes();

// const townDate = document.querySelector(".town-date");

// const todayDate = day + `/` + month + `/` + year;
// const todayHour = hour + `:` + minute;

// dayOne.innerHTML = day + 1 + `/` + month + `/` + year;
// dayTwo.innerHTML = day + 2 + `/` + month + `/` + year;
// dayThree.innerHTML = day + 3 + `/` + month + `/` + year;
// dayFour.innerHTML = day + 4 + `/` + month + `/` + year;
// dayFive.innerHTML = day + 15 + `/` + month + `/` + year;
// console.log(dayOne);

weatherInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

//
//
//
//
