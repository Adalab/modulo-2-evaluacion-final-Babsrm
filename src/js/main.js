/* eslint-disable no-undef */
"use strict";

//Nos traemos los elementos del HTML
const userInput = document.querySelector(".js-userInput");
const searchBtn = document.querySelector(".js-searchBtn");
const resetBtn = document.querySelector(".js-resetBtn");

//data objeto
const data = {
  input: "",
};

// funcion input del usuario
function handlerUserInput() {
  if (userInput.value === "") {
    data.input = "";
  } else {
    data.input = userInput.value;
  }
};

userInput.addEventListener("keyup", handlerUserInput);

//funcion botón reset
function handleResetBtn() {
  userInput.value = "";
  data.name = "";
};

resetBtn.addEventListener("click", handleResetBtn);

//funcion botón search. Cogemos la data de la API
//const apiResults = document.querySelector(".js-resultsData");
let apiResults = [];

function handleSearchBtn(event) {
  event.preventDefault();
  fetch("https://api.jikan.moe/v3/search/anime?q=`${userInput.value}`")
    .then((response) => response.json())
    .then((dataApi) => {
      apiResults = dataApi.results;
      paintShows;
    });
};

//pintar resultados de la api
const resultsData = document.querySelector(".js-resultsData");

const getShowsFromApiResults = (shows) => {
  let htmlCode = "";
  htmlCode += `<article class= "showsResult"`;
  htmlCode += `<img src="${results.image_url}" class="show__img" alt= "Show: ${results.title}">`;
  htmlCode += `<h5 class= "show__title">${results.title}</h5>`;
  htmlCode += `<button class= "show__favbtn">Añadir a favoritos</button>`;
  htmlCode += `</article>`;
  return htmlCode;
};
const paintShows = () => {
  let showsCode = "";
  for (const show of shows) {
    showsCode += getShowsFromApiResults(shows);
  }
  resultsData.innerHTML = showsCode;
};

// {apiResults = dataApi.results;
//if (dataApi.request_cached === true) {
//si me da resultado, quiero añadirlo en el html (seria objeto?)
//tb debería de añadirlo al local para que se guarde

//console.log(dataApi);
//} else {
//si no me da resultado, pues... ¿quiero que aparezca un error de que no hay nada?
// }
// });

searchBtn.addEventListener("click", handleSearchBtn); //que funcione con click
// searchBtn.addEventListener("keypress", handleSearchBtn){
//    if (e.key === "Enter"){handleSearchBtn}}; //que funcione con enter
