"use strict";

//nos traemos elementos del HTML
const searchBtn = document.querySelector(".js-searchBtn");
const resetBtn = document.querySelector(".js-resetBtn");
const listaFavs = document.querySelector(".js-favoritesList");
const addFavBtn = document.querySelector(".js-addFavBtn");

//variables
const apiResult = 'https://api.jikan.moe/v3/search/anime?q=';
const imgIfNone = "https://via.placeholder.com/227x320/e5e5e5/666/?text=TV";

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
function callApi () {    
    fetch (`${apiResult}${textInput}`) 
        .then((response) => response.json())
        .then (data => {
            console.log(data);
            serieList = data.results;
            console.log(serieList[0]);
        })
         paintResults();
}

//funcion boton buscar

function handleSearchBtn(ev) {
    ev.preventDefault();
    textInput = document.querySelector('.js-userInput').value;
    callApi();

}

searchBtn.addEventListener("click", handleSearchBtn);

//boton añadir favoritos (y guardamos la búsqueda en localStorage)

function handleAddFavBtn(event){
    event.preventDefault();
    let add = document.querySelector(".js-addFavBtn${[i]}");
    favorites.push(add);
    localStorage.setItem("title", favorites); //quiero que me guarde el titulo en los favoritos

}
addFavBtn.addEventListener("click", handleAddFavBtn);

//pintamos los resultados obtenidos desde la api

const paintResults = (serieList) => {
    const showListElem = document.querySelectorAll(".js-seriesList");
    //cojo el queryselectorall porque quiero todos los objetos del array
        let htmlCode = "";
        let i = 0;
        for (const serie of serieList){
            htmlCode += `<li>`;
            htmlCode += `<h5>${serieList.title}</h5>`;
            htmlCode += `<button class= "show__favbtn js-addFavBtn${[i]}">Añadir a favoritos</button>`;
            if (serieList.img_url === null) {
                htmlCode += `<img src="${imgIfNone}" alt= "Anime: ${serieList.title}">`;
            } else {
                htmlCode += `<img src="${serieList.image_url}" alt= "Anime: ${serieList.title}">`;
            }
            htmlCode += `</li>`;
            i++;
            }
            showListElem.innerHTML += htmlCode;
}

//pintamos los favoritos

function showFavs (){
    let favElems ="";
    document.querySelector(".js-favlistcontainer").innerHTML =
    `<li>${for (let i=0; i< localStorage.length; i++){
        favShow = localStorage.key(i);  
        favElems.innerHTML += `<h5>${favorites.title}</h5>`;
        favElems.innerHTML += `${if (favorites.img_url === null) {
            favElems.innerHTML += `<img src="${imgIfNone}" alt= "Anime: ${favorites.title}">`;
        } else {
            favElems.innerHTML += `<img src="${favorites.image_url}" alt= "Anime: ${favorites.title}">`; //no sé cómo añadir la imagen si no es con el if. está mal el código
        }
        favElems.innerHTML += `</li>`;
    }
    }


