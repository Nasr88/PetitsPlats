import { tagSearchUtility } from "../utils/tagSearchUtility.js";

export class tagTemplate {
 
  SelectedIngredients=[]
  SelectedUstensils =[]
  SelectedAppareils = []
  constructor() {   
    const dropdownIngredients = document.getElementById(
      "dropdown-menu-ingredients-dropdown"
    );
    const dropdownUstensils = document.getElementById(
      "dropdown-menu-ustensiles-dropdown"
    );
    const dropdownAppareils = document.getElementById(
      "dropdown-menu-appareils-dropdown"
    );
 

    this.createTagTemplate(dropdownIngredients);
    this.createTagTemplate(dropdownUstensils);
    this.createTagTemplate(dropdownAppareils);  

    this.SelectedIngredients = this.GetTagsValues("dropdown-menu-ingredients-dropdown");
    this.SelectedUstensils =   this.GetTagsValues("dropdown-menu-ustensiles-dropdown");
    this.SelectedAppareils =   this.GetTagsValues("dropdown-menu-appareils-dropdown");
  }
  createTagTemplate(dropdownMenu) {
    const DivTags = document.querySelector(".tag_section");
    const items = dropdownMenu.querySelectorAll("li");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const tagWord = `
        <span data-category=${dropdownMenu.id} id="tag-${
          item.id
        }"  class="tagItem inline-flex items-center bg-customYellow px-2 py-1 me-2 text-sm mr-2  font-manrope font-normal text-base font-medium rounded text-black">
           ${item.textContent.toLowerCase()}
         </span>
       
         <button id="btnCloseTag-${
          item.id
        }" 
           class="closeButton inline-flex items-center justify-center w-13 h-4 transition-color focus:outline-none focus:ring"
           type="button"
         >
           <span class="sr-only" > Close </span>
       
           <svg  class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
           </svg>
         </button>
       
            `;
        //Pour tester si le tag existe déja:
        if (!document.getElementById(`tag-${item.id}`)) {
          let tempDiv = document.createElement("div");
          tempDiv.classList.add(
            "inline-flex",
            "items-center",
            "overflow-hidden",
            "text-black",
            "h-14",
            "px-4",
            "py-2",
            "text-sm",
            "font-medium",
            "rounded-md",
            "rounded",
            "bg-customYellow",
            "text-black",
            "gap-15",
            "mt-5"
          );
          tempDiv.innerHTML = tagWord;
          DivTags.appendChild(tempDiv);

          

          if (dropdownMenu.id === "dropdown-menu-ingredients-dropdown") 
            this.SelectedIngredients.push(item.textContent.toLowerCase());
             
          if (dropdownMenu.id === "dropdown-menu-ustensiles-dropdown") 
            this.SelectedUstensils.push(item.textContent.toLowerCase());
        
          if (dropdownMenu.id === "dropdown-menu-appareils-dropdown")
            this.SelectedAppareils.push(item.textContent.toLowerCase());

            

          new tagSearchUtility().searchByTags(
            this.SelectedIngredients,
            this.SelectedUstensils,
            this.SelectedAppareils
          );

        }
      });
    });

  document.querySelectorAll(".tagItem").forEach((tag)=>{
    tag?.parentElement?.querySelector(".closeButton")?.addEventListener("click", (event) => {
      const closeButton = event.target;
      this.removeTag(tag.getAttribute("data-category"),tag.id);
    });
  })
     
   
  }

  GetTagsValues(dropdownMenuID) {
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

  
      
     
  
      removeTag(tagCategoryId, tagId) {

         /*const tagCategoryId = button.getAttribute('data-category');
      const tagId = button.getAttribute('data-tag-id');*/

        let _SelectedIngredients = this.GetTagsValues("dropdown-menu-ingredients-dropdown");
        let _SelectedUstensils = this.GetTagsValues("dropdown-menu-ustensiles-dropdown");
        let _SelectedAppareils = this.GetTagsValues("dropdown-menu-appareils-dropdown");
        const tagToRemove = document.getElementById(`${tagId}`);
        if (tagToRemove) {
            tagToRemove.parentNode.remove();
    
            // Retirez le tag des tableaux Selected
            const tagText = tagToRemove.innerText.toLowerCase().trim();
            if (tagCategoryId === "dropdown-menu-ingredients-dropdown") 
            _SelectedIngredients = _SelectedIngredients.filter(tag => tag !== tagText);
            /*else 
               this.SelectedIngredients = _SelectedIngredients;*/

            if (tagCategoryId === "dropdown-menu-ustensiles-dropdown") 
            _SelectedUstensils = _SelectedUstensils.filter(tag => tag !== tagText);
            /*else
              this.SelectedUstensils = _SelectedUstensils;*/
            
             if (tagCategoryId === "dropdown-menu-appareils-dropdown")
              _SelectedAppareils = _SelectedAppareils.filter(tag => tag !== tagText);
            /*else
              this.SelectedAppareils = _SelectedAppareils;*/
    
            // Mettez à jour les filtres
            new tagSearchUtility().searchByTags(
              _SelectedIngredients,
              _SelectedUstensils,
              _SelectedAppareils
            );
        }
    }
  
}

