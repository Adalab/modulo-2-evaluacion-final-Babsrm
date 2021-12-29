/* eslint-disable no-undef */
"use strict";

//Nos traemos los elementos del HTML
const userInput = document.querySelector(".js-userInput");
const searchBtn = document.querySelector(".js-searchBtn");
const resetBtn = document.querySelector(".js-resetBtn");
const apiResults = document.querySelector(".js-resultsData");
const favListElem = document.querySelector(".js-favoritesList");
const deletefavElem = document.querySelector(".js-resetBtnfav");
const formElement = document.querySelector(".js-form");


//constantes y variables que usaremos
const apiUrl = 'https://api.jikan.moe/v3/search/anime';
const imgIfNone = 'https://via.placeholder.com/227x320/e5e5e5/666/?text=TV';

let shows = [];
let favorites =[];


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

function getShowFromApi(txtInput) {
  txtInput.preventDefault();
  fetch(apiUrl + txtInput)
    .then((response) => response.json())
    .then((dataApi) => {
      apiResults = [];
      paintShows;
    });
    getShowsFromApiResults();
};

//pintar resultados de la api


const getShowsFromApiResults = (shows) => {
  const showListElem = document.querySelector(".js-seriesList");

  let htmlCode = "";

  for (const show of shows) {
    let isShowClass;
    let showInFavorites = favorites.findIndex(
      (favorite) => favorite.id === show.id
    );

    if (showInFavorites === -1) {
      isShowClass = "serie";
    } else {
      isShowClass = "selected";
    }
  htmlCode += `<li id ="${show.id}" class="js-serie li__show ${isShowClass} >`;
  htmlCode += `<h5 class= "show__title">${results.title}</h5>`;
  htmlCode += `<button class= "show__favbtn">Añadir a favoritos</button>`;
  if (show.img_url === null) {
    imgIfNone;
  }
  else {
    htmlCode += `<img src="${results.image_url}" class="show__img" alt= "Show: ${results.title}">`;
  }
  htmlCode += `</li>`;
  
  return htmlCode;
};

apiResults.innerHTML = htmlCode;

//buscar la entrada de datos
function handleSearchBtn() {
  let inputValue = userInput.value;
  getShowsFromApiResults(inputValue);}

searchBtn.addEventListener("click", handleSearchBtn); //que funcione con click
// searchBtn.addEventListener("keypress", handleSearchBtn){
//    if (e.key === "Enter"){handleSearchBtn}}; //que funcione con enter

// enviar formulario
function handleForm(ev) {
  ev.preventDefault();
}

formElement.addEventListener("submit", handleForm);

// Crear localstorage
function setInLocalStorage() {
  const stringFavorites = JSON.stringify(favorites);

  localStorage.setItem("favorite", stringFavorites);
}

// Cargar localstorage
function getFromLocalStorage() {
  let localStorageFavourites = localStorage.getItem("favorite");

  if (localStorageFavourites === null) {
    favorites = [];
  } else {
    const arrayFav = JSON.parse(localStorageFavourites);
    favorites = arrayFav;
    renderFavorites();
  }
}

getFromLocalStorage();

// escuchamos elemento que clicamos
function listenClickFavs() {
  const liElements = document.querySelectorAll(".js-deleteIcon");

  for (const liElement of liElements) {
    liElement.addEventListener("click", deleteFav);
  }
}

//eliminamos alguna serie que teníamos en favoritos
function deleteFav(event) {
  const clickDelFav = event.currentTarget;
  const deleteFav = parseInt(clickDelFav.id);
  const favFound = favorites.findIndex((fav) => fav.id === deleteFav);

  favorites.splice(favFound, 1);
  setInLocalStorage();
  renderFavorites();
  renderSeries();
}

//borramos todos los favoritos
function deleteAllFav() {
  favorites = [];

  setInLocalStorage();
  renderFavorites();
  renderSeries();
}
deletefavElement.addEventListener("click", deleteAllFav);