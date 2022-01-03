'use strict';

//nos traemos elementos del HTML
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const listaFavs = document.querySelector('.js-favoritesList');
let addFav = [];

//variables
const apiURL = 'https://api.jikan.moe/v3/search/anime?q=';
const imgIfNone = 'https://via.placeholder.com/227x320/e5e5e5/666/?text=TV';

let textInput = '';
let serieList = [];
let favorites = [];

//funcion botón reset

function handleResetBtn() {
  textInput = '';
  serieList = [];
  favorites = [];
}

resetBtn.addEventListener('click', handleResetBtn);

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
  getFavorites();
}

searchBtn.addEventListener('click', handleSearchBtn);

//funcion boton añadir a favoritos

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
//cojo los resultados y los pinto en el html

function getDataFromApi(element, title, series) {
  const titleFromApi = getTitle(title);
  const listFromApi = getList();
  for (const serie of series) {
    const listItemFromApi = getListItemFromApi(serie);
    const imageFromApi = getImageFromApi(serie);
    const titleSecondFromApi = getSecondTitleFromApi(serie);
    listItemFromApi.appendChild(imageFromApi);
    listItemFromApi.appendChild(titleSecondFromApi);
    listFromApi.appendChild(listItemFromApi);
  }
  element.appendChild(titleFromApi);
  element.appendChild(listFromApi);
  addFav = document.querySelectorAll('.ulSerie');
  for (let item of addFav) {
    item.addEventListener('click', handleFavBtn);
  }
}

function getTitle(title) {
  const element = document.createElement('h5');
  element.className = 'ulSerie__title';
  element.textContent = title;
  return element;
}

function getList() {
  const element = document.createElement('ul');
  element.className = 'results__results';
  return element;
}

//cojo la lista de los resultados, con sus imágenes y sus títulos para que se pinten correctamente en la función

function getListItemFromApi(serie) {
  const element = document.createElement('li');
  element.dataset.id = serie.mal_id;
  element.className = 'ulSerie';
  return element;
}

function getImageFromApi(serie) {
  const element = document.createElement('img');
  element.className = 'urlImg';
  element.src = serie.image_url;
  return element;
  //qué pasa, cómo lo hago para usar la funcion imgifnone si no tiene img?
}

function getSecondTitleFromApi(serie) {
  const element = document.createElement('h6');
  element.className = 'secondTitle';
  const text = document.createTextNode(serie.title);
  element.appendChild(text);
  return element;
}

//creamos función para pintar los favoritos

function handleFavBtn(ev) {
  ev.preventDefault();
  showFavs(ev);
  //getFavorites();
}

function showFavs(event) {
  const currentFav = parseInt(event.currentTarget.dataset.id);
  console.log(currentFav);
  const seriesFav = serieList.find((serie) => serie.mal_id === currentFav);
  favorites.push(seriesFav);
  console.log(favorites);
}

getFavsFromLocalStg();
saveFavsLocalStg();
