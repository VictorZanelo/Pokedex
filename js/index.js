var nome = document.getElementById("nome");
var img_poke = document.getElementById("img_poke");
var input_name = document.getElementById("input_name");

var caracteristicas = document.getElementById("caracteristicas");
var link = document.querySelector("link[rel~='icon']");

var not_found = document.getElementById("not_found");
//var poke = document.getElementById("poke");
var load = document.getElementById("load");

input_name.addEventListener("input", () => {
  caracteristicas.innerHTML = "";
  if (input_name.value != "") {
    pegaPokemon(input_name.value.toLowerCase());
  } else {
  }
});

function pegaPokemon(value) {
  not_found.style.display = "none";
  img_poke.style.display = "none";
  load.style.display = "block";
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${value}`)
    .then(function (response) {
      //link.href = response.data.sprites.front_default ;
      link.href = response.data.sprites.other.home.front_default;

      let habilidades = response.data.types;
      caracteristicas.innerHTML = `<div class="info"><div id="${response.data.forms[0].name}" class="btn-grad">${response.data.forms[0].name}</div> </div>`;
      habilidades.forEach((element) => {
        caracteristicas.innerHTML += ` <div id="${element.type.name}" class="info"><div class="btn-grad">${element.type.name}</div></div>`;
      });
      
      img_poke.innerHTML = ` <img class="sprite_poke" src="${response.data.sprites.other.home.front_default}"  width="100%" alt="">`;
      //nome.innerHTML = response.data.forms[0].name;
      img_poke.style.display = "block";
      not_found.style.display = "none";
      load.style.display = "none";
    })
    .catch(function (error) {
      console.log(error)
      caracteristicas.innerHTML += ` <div class="info"><div class="btn-grad">404</div></div>`;
      load.style.display = "none";
      img_poke.style.display = "none";
      not_found.style.display = "block";
    });
}
