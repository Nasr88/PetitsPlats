export class dropdownTemplate {
  constructor(idDropdown, items) {
    this.IdDropdown = idDropdown;
    this.Items = items;
    this.createTemplate();
  }

  createTemplate() {
    const DropDownHtml = `
      <div class="relative group ">
        <button id="dropdown-button-${
          this.IdDropdown
        }" class=" flex inline-flex w-48 h-14 p-3 items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          <span class="mr-2  font-manrope font-medium text-base">Open Dropdown</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <div id="dropdown-menu-${
          this.IdDropdown
        }" class="hidden absolute text-sm	font-normal right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
          <!-- Search input -->
          <label class="relative block">
              <input id="search-input-${
                this.IdDropdown
              }" class="block w-full pl-2 pr-10 py-2 text-gray-800 border border-solid divide-lightGrey  border-gray-300 focus:outline-none" type="search" placeholder="Search items" autocomplete="off">
              <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                    height="30" viewBox="0 0 30 30">
                    <path
                        d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                    </path>
                </svg>
            </span>
           </label>

          <button class="deleteDdlBtn" tabindex="0" style="display: block;"></button>
          <!-- Dropdown content goes here -->
          <ul>
           ${this.Items.map(
             (element, index) =>
               `<li id="${this.IdDropdown}-Item${index}" class="item block px-4 py-2 text-gray-700 hover:bg-customYellow active:bg-blue-100 cursor-pointer rounded-md font-normal text-sm">${element}</li>`
           ).join("")} 
        </ul>   
      </div>
      
    </div>`;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = DropDownHtml;
    document.getElementById("filters").appendChild(newDiv);
    const dropdownButton = document.getElementById(
      `dropdown-button-${this.IdDropdown}`
    );
    const dropdownMenu = document.getElementById(
      `dropdown-menu-${this.IdDropdown}`
    );
    const searchInput = document.getElementById(
      `search-input-${this.IdDropdown}`
    );
    let isOpen = false; // Set to true to open the dropdown by default

    // Function to toggle the dropdown state
    function toggleDropdown() {
      isOpen = !isOpen;
      dropdownMenu.classList.toggle("hidden", !isOpen);
    }

    // Set initial state
    toggleDropdown();

    dropdownButton.addEventListener("click", () => {
      toggleDropdown();
    });

    // Add event listener to filter items based on input
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

    const DivTags = document.querySelector(".tag_section");
    const items = dropdownMenu.querySelectorAll("li");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const tagWord = `
        <div class="inline-flex items-center h-8 overflow-hidden text-white bg-blue-500 rounded">
         <span id="tag-${
           item.id
         }"  class="tagItem inline-flex items-center bg-customYellow px-2 py-1 me-2 text-sm font-medium  rounded text-black">
           ${item.textContent.toLowerCase()}
         </span>
       
         <button onclick="return this.parentNode.remove();"
           class="inline-flex items-center justify-center w-8 h-8 transition-color focus:outline-none focus:ring"
           type="button"
         >
           <span class="sr-only" > Close </span>
       
           <svg  class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
           </svg>
         </button>
        </div>
            `;

        if (!document.getElementById(`tag-${item.id}`)) {
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = tagWord;
          DivTags.appendChild(tempDiv);
        }
      });
    });
  }
}
