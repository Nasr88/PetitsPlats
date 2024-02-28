import { dropdownTemplate } from "../templates/dropdown.js"
import {RecipeCard} from "../templates/RecipeCard.js"
import {recipes} from "../recipes.js"
class home{
    constructor(){
        new dropdownTemplate(1,["test1","test2"]);
        new dropdownTemplate(2,["test3","test4"]);
        new RecipeCard(recipes[0]).createCard();
    }
     

}
new home();