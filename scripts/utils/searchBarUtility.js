import { recipes } from "../recipes.js";
import { recipeCardTemplate } from "../templates/RecipeCardTemplate.js";
import { dropdownUtilities } from "./dropdownUtilities.js";
import { home } from "../pages/index.js";
import { tagTemplate } from "../templates/tagTemplate.js";

export class searchBarUtility {
  // Ajoutez une fonction pour filtrer et afficher les cartes
  filterAndDisplayCards(filtredRecipes) {
    const cardSection = document.querySelector(".card_section");
    const numberOfRecipes = document.querySelector(".recipes_count");

      if (!filtredRecipes.length) {
        cardSection.innerHTML = "<p>Aucune recette n'a été trouvée.</p>"; 
        numberOfRecipes.textContent = ``;
      } else {
        // Effacez les cartes existantes

        cardSection.innerHTML = "";

        // Affichez les nouvelles cartes filtrées
        filtredRecipes.forEach((recipe) => {
          new recipeCardTemplate(recipe).createCard();
        });

        // Obtenez les ingrédients des recettes filtrées
        const filtersSection = document.querySelector(".dropdowns");
        filtersSection.innerHTML = "";
        numberOfRecipes.textContent = `${filtredRecipes.length} ${
          filtredRecipes.length === 1 ? "recette" : "recettes"
        }`;
        new dropdownUtilities().displayDropDown(filtredRecipes);
        
      }
    //}
  }
  searchRecipesLinear() {
    const userInput = document.querySelector(".principalSearch").value.trim();
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
}
