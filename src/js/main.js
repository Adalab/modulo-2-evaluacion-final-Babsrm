'use strict';

//nos traemos elementos del HTML
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const resetBtnFav = document.querySelector('.js-resetBtnfav');
const listaFavs = document.querySelector('.js-favlistcontainer');
const resultsForDlt = document.querySelector('.js-resultsData');
const resultsApi = document.querySelector('.js-resultsData');

//variables
const apiURL = 'https://api.jikan.moe/v3/search/anime?q=';
const imgIfNone = 'https://via.placeholder.com/227x320/e5e5e5/666/?text=TV';

let addFav = [];
let textInput = '';
let serieList = [];
let favorites = [];

//llamadores
resetBtn.addEventListener('click', handleResetBtn);
searchBtn.addEventListener('click', handleSearchBtn);
resetBtnFav.addEventListener('click', rmvFavsFromLocalStg);

//funcion botón reset
function handleResetBtn() {
  textInput = '';
  serieList = [];
  favorites = [];
  listaFavs.innerHTML = '';
  resultsForDlt.innerHTML = '';
  rmvFavsFromLocalStg();
}

//funcion boton buscar
function handleSearchBtn(ev) {
  ev.preventDefault();
  textInput = document.querySelector('.js-userInput').value;
  callApi();
}

//llamamos al servidor api
function callApi() {
  fetch(`${apiURL}${textInput}`)
    .then((response) => response.json())
    .then((data) => {
      serieList = data.results;
      getSeriesResult();
    });
}

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
    resetBtnFav.classList.remove('hidden');
  } else {
    rmvFavsFromLocalStg();
    resetBtnFav.classList.add('hidden');
  }
}

function rmvFavsFromLocalStg() {
  localStorage.removeItem('favorites');
}


//cogemos datos, muchos datos de la api
function getSeriesResult() {
  resultsApi.textContent = '';
  if (serieList.length > 0) {
    getDataFromApi();
  }
}

//cojo los resultados y los pinto en el html; así mismo, incluyo en el listener de seleccionar un item al hacer click y enviarlo a favs

function getDataFromApi() {
  const titleFromApi = getTitle('Resultados');
  const listFromApi = getList();
  resultsApi.innerHTML = '';

  for (const serie of serieList) {
    const ifFav = favorites.findIndex(
      (serieFav) => serieFav.mal_id === serie.mal_id);
    const listItemFromApi = getListItemFromApi(serie);
    const imageFromApi = getImageFromApi(serie);
    const titleSecondFromApi = getSecondTitleFromApi(serie);
    listItemFromApi.appendChild(imageFromApi);
    listItemFromApi.appendChild(titleSecondFromApi);
    listFromApi.appendChild(listItemFromApi);

    //si la serie es favorita

    if (ifFav !== -1) {
      listItemFromApi.classList.add('favSelectedColors');
    }
  }
  resultsApi.appendChild(titleFromApi);
  resultsApi.appendChild(listFromApi);
  addFav = document.querySelectorAll('.ulSerie');
  for (let item of addFav) {
    item.addEventListener('click', handleFavBtn);
  }
}

//cojo la lista de los resultados, con sus imágenes y sus títulos para que se pinten correctamente en la función
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

function getListItemFromApi(serie) {
  const element = document.createElement('li');
  element.dataset.id = serie.mal_id;
  element.className = 'ulSerie';
  return element;
}

function getImageFromApi(serie) {
  const element = document.createElement('img');
  element.className = 'urlImg';
  if (serie.image_url !== '') {
    element.src = serie.image_url;
  } else {
    element.src = imgIfNone;
  }
  element.src = serie.image_url;
  return element;
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
  getInfoFromFavs();
  saveFavsLocalStg();
  getDataFromApi();
}

function showFavs(event) {
  const currentFav = parseInt(event.currentTarget.dataset.id);
  const seriesFav = serieList.find((serie) => serie.mal_id === currentFav);
  favorites.push(seriesFav);
}
//creamos un bucle for sobre seriesFav para poder pintarlo
function getInfoFromFavs() {
  listaFavs.innerHTML = '';
  for (const fav of favorites) {
    const listItemFromApi = getListItemFromApi(fav);
    const imageFromApi = getImageFromApi(fav);
    const titleSecondFromApi = getSecondTitleFromApi(fav);
    listaFavs.appendChild(imageFromApi);
    listaFavs.appendChild(titleSecondFromApi);
    listaFavs.appendChild(listItemFromApi);
  }
}

getFavsFromLocalStg();
getInfoFromFavs();
