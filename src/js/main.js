'use strict';

//nos traemos elementos del HTML
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const listaFavs = document.querySelector('.js-favoritesList');
const addFavBtn = document.querySelector('.js-addFavBtn');

//variables
const apiURL = 'https://api.jikan.moe/v3/search/anime?q=';
const imgIfNone = 'https://via.placeholder.com/227x320/e5e5e5/666/?text=TV';

let textInput = '';
let serieList = [];
let favorites = [];

//funcion botón reset
// function handleResetBtn() {
//     textInput = "";
//     data.name = "";
//   }

//   resetBtn.addEventListener("click", handleResetBtn);

//llamamos al servidor api
function callApi() {
  fetch(`${apiURL}${textInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      serieList = data.results;
      console.log(serieList[0]);
      getSeriesResult();
    });
}

//funcion boton buscar

function handleSearchBtn(ev) {
  ev.preventDefault();
  textInput = document.querySelector('.js-userInput').value;
  callApi();
}

searchBtn.addEventListener('click', handleSearchBtn);

//Guardamos los favoritos en el local storage

function getFavsFromLocalStg() {
  const favoritesFromLocalStorage = JSON.parse(
    localStorage.getItem('favorites')
  );
  if (favoritesFromLocalStorage) {
    favorites = favoritesFromLocalStorage;
  }
}

function saveFavsLocalStg() {
  if (favorites.length > 0) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    rmvFavsFromLocalStg();
  }
}

function rmvFavsFromLocalStg() {
  localStorage.removeItem('favorites');
}

//pintamos los resultados obtenidos desde la api

function paintResults() {
  const showListElem = document.querySelectorAll('.js-seriesList');
  //cojo el queryselectorall porque quiero todos los objetos del array
  let htmlCode = '';
  let i = 0;
  for (const serie of serieList) {
    htmlCode += `<li>`;
    htmlCode += `<h5>${serie.title}</h5>`;
    htmlCode += `<button class= "show__favbtn js-addFavBtn${[
      i,
    ]}">Añadir a favoritos</button>`;
    if (serie.img_url === null) {
      htmlCode += `<img src="${imgIfNone}" alt= "Anime: ${serie.title}">`;
    } else {
      htmlCode += `<img src="${serie.image_url}" alt= "Anime: ${serie.title}">`;
    }
    htmlCode += `</li>`;
    i++;
  }
  showListElem.innerHTML += htmlCode;
}

//pintamos los favoritos

function showFavs() {
  let favElems = '';
  // document.querySelector(".js-favlistcontainer").innerHTML =
  // `<li>${for (let i=0; i< localStorage.length; i++){
  //     favShow = localStorage.key(i);
  //     favElems.innerHTML += `<h5>${favorites.title}</h5>`;
  //     favElems.innerHTML += `${if (favorites.img_url === null) {
  //         favElems.innerHTML += `<img src="${imgIfNone}" alt= "Anime: ${favorites.title}">`;
  //     } else {
  //         favElems.innerHTML += `<img src="${favorites.image_url}" alt= "Anime: ${favorites.title}">`; //no sé cómo añadir la imagen si no es con el if. está mal el código
  //     }
  //     favElems.innerHTML += `</li>`;
  //}   no sé ejecutar bien esto
}

//cogemos datos, muchos datos de la api

function getSeriesResult() {
  const resultsApi = document.querySelector('.js-resultsData');
  resultsApi.textContent = '';
  if (serieList.length > 0) {
    getDataFromApi(resultsApi, 'Resultados', serieList);
  }
}

function getFavorites() {
  const favoritesList = document.querySelector('.js-favlistcontainer');
  favoritesList.textContent = '';

  if (favorites.length > 0) {
    favoritesList.classList.add('favorites');
    getDataFromApi(favoritesList, 'Series fav', favorites);
    removeAllFav();
  } else {
    favoritesList.classList.remove('favorites');
  }
}

function getDataFromApi(element, title, series) {
  const titleFromApi = getTitle(title);
  const listFromApi = getList();
  for (const serie of series) {
    const listItemFromApi = getListItemFromApi(title, serie);
    const imageFromApi = GetImageFromApi(serie);
    const titleSecondFromApi = getSecondTitleFromApi(title, serie);
    listItemFromApi.appendChild(imageFromApi);
    listItemFromApi.appendChild(titleSecondFromApi);
    listFromApi.appendChild(listItemFromApi);
  }
  element.appendChild(titleFromApi);
  element.appendChild(listFromApi);
}

function getTitle(title) {
  const element = document.createElement('h5');
  element.className = 'ulSeries';
  element.textContent = title;
  return element;
}

function getList() {
  const element = document.createElement('ul');
  element.className = 'results__results';
  return element;
}

function getListItemFromApi(title, serie) {
  const element = document.createElement('li');
  element.dataset.id = serie.mal_id;
}



getFavsFromLocalStg();
saveFavsLocalStg();