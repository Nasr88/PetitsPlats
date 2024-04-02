import { dropdownUtilities } from "../utils/dropdownUtilities.js";
import { recipeCardTemplate } from "../templates/RecipeCardTemplate.js";
import { recipes } from "../recipes.js";
import { searchBarUtility } from "../utils/searchBarUtility.js";
import { tagTemplate } from "../templates/tagTemplate.js";
export let filtredRecipes = recipes;
import { tagSearchUtility } from "../utils/tagSearchUtility.js"; 
export class home {
  constructor() {
    new dropdownUtilities().displayDropDown(recipes);
    this.displayRecipes();
    //new tagTemplate();
    // Écouteur d'événement sur le champ de recherche
    document.querySelector(".principalSearch").addEventListener("input", function () {
      let GetTagsValues=(dropdownMenuID)=> {
        let elements = document.querySelectorAll(
          `[data-category="${dropdownMenuID}"]`
        );
        const temp = [];
        // Iterate through each element
        elements.forEach((element) => {
          // Push the innerHTML (value) of each element to the array
          temp.push(element.innerText);
        });
        return temp;
      }
        // Appeler la fonction de recherche avec la valeur actuelle du champ de recherche
        const userInput = this.value;
        let  balisesHTML = /<[^>]*>/;
        // Vérifiez si la saisie a au moins 3 lettres avant de lancer la recherche
        if (userInput.length >= 3) {

          if (balisesHTML.test(userInput)) {
            document.getElementById("messageErreur").style.display = "block"; 
            return;
        } else {
            document.getElementById("messageErreur").style.display = "none"; 
            filtredRecipes = new searchBarUtility().searchRecipesLinear();
           new searchBarUtility().filterAndDisplayCards(filtredRecipes);
        }

           
        } else {
          document.getElementById("messageErreur").style.display = "none";
      }

        // sert à s'assurer que même si l'utilisateur a saisi uniquement des espaces dans la barre de recherche, cela ne sera pas considéré comme un terme de recherche valide.
        const searchTerm = document
          .querySelector(".principalSearch")
          .value.trim();

        // Vérifier si la barre de recherche est vide après la suppression
        if (searchTerm === "") {
          document.querySelector(".dropdowns").innerHTML = "";
          document.querySelector(".card_section").innerHTML = "";
          // // L'utilisateur a supprimé le texte de recherche et affiche toutes les recettes
          filtredRecipes = recipes;
           // Mettez à jour les filtres
           new tagSearchUtility().searchByTags(
          GetTagsValues("dropdown-menu-ingredients-dropdown"),
          GetTagsValues("dropdown-menu-ustensiles-dropdown"),
          GetTagsValues("dropdown-menu-appareils-dropdown")
          );
                   
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
