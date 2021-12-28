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
}

userInput.addEventListener("keyup", handlerUserInput);

//funcion botón reset
function handleResetBtn() {
  userInput.value = "";
  data.name = "";
}

resetBtn.addEventListener("click", handleResetBtn);

//funcion botón search
const apiResults = document.querySelector(".js-resultsData");

function handleSearchBtn(event) {
  event.preventDefault();
  fetch("//api.jikan.moe/v3/search/anime?q=naruto", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((dataApi) => {
      if (dataApi.request_cached === true) {
       //si me da resultado, quiero añadirlo en el html (seria objeto?)
       //tb debería de añadirlo al local para que se guarde
       apiResults.innerHTML = dataApi.results;
      } else {
        //si no me da resultado, pues... ¿quiero que aparezca un error de que no hay nada?
      }
    });
}

searchBtn.addEventListener("click", handleSearchBtn); //que funcione con click
searchBtn.addEventListener("enter", handleSearchBtn); //que funcione con enter
