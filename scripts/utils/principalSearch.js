import { recipes } from "../recipes.js";
import { RecipeCard } from "../templates/RecipeCard.js";
import {dropdownUtilities} from "../utils/displayDropDown.js"
import {home}from "../pages/index.js"

// Écouteur d'événement sur le champ de recherche
document.querySelector(".principalSearch").addEventListener("input", function () {
    // Appeler la fonction de recherche avec la valeur actuelle du champ de recherche
    const userInput = this.value;

    // Vérifiez si la saisie a au moins 3 lettres avant de lancer la recherche
    if (userInput.length >= 3) {
      filterAndDisplayCards(userInput);
    }

     // sert à s'assurer que même si l'utilisateur a saisi uniquement des espaces dans la barre de recherche, cela ne sera pas considéré comme un terme de recherche valide.  
     const searchTerm = document.querySelector(".principalSearch").value.trim();

     // Vérifier si la barre de recherche est vide après la suppression
     if (searchTerm === "") {
        document.getElementById("filters").innerHTML = "";
        document.querySelector(".card_section").innerHTML = "";
       // L'utilisateur a supprimé le texte de recherche et affiche toutes les recettes 
       new home().displayRecipes();
       //reninitialiser les tags
       //new dropdownUtilities().displayDropDown(recipes);
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


