import { searchBarUtility } from "../utils/searchBarUtility.js";
import { tagTemplate } from "../templates/tagTemplate.js";
export class dropdownTemplate {
  constructor(nameDropDown, idDropdown, items) {
    this.NameDropDown = nameDropDown;
    this.IdDropdown = idDropdown;
    this.Items = items;
    this.createDropdownTemplate();
  }

  createDropdownTemplate() {
    const DropDownHtml = `
      <div class="relative group w-48 ">
        <button id="dropdown-button-${
          this.IdDropdown
        }" class=" flex inline-flex w-48 h-14 p-3 items-center  w-full px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md  ">
          <span class="dropDownName mr-16  font-manrope font-medium text-base">${
            this.NameDropDown
          }</span>
       
          <span class="fa-solid fa-chevron-down" id="dropdownIcon-${
            this.IdDropdown
          }"></span>

        </button>
        <div id="dropdown-menu-${
          this.IdDropdown
        }" class="ddlMenu hidden absolute text-sm	font-normal z-1 right-0 mt-2 rounded-md  bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ">
          <!-- Search input -->
          <label class="relative block">
              <input id="search-input-${
                this.IdDropdown
              }" class="block w-full pl-2 pr-10 py-2 text-gray-800 border border-solid divide-lightGrey  border-gray-300 focus:outline-none" type="search" autocomplete="off">
              <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <svg class="h-5 w-5 fill-current text-gray-500 " xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
              height="30" viewBox="0 0 30 30">
              <path
                  d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
              </path>
              </svg>
              </span>
          </label>

          <button class="deleteDdlBtn" tabindex="0" style="display: block;"></button>
          <!-- Dropdown content goes here -->
          <ul id="options-${
            this.IdDropdown
          }" class="listItems h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200">
           ${this.Items.map(
             (element, index) =>
               `<li id="${this.IdDropdown}-Item${index}" class="item block px-4 py-2 text-gray-700 hover:bg-customYellow active:bg-blue-100 cursor-pointer rounded-md font-normal text-sm">${element}</li>`
           ).join("")} 
        </ul>   
      </div>
      
    </div>`;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = DropDownHtml;
    document.querySelector(".dropdowns").appendChild(newDiv);
    const dropdownButton = document.getElementById(
      `dropdown-button-${this.IdDropdown}`
    );
    const dropdownMenu = document.getElementById(
      `dropdown-menu-${this.IdDropdown}`
    );
    const searchInput = document.getElementById(
      `search-input-${this.IdDropdown}`
    );
    const dropdownIcon = document.getElementById(
      `dropdownIcon-${this.IdDropdown}`
    );
    let isOpen = true; // Set to false to open the dropdown by default

    // Function to toggle the dropdown state
    function toggleDropdown() {
      isOpen = !isOpen;
      dropdownMenu.classList.toggle("hidden", !isOpen);
      dropdownIcon.classList.toggle("rotate180", isOpen);
    }

    // Set initial state
    toggleDropdown();

    dropdownButton.addEventListener("click", () => {
      toggleDropdown();
    });

    // Add event listener to filter items based on input (tailwind tagsearch)
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const items = dropdownMenu.querySelectorAll("li");

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
    //new tagTemplate().createTagTemplate(dropdownMenu);
  }
}
