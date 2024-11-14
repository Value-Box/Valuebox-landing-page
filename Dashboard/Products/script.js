document.querySelectorAll(".required").forEach(function (input) {
  // On focus, remove the red border
  input.addEventListener("focus", function () {
    input.classList.remove("is-invalid"); // Remove red border on focus
  });

  // On blur, check if input is empty and add the red border if it's empty
  input.addEventListener("blur", function () {
    // For select elements, check if the value is empty
    if (input.tagName === "SELECT" && input.value === "") {
      input.classList.add("is-invalid"); // Add red border if select is empty
    } else if (input.value.trim() === "") {
      input.classList.add("is-invalid"); // Add red border if input is empty
    }
    let choices = document.querySelector("choices__inner");
    if (choices.value == "") {
      choices.classList.add("is-invalid");
    } else if (input.value.trim() === "") {
      choices.classList.add("is-invalid"); // Add red border if input is empty
    }
  });

  // On input (as the user types), remove the red border
  input.addEventListener("input", function () {
    if (input.value.trim() !== "") {
      input.classList.remove("is-invalid"); // Remove red border as soon as user types
    }
  });
});

// Validate on form submission or button click
document
  .getElementById("addProNextBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    // Get all required fields (both input and select with the 'required' class)
    const inputs = document.querySelectorAll(".required");

    // Check if any required input is empty
    inputs.forEach(function (input) {
      // For select elements, check if the value is empty
      if (input.tagName === "SELECT" && input.value === "") {
        input.classList.add("is-invalid"); // Add red border for empty select
        isValid = false;
      } else if (input.value.trim() === "") {
        input.classList.add("is-invalid"); // Add red border for empty input field
        isValid = false;
      }
    });

    // If valid, you can proceed further
    if (isValid) {
      document.querySelector("#basicInformationForm").style.display = "none";
    }
  });

// Initialize Choices.js
const dropdownElement = document.getElementById("categoryDropDown");
const choicesInstance = new Choices(dropdownElement);

// Add event listener for radio buttons
document.querySelectorAll('input[name="flexRadioDefault"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const selectedValue = this.value; // Get the value of the selected radio button

    // Set the dropdown value using Choices.js API
    choicesInstance.setChoiceByValue(selectedValue);
  });
});

document.getElementById("utubeUrl").addEventListener("input", function () {
  const youtubeUrl = document.getElementById("utubeUrl").value;
  const errorMessage = document.getElementById("errorMessage");

  // YouTube URL regular expression pattern
  const youtubePattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)([a-zA-Z0-9_-]{11})$/;

  // Test the URL with the regex
  if (!youtubePattern.test(youtubeUrl)) {
    errorMessage.style.display = "block"; // Show error message
  } else {
    errorMessage.style.display = "none"; // Hide error message
  }
});

function calculatPricing() {
  // Cost, Selling aur Special Prices ko parse karna
  let costPrice = parseInt(document.getElementById("costPrice").value) || 0;
  let sellingPrice =
    parseInt(document.getElementById("sellingPrice").value) || 0;
  let specialPrice =
    parseInt(document.getElementById("specialPrice").value) || 0;
  let profitElement = document.getElementById("Profit");

  let profit = sellingPrice - costPrice;
  let finalProfit = specialPrice - costPrice;
  console.log("Special Price:", specialPrice);

  if (specialPrice > 0) {
    if (finalProfit > 0) {
      profitElement.textContent = finalProfit;
    } else {
      profitElement.textContent = "0.00";
    }
  } else {
    if (profit > 0) {
      profitElement.textContent = profit;
    } else {
      profitElement.textContent = "0.00";
    }
  }
}

// function selectedOptionDropdown() {
//   let selOptType = document.getElementById("selOptType").value;
//   let colorDropDown = document.getElementById("colorDropDown");
//   let sizeDropDown = document.getElementById("sizeDropDown");
//   let customInput1 = document.getElementById("customInput1");
//   let customInput2 = document.getElementById("customInput2");

//   // Hide color and size dropdowns and inputs by default
//   colorDropDown.style.display = "none";
//   sizeDropDown.style.display = "none";
//   customInput1.style.display = "none";
//   customInput2.style.display = "none";

//   // Show the corresponding dropdown or inputs based on the selection
//   if (selOptType === "color") {
//     colorDropDown.style.display = "block";
//   } else if (selOptType === "size") {
//     sizeDropDown.style.display = "block";
//   } else if (selOptType === "custom") {
//     customInput1.style.display = "block"; // Show first custom input
//     customInput2.style.display = "block"; // Show second custom input
//   }
// }



// Function to add a variant

const selectedVariants = {}; // Global object for all selected values

function addVariant() {
  var selectedOption = document.getElementById("selOptType").value;
  var colorSelect = document.getElementById("MultiSelectColor");
  var options = colorSelect.getElementsByTagName("option");
  let customInput1 = document.getElementById("customInput1").value;
  let customInput2 = document.getElementById("custInput2").value;
  let saveVariantDiv = document.getElementById("saveVariantDiv");
  var selectedValues = [];

  // Get selected values from MultiSelectColor
  // for (var i = 0; i < options.length; i++) {
  //     if (options[i].selected) {
  //         selectedValues.push(options[i].value);
  //     }
  // }
  // Get selected values from MultiSelectColor

  
if (selectedOption === "color") {
  var colorSelect = document.getElementById("MultiSelectColor");
  var options = colorSelect.getElementsByTagName("option");
  for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
          selectedValues.push(options[i].value);
      }
  }
} else if (selectedOption === "size") {
  var sizeSelect = document.getElementById("sizeDropDown").querySelector(".sizeDropDown");
  var sizeOptions = sizeSelect.getElementsByTagName("option");
  for (var i = 0; i < sizeOptions.length; i++) {
      if (sizeOptions[i].selected) {
          selectedValues.push(sizeOptions[i].value);
      }
  }
}

// console.log(selectedValues)
//   if (selectedValues.length === 0 && selectedOption === "color") {
//     alert("Please select a color first.");
//     return;
// }

let variantList = document.getElementById("variantList");

if (selectedOption === "color" && variantList.querySelector(".colorDropDown")) {
  alert("A color variant has already been added.");
  return;
}
if (selectedOption === "size" && variantList.querySelector(".sizeDropDown")) {
  alert("A size variant has already been added.");
  return;
}
if (selectedOption === "custom" && variantList.querySelector(".customRow")) {
  alert("A custom variant has already been added.");
  return;
}
  // Check if a color dropdown already exists
  // if (variantList.querySelector(".colorDropDown")) {
  //     alert("A color variant has already been added.");
  //     return;
  // }

  let newRow = document.createElement("div");
  newRow.classList.add("variantRow", "d-flex", "gap-2", "w-100");
  newRow.id = "row-" + Date.now(); // Unique ID for each row
  const uniqueId = Date.now(); // or use a counter like uniqueIdCounter++
  newRow.id = `row-${uniqueId}`;
  if (variantList.childElementCount > 0) {
    newRow.style.marginTop = "20px";
  }
  
  if (selectedOption === "color") {
    newRow.innerHTML = `
        <fieldset class="form-group d-flex gap-2 mb-0" disabled>
            <select class="form-select form-select-lg">
                <option value="color" selected>Color</option>
            </select>
        </fieldset>
        <div class="form-group mb-0 w-100" id="colorDropDown">
            <select class="choices form-select multiple-remove colorDropDown" multiple="multiple">
                <option value="red" ${selectedValues.includes("red") ? "selected" : ""}>Red</option>
              <option value="green" ${selectedValues.includes("green") ? "selected" : ""}>Green</option>
              <option value="blue" ${selectedValues.includes("blue") ? "selected" : ""}>Blue</option>
              <option value="purple" ${selectedValues.includes("purple") ? "selected" : ""}>Purple</option>
              <option value="black" ${selectedValues.includes("black") ? "selected" : ""}>Black</option>
            </select>
        </div>
        <button class="removeVariantBtn" onclick="removeVariant(this)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 6.386C3 5.902 3.345 5.509 3.771 5.509H6.436C6.965 5.493 7.432 5.11 7.612 4.544L7.642 4.444L7.757 4.053C7.827 3.813 7.888 3.603 7.974 3.416C8.312 2.677 8.938 2.164 9.661 2.033C9.845 2 10.039 2 10.261 2H13.739C13.962 2 14.156 2 14.339 2.033C15.062 2.164 15.689 2.677 16.026 3.416C16.112 3.603 16.173 3.812 16.244 4.053L16.358 4.444L16.388 4.544C16.568 5.11 17.128 5.494 17.658 5.509H20.228C20.655 5.509 21 5.902 21 6.386C21 6.87 20.655 7.263 20.229 7.263H3.77C3.345 7.263 3 6.87 3 6.386Z" fill="#999999"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.42474 11.4824C9.83774 11.4384 10.2047 11.7554 10.2457 12.1894L10.7457 17.4524C10.7867 17.8854 10.4857 18.2724 10.0747 18.3164C9.66274 18.3594 9.29474 18.0434 9.25374 17.6094L8.75374 12.3464C8.71274 11.9124 9.01374 11.5254 9.42474 11.4824ZM14.5747 11.4824C14.9867 11.5254 15.2877 11.9124 15.2457 12.3464L14.7457 17.6094C14.7057 18.0434 14.3377 18.3594 13.9257 18.3164C13.5127 18.2724 13.2127 17.8864 13.2537 17.4524L13.7537 12.1884C13.7947 11.7554 14.1627 11.4384 14.5737 11.4814" fill="#999999"/>
  <path opacity="0.5" d="M11.596 22.0004H12.404C15.187 22.0004 16.578 22.0004 17.484 21.1144C18.388 20.2284 18.48 18.7754 18.665 15.8694L18.932 11.6814C19.032 10.1044 19.082 9.31541 18.629 8.81641C18.175 8.31641 17.409 8.31641 15.876 8.31641H8.12396C6.59096 8.31641 5.82396 8.31641 5.37096 8.81641C4.91796 9.31641 4.96696 10.1044 5.06796 11.6814L5.33496 15.8694C5.51996 18.7754 5.61196 20.2294 6.51696 21.1144C7.42196 22.0004 8.81296 22.0004 11.596 22.0004Z" fill="#999999"/>
</svg>
        </button>
        <button class="drag-btn" type="button" draggable="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 8H18M6 12H18M6 16H18" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
} else if (selectedOption === "size") {
  newRow.innerHTML = `
      <fieldset class="form-group d-flex gap-2 mb-0" disabled>
          <select class="form-select form-select-lg">
              <option value="size" selected>Size</option>
          </select>
      </fieldset>
      <div class="form-group mb-0 w-100" id="sizeDropDown">
          <select class="choices form-select multiple-remove sizeDropDown" multiple="multiple">
              <option value="Small" ${selectedValues.includes("Small") ? "selected" : ""}>Small</option>
              <option value="Medium" ${selectedValues.includes("Medium") ? "selected" : ""}>Medium</option>
              <option value="Large" ${selectedValues.includes("Large") ? "selected" : ""}>Large</option>
          </select>
      </div>
      <button class="removeVariantBtn" onclick="removeVariant(this)">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 6.386C3 5.902 3.345 5.509 3.771 5.509H6.436C6.965 5.493 7.432 5.11 7.612 4.544L7.642 4.444L7.757 4.053C7.827 3.813 7.888 3.603 7.974 3.416C8.312 2.677 8.938 2.164 9.661 2.033C9.845 2 10.039 2 10.261 2H13.739C13.962 2 14.156 2 14.339 2.033C15.062 2.164 15.689 2.677 16.026 3.416C16.112 3.603 16.173 3.812 16.244 4.053L16.358 4.444L16.388 4.544C16.568 5.11 17.128 5.494 17.658 5.509H20.228C20.655 5.509 21 5.902 21 6.386C21 6.87 20.655 7.263 20.229 7.263H3.77C3.345 7.263 3 6.87 3 6.386Z" fill="#999999"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.42474 11.4824C9.83774 11.4384 10.2047 11.7554 10.2457 12.1894L10.7457 17.4524C10.7867 17.8854 10.4857 18.2724 10.0747 18.3164C9.66274 18.3594 9.29474 18.0434 9.25374 17.6094L8.75374 12.3464C8.71274 11.9124 9.01374 11.5254 9.42474 11.4824ZM14.5747 11.4824C14.9867 11.5254 15.2877 11.9124 15.2457 12.3464L14.7457 17.6094C14.7057 18.0434 14.3377 18.3594 13.9257 18.3164C13.5127 18.2724 13.2127 17.8864 13.2537 17.4524L13.7537 12.1884C13.7947 11.7554 14.1627 11.4384 14.5737 11.4814" fill="#999999"/>
  <path opacity="0.5" d="M11.596 22.0004H12.404C15.187 22.0004 16.578 22.0004 17.484 21.1144C18.388 20.2284 18.48 18.7754 18.665 15.8694L18.932 11.6814C19.032 10.1044 19.082 9.31541 18.629 8.81641C18.175 8.31641 17.409 8.31641 15.876 8.31641H8.12396C6.59096 8.31641 5.82396 8.31641 5.37096 8.81641C4.91796 9.31641 4.96696 10.1044 5.06796 11.6814L5.33496 15.8694C5.51996 18.7754 5.61196 20.2294 6.51696 21.1144C7.42196 22.0004 8.81296 22.0004 11.596 22.0004Z" fill="#999999"/>
</svg>
      </button>
      <button class="drag-btn" type="button" draggable="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 8H18M6 12H18M6 16H18" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </button>
  `;
} else if (selectedOption === "custom") {
  newRow.classList.add("customRow");
    newRow.innerHTML = `
        <fieldset class="form-group d-flex gap-2 mb-0" >
            <select class="form-select form-select-lg" disabled>
                <option value="custom" selected>Custom</option>
            </select>
            <input class="form-control form-control-lg" id="customInput1" value="${customInput1}" type="text">
        </fieldset>
         <fieldset class="form-group w-100 m-0" id="customInput2">
              <input class="form-control form-control-lg" id="custInput2" type="text" value="${customInput2}">
          </fieldset>
        <button class="removeVariantBtn" onclick="removeVariant(this)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 6.386C3 5.902 3.345 5.509 3.771 5.509H6.436C6.965 5.493 7.432 5.11 7.612 4.544L7.642 4.444L7.757 4.053C7.827 3.813 7.888 3.603 7.974 3.416C8.312 2.677 8.938 2.164 9.661 2.033C9.845 2 10.039 2 10.261 2H13.739C13.962 2 14.156 2 14.339 2.033C15.062 2.164 15.689 2.677 16.026 3.416C16.112 3.603 16.173 3.812 16.244 4.053L16.358 4.444L16.388 4.544C16.568 5.11 17.128 5.494 17.658 5.509H20.228C20.655 5.509 21 5.902 21 6.386C21 6.87 20.655 7.263 20.229 7.263H3.77C3.345 7.263 3 6.87 3 6.386Z" fill="#999999"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.42474 11.4824C9.83774 11.4384 10.2047 11.7554 10.2457 12.1894L10.7457 17.4524C10.7867 17.8854 10.4857 18.2724 10.0747 18.3164C9.66274 18.3594 9.29474 18.0434 9.25374 17.6094L8.75374 12.3464C8.71274 11.9124 9.01374 11.5254 9.42474 11.4824ZM14.5747 11.4824C14.9867 11.5254 15.2877 11.9124 15.2457 12.3464L14.7457 17.6094C14.7057 18.0434 14.3377 18.3594 13.9257 18.3164C13.5127 18.2724 13.2127 17.8864 13.2537 17.4524L13.7537 12.1884C13.7947 11.7554 14.1627 11.4384 14.5737 11.4814" fill="#999999"/>
  <path opacity="0.5" d="M11.596 22.0004H12.404C15.187 22.0004 16.578 22.0004 17.484 21.1144C18.388 20.2284 18.48 18.7754 18.665 15.8694L18.932 11.6814C19.032 10.1044 19.082 9.31541 18.629 8.81641C18.175 8.31641 17.409 8.31641 15.876 8.31641H8.12396C6.59096 8.31641 5.82396 8.31641 5.37096 8.81641C4.91796 9.31641 4.96696 10.1044 5.06796 11.6814L5.33496 15.8694C5.51996 18.7754 5.61196 20.2294 6.51696 21.1144C7.42196 22.0004 8.81296 22.0004 11.596 22.0004Z" fill="#999999"/>
</svg>
        </button>
        <button class="drag-btn" type="button" draggable="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 8H18M6 12H18M6 16H18" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
}


  variantList.appendChild(newRow);

  // Initialize Choices.js for the new dropdown
  // const colorDropdown = newRow.querySelector(".colorDropDown");
  if (selectedOption === "color") {
    const colorDropdown = newRow.querySelector(".colorDropDown");
    new Choices(colorDropdown, {
        removeItemButton: true,
        searchEnabled: true,
        itemSelectText: '',
    });
} else if (selectedOption === "size") {
    const sizeDropdown = newRow.querySelector(".sizeDropDown");
    new Choices(sizeDropdown, {
        removeItemButton: true,
        searchEnabled: true,
        itemSelectText: '',
    });
}

if (variantList.childElementCount > 0) {
  saveVariantDiv.style.display = 'flex';
}
  // Select the drag button and set up drag events
  const dragButton = newRow.querySelector(".drag-btn");

  dragButton.addEventListener("dragstart", (e) => {
      newRow.classList.add("dragging");
      updateTopRowClass(); // Check top row on drag start
      e.stopPropagation(); // Only allow drag from button
  });

  dragButton.addEventListener("dragend", () => {
      newRow.classList.remove("dragging");
      updateTopRowClass(); // Check top row on drag start
  });
  updateTopRowClass(); // Initial call to assign "top-row" to the first element after addition

}

// Function to handle updating the top row class
function updateTopRowClass() {
  const variantList = document.getElementById("variantList");
  const rows = Array.from(variantList.children);

  rows.forEach(row => row.classList.remove("top-row")); // Remove "top-row" class from all rows
  if (rows.length > 0) {
    rows[0].classList.add("top-row"); // Assign "top-row" class to the first row
  }
}

// Function to remove variant row
function removeVariant(button) {
  let row = button.parentNode;
  let variantList = document.getElementById("variantList");

  // Remove the selected row
  variantList.removeChild(row);

  // Hide `saveVariantDiv` if no rows are left
  if (variantList.childElementCount === 0) {
    saveVariantDiv.style.display = 'none';
  }
}

const sortableList = document.querySelector(".variantList");

sortableList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const items = [...sortableList.querySelectorAll(".variantRow:not(.dragging)")];

    let nextSibling = null;
    for (const item of items) {
        const box = item.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;

        if (offset > 0) {
            nextSibling = item.nextElementSibling;
        } else if (!nextSibling) {
            nextSibling = item; // This allows placement at the top if dragged above the first item
        }
    }

    sortableList.insertBefore(draggingItem, nextSibling);
});

function saveVariant() {
  console.log("Save button clicked");

  const variantTableBody = document.getElementById('variantTableBody');
  const colorSelect = document.getElementById('MultiSelectColor');
  const sizeSelect = document.getElementById('sizesDropDown');

  if (!colorSelect || !sizeSelect) {
    console.error("One or both dropdowns are missing.");
    return;
  }

  const selectedColors = Array.from(colorSelect.selectedOptions).map(option => option.value);
  const selectedSizes = Array.from(sizeSelect.selectedOptions).map(option => option.value);

  console.log("Selected Colors:", selectedColors);
  console.log("Selected Sizes:", selectedSizes);

  if (selectedColors.length === 0 || selectedSizes.length === 0) {
    alert("Please select both color and size before saving.");
    return;
  }

  // Clear the previous rows before appending new rows
  variantTableBody.innerHTML = "";

  selectedColors.forEach(color => {
    // Create the parent row for each color
    let parentRow = document.createElement("tr");
    parentRow.classList.add("variant-parent");

    const numVariants = selectedSizes.length;

    parentRow.innerHTML = `
      <td class="d-flex gap-3">
        <input class="form-check-input variantProductCheck" type="checkbox">
        <img src="../Images/productImage.png" alt="">
        <div class="variantParentDet">
          <p class="m-0 varParTitle">${color}</p>
          <p class="m-0 varParDescription">Select Size</p>
          <span class="varParToChild">${numVariants.toString().padStart(2, '0')} Variants <span class="arrow"><img src="../Images/weui_arrow-filled.svg" alt=""></span></span>
        </div>
      </td>
      <td><span class="varParPrice">RS. 7,000</span></td>
      <td><span class="varParStock">36</span></td>
    `;

    variantTableBody.appendChild(parentRow);

    // Add event listener to toggle child rows for each color
    const parentRowElement = parentRow.querySelector('.varParToChild');
    parentRowElement.addEventListener('click', () => {
      const childRows = document.querySelectorAll(`.child-of-${color}`);
      childRows.forEach(row => {
        row.style.display = row.style.display === "none" ? "table-row" : "none";
      });

      const arrow = parentRowElement.querySelector('.arrow');
      arrow.classList.toggle('rotate');
    });

    // Now create a separate child row for each size under this color
    selectedSizes.forEach(size => {
      let childRow = document.createElement("tr");
      childRow.classList.add("variant-child", `child-of-${color}`);
      childRow.style.display = "none"; // Initially hide the child rows

      childRow.innerHTML = `
        <td class="d-flex gap-3">
          <input class="form-check-input variantProductCheck" type="checkbox">
          <img src="../Images/productImage.png" alt="">
          <div class="variantParentDet">
            <p class="m-0 varParTitle">${color} - ${size}</p>
            <p class="m-0 varParDescription">Seller SKU. HIFI M-16</p>
          </div>
        </td>
        <td><span class="varParPrice">RS. 7,000</span></td>
        <td><span class="varParStock">36</span></td>
      `;

      variantTableBody.appendChild(childRow);
    });
  });

  updateTopRowClass();
}







//Function to remove a variant
//   function removeVariant(button) {
//     let row = button.parentNode;
//     row.remove(); // Remove the row
//   }
  function selectedColor() {
    // Access the Choices.js instance for the color dropdown
    let colorDropDown = document.getElementsByClassName('colorDropDown')[0]; // Grab the first matching element
    let colorChoices = colorDropDown.choices; // Access the Choices.js instance

    // Get the selected values (this will return an array of selected options)
    let selectedValues = colorChoices.getValue(true); // `true` will return the selected values as an array

    // Log the selected values to the console
    console.log(selectedValues);
}
