import { dropdownUtilities } from "../utils/dropdownUtilities.js";
import { recipeCardTemplate } from "../templates/RecipeCardTemplate.js";
import { recipes } from "../recipes.js";
import { searchBarUtility } from "../utils/searchBarUtility.js";
import { tagTemplate } from "../templates/tagTemplate.js";

export class home {
  constructor() {
    new dropdownUtilities().displayDropDown(recipes);
    this.displayRecipes();
    
   
    // Écouteur d'événement sur le champ de recherche
    document.querySelector(".principalSearch").addEventListener("input", function () {
        // Appeler la fonction de recherche avec la valeur actuelle du champ de recherche
        const userInput = this.value;

        // Vérifiez si la saisie a au moins 3 lettres avant de lancer la recherche
        if (userInput.length >= 3) {
          const filtredRecipes = new searchBarUtility().searchRecipesLinear();
           new searchBarUtility().filterAndDisplayCards(filtredRecipes);
        }

        // sert à s'assurer que même si l'utilisateur a saisi uniquement des espaces dans la barre de recherche, cela ne sera pas considéré comme un terme de recherche valide.
        const searchTerm = document
          .querySelector(".principalSearch")
          .value.trim();

        // Vérifier si la barre de recherche est vide après la suppression
        if (searchTerm === "") {
          document.querySelector(".dropdowns").innerHTML = "";
          document.querySelector(".card_section").innerHTML = "";
          // L'utilisateur a supprimé le texte de recherche et affiche toutes les recettes
          new home().displayRecipes();         
        }
      });
  }
  

  displayRecipes() {
    recipes.forEach((recipeData) => {
      new recipeCardTemplate(recipeData).createCard();
    });
    document.querySelector('.recipes_count').textContent = `${recipes.length} ${recipes.length === 1 ? 'recette' : 'recettes'}`;
  }
}
new home();
