const baseUrl = "http://localhost:3001";

//Prelevo gli ingredienti
getIngredients();
// Prelevo le pizze
getPizzas("all");
const ingredientSelect = document.getElementById("ingredient-select");
// Applico il filtro alle pizze
ingredientSelect.addEventListener("change", () => {
  const selectedIngredient = ingredientSelect.value;
  getPizzas(selectedIngredient);
});

////////////////////////////
// FUNZIONS
function getPizzas(ingredient) {
  let url = `${baseUrl}/pizzas`;
  if (ingredient !== "all") {
    url += `?ingredient=${ingredient}`;
  }
  axios.get(url).then((resp) => {
    const pizzeArray = resp.data.pizze;
    printCards(pizzeArray);
  });
}

function getIngredients() {
  axios.get(`${baseUrl}/ingredients`).then((resp) => {
    const ingredientsList = resp.data.ingredients;
    const ingredientsSelect = document.getElementById("ingredient-select");

    ingredientsList.forEach((ingredient) => {
      ingredientsSelect.innerHTML += `<option value="${ingredient}">${ingredient}</option>`;
    });
  });
}

function printCards(pizzeArray) {
  const pizzasContainer = document.getElementById("pizzas-container");
  pizzasContainer.innerHTML = "";
  pizzeArray.forEach((curPizza) => {
    pizzasContainer.innerHTML += `
      <div class="col">
        <div class="card">
          <img src="http://localhost:3001/${
            curPizza.image
          }" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${curPizza.name}</h5>
            <p class="card-text">${curPizza.ingredients.join("; ")}</p>
            <a href="#" class="btn btn-primary">Dettagli</a>
          </div>
        </div>
      </div>
    `;
  });
}
