import { recipes } from "../recipes.js";
import { recipeCardTemplate } from "../templates/RecipeCardTemplate.js";
import { dropdownUtilities } from "./dropdownUtilities.js";

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
        for (let i = 0; i < filtredRecipes.length; i++ ){
          const recipe = filtredRecipes[i];
          new recipeCardTemplate(recipe).createCard();
        }
       

        // Obtenez les ingrédients des recettes filtrées
        const filtersSection = document.querySelector(".dropdowns");
        filtersSection.innerHTML = "";
        numberOfRecipes.textContent = `${filtredRecipes.length} ${
          filtredRecipes.length === 1 ? "recette" : "recettes"
        }`;
        new dropdownUtilities().displayDropDown(filtredRecipes);
        
      }
   
  }
  searchRecipesLinear() {
    const userInput = document.querySelector(".principalSearch").value.trim();
    const query = userInput.toLowerCase();
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const ingredients = recipe.ingredients;
      let ingredientMatch = false;

      for (let j = 0; j < ingredients.length; j++) {
        const ingredient = ingredients[j].ingredient.toLowerCase();
        if (ingredient.includes(query)) {
          ingredientMatch = true;
          break; // Exit the loop if a match is found
        }
      }

      const isMatch =
        recipe.name.toLowerCase().includes(query) ||
        ingredientMatch ||
        recipe.description.toLowerCase().includes(query);

      if (isMatch) {
        filteredRecipes.push(recipe);
      }
  }
  return filteredRecipes;
}
}
