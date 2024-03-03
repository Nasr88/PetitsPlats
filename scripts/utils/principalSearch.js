import { recipes } from "../recipes.js";
import { RecipeCard } from "../templates/RecipeCard.js";
import {dropdownUtilities} from "../utils/displayDropDown.js"

// Écouteur d'événement sur le champ de recherche
document.querySelector(".pricipalSearch").addEventListener("input", function () {
    // Appeler la fonction de recherche avec la valeur actuelle du champ de recherche
    const userInput = this.value;

    // Vérifiez si la saisie a au moins 3 lettres avant de lancer la recherche
    if (userInput.length >= 3) {
      filterAndDisplayCards(userInput);
    }
  });

function searchRecipesLinear(userInput) {
  const query = userInput.toLowerCase();

  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(query)
      ) ||
      recipe.description.toLowerCase().includes(query)
  );
}

// Ajoutez une fonction pour filtrer et afficher les cartes
function filterAndDisplayCards(query) {
  const resultLinear = searchRecipesLinear(query);

  // Effacez les cartes existantes
  const cardSection = document.querySelector(".card_section");
  cardSection.innerHTML = "";

  // Affichez les nouvelles cartes filtrées
  resultLinear.forEach((recipe) => {
    const recipeCard = new RecipeCard(recipe);
    recipeCard.createCard();
  });

  // Obtenez les ingrédients des recettes filtrées
  const filtersSection = document.getElementById("filters");
  filtersSection.innerHTML = "";
  new dropdownUtilities().displayDropDown(resultLinear);

}



