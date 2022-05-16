var nome = document.getElementById("nome");
var sprite = document.getElementById("sprite");
var input_name = document.getElementById("input_name");
var caracteristicas = document.getElementById("caracteristicas");

input_name.addEventListener("input", () => {
  caracteristicas.innerHTML = "";
  if (input_name.value != "") {
    pegaPokemon(input_name.value.toLowerCase());
  } else {
  }
});

function pegaPokemon(value) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${value}`)
    .then(function (response) {
      console.log(response.data.forms[0].name);
      let habilidades = response.data.abilities;
      caracteristicas.innerHTML = `<div class="info"><div id="${response.data.forms[0].name}" class="btn-grad">${response.data.forms[0].name}</div> </div>`
      habilidades.forEach((element) => {
        console.log(element.ability.name);
        caracteristicas.innerHTML += ` <div id="${element.ability.name}" class="info"><div class="btn-grad">${element.ability.name}</div></div>`;
      });
      sprite.innerHTML = ` <img class="" src="${response.data.sprites.other.home.front_default}"  width="100%" alt="">`;
      nome.innerHTML = response.data.forms[0].name;
      //res.send(`<img src="${image}" alt="">`)
    })
    .catch(function (error) {
      console.error(error);
    });
}
