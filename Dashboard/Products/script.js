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
function createTagInput(inputId) {
  const inputElem = document.getElementById(inputId);
  if (inputElem) {
    // Check if tags-input-wrapper already exists
    const existingWrapper = inputElem.parentNode.querySelector('.tags-input-wrapper');
    if (existingWrapper) {
      console.log(`Tags input for ID: ${inputId} is already initialized.`);
      return; // Exit if already initialized
    }

    console.log(`Initializing tags input for ID: ${inputId}`);

    const wrapper = document.createElement('div');
    wrapper.className = 'tags-input-wrapper';

    const input = document.createElement('input');
    wrapper.append(input);
    inputElem.setAttribute('hidden', true);
    inputElem.parentNode.insertBefore(wrapper, inputElem);

    let tagsArray = [];

    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const tagText = input.value.trim();
        if (tagText && !tagsArray.includes(tagText)) {
          tagsArray.push(tagText);
          addTag(wrapper, tagText, tagsArray, inputElem);
          input.value = '';
        }
        console.log(tagText);
      }
    });
    console.log(tagsArray);
  } else {
    // console.log(`Input element with ID: ${inputId} not found!`);
  }
}

// Updated addTag function remains the same
function addTag(wrapper, tagText, tagsArray, inputElem) {
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.innerHTML = `${tagText} <button type="button" class="crossBtn" aria-label="Remove item: '${tagText}'" data-button=""><svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
  <path d="M7.5 0.75L1 7.25M1 0.75L7.5 7.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>`;

  // Adding the event listener for the button to remove the tag
  tag.querySelector('button').onclick = (e) => {
    e.preventDefault();
    // Remove the tag from the tags array
    tagsArray.splice(tagsArray.indexOf(tagText), 1);
    // Remove the tag element from the DOM
    tag.remove();
    // Update the hidden input value to reflect the updated tags
    inputElem.value = tagsArray.join(',');
    // console.log("Updated hidden input value (after remove):", inputElem.value);
    updateSelectedVariants(); // Update after removing a tag (this function is not defined here)
  };

  // Insert the new tag element before the input field
  wrapper.insertBefore(tag, wrapper.querySelector('input'));
  
  // Update the hidden input field with the current tags array
  inputElem.value = tagsArray.join(',');
  // console.log("Updated hidden input value (after add):", inputElem.value);
  updateSelectedVariants(); // Update after adding a tag
}



      
// const selectedVariants = {}; // Global object for all selected values

function addVariant() {
  var selectedOption = document.getElementById("selOptType").value;
//   var colorSelect = document.getElementById("MultiSelectColor");
//   var options = colorSelect.getElementsByTagName("option");
//   let customInput1 = document.getElementById("customInput1").value;
//   let customInput2 = document.getElementById("custInput2").value;
//   let saveVariantDiv = document.getElementById("saveVariantDiv");
//   var selectedValues = [];
  
// if (selectedOption === "color") {
//   var colorSelect = document.getElementById("MultiSelectColor");
//   var options = colorSelect.getElementsByTagName("option");
//   for (var i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//           selectedValues.push(options[i].value);
//       }
//   }
// } else if (selectedOption === "size") {
//   var sizeSelect = document.getElementById("sizeDropDown").querySelector(".sizeDropDown");
//   var sizeOptions = sizeSelect.getElementsByTagName("option");
//   for (var i = 0; i < sizeOptions.length; i++) {
//       if (sizeOptions[i].selected) {
//           selectedValues.push(sizeOptions[i].value);
//       }
//   }
// }

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
// if (selectedOption === "custom" && variantList.querySelector(".customRow")) {
//   alert("A custom variant has already been added.");
//   return;
// }
if (selectedOption === "") {
 
  return;
}

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
                      <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="black">Black</option>
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
              <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
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
            <input class="form-control form-control-lg" id="customInput1" type="text">
        </fieldset>
         <fieldset class="form-group form-group-lg w-100 m-0" id="customInput2">
              <input class="form-control form-control-lg " id="custInput" type="text">
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
  newRow.querySelectorAll("select").forEach(dropdown => {
    dropdown.addEventListener("change", updateSelectedVariants);
});
document.getElementById("selOptType").value = "";
createTagInput('custInput');
document.querySelectorAll(".variantRow input[type='hidden']").forEach(input => {
  if (!input.getAttribute("data-initialized")) {
    createTagInput(input.id);
    input.setAttribute("data-initialized", true);
  }
});

}



let selectedVariants = {
  parentValues: "",
  childValues: "",
  color:"",
  size:"",
  customValues: "", // New property for custom input values
  tags: '' // New property to store tags
};

function updateSelectedVariants() {
  selectedVariants.parentValues = "";
  selectedVariants.childValues = "";
  selectedVariants.customValues = "";
  selectedVariants.tags = ""; // Store tags as a comma-separated string
  selectedVariants.tagInputValues = ""; // Store tag input values as a comma-separated string

  const rows = Array.from(document.querySelectorAll(".variantRow"));
  let parentAssigned = false;

  rows.forEach((row, index) => {
    const dropdowns = row.querySelectorAll("select.choices");
    const selectedOptions = Array.from(dropdowns)
      .flatMap(dropdown => Array.from(dropdown.selectedOptions).map(option => option.value))
      .filter(option => option.trim() !== "") // Remove empty values
      .join(",");

    const customInputElem = row.querySelector("input[type='hidden']");
    const customInputValues = customInputElem ? customInputElem.value.trim() : "";

    const tagWrapper = row.querySelector(".tags-input-wrapper");
    let tagValues = "";
    let tagInputValues = "";

    if (tagWrapper) {
      const tags = tagWrapper.querySelectorAll(".tag");
      tagValues = Array.from(tags)
        .map(tag => tag.textContent.replace('×', '').trim())
        .filter(tag => tag !== "")
        .join(","); // Convert tags to a comma-separated string

      tagInputValues = Array.from(tagWrapper.querySelectorAll(".tag-input"))
        .map(tagInput => tagInput.value.trim()).filter(value => value !== "").join(","); // Convert tag input values to a comma-separated string
        
    }

    // For parent and child rows
    if (selectedOptions || customInputValues || tagValues) {
      const combinedValues = [
        selectedOptions,
        customInputValues,
        tagValues
      ].filter(value => value !== "").join(",");

      if (!parentAssigned) {
        selectedVariants.parentValues = combinedValues;
        selectedVariants.customValues = customInputValues;
        selectedVariants.tags = tagValues;
        selectedVariants.tagInputValues = tagInputValues;
        parentAssigned = true;
      } else {
        selectedVariants.childValues += combinedValues + (combinedValues ? "," : "");
        selectedVariants.tags += (tagValues ? "," + tagValues : "");
        selectedVariants.tagInputValues += (tagInputValues ? "," + tagInputValues : "");
      }
    }
  });

  // Clean up values
  selectedVariants.childValues = selectedVariants.childValues.replace(/,$/, "");
  selectedVariants.customValues = selectedVariants.customValues.replace(/,$/, "");
  selectedVariants.tags = selectedVariants.tags.replace(/,$/, ""); // Remove trailing comma
  selectedVariants.tagInputValues = selectedVariants.tagInputValues.replace(/,$/, ""); // Remove trailing comma
  
  console.log("Final Selected Variants:", selectedVariants);
  console.log(selectedVariants.tags)
}




// Function to handle drag events and update selected variants
function handleDragEvents() {
  const sortableList = document.querySelector(".variantList");

  if (sortableList) {
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
          nextSibling = item;
        }
      }

      sortableList.insertBefore(draggingItem, nextSibling);
    });

    sortableList.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
    });

    sortableList.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");

      // Ensure the variants are updated after the drag ends
      updateSelectedVariants();
      updateTopRowClass(); // This will help update the 'top-row' class based on the new parent
    });
  } else {
    // console.error("Sortable list not found!");
  }
}

// Initialize drag event handling
document.addEventListener("DOMContentLoaded", function () {
  createTagInput('custInput'); // Initial call for an existing input by ID if applicable
  
  // Handle drag events and other initializations
  handleDragEvents();

  // Initialize tag inputs for any existing .variantRow hidden inputs
  document.querySelectorAll(".variantRow input[type='hidden']").forEach(input => {
    if (!input.getAttribute("data-initialized")) {
      createTagInput(input.id);
      input.setAttribute("data-initialized", true);
    }
  });

  document.querySelectorAll("select.choices, input[type='text']").forEach(input => {
    input.addEventListener("change", () => {
      updateSelectedVariants();
      updateTopRowClass();
    });
  });
});


// Update top row class based on current parent
function updateTopRowClass() {
  const variantList = document.getElementById("variantList");
  const rows = Array.from(variantList.children);

  // Remove "top-row" class from all rows
  rows.forEach(row => row.classList.remove("top-row"));

  // Check if there are any rows in the list
  if (rows.length > 0) {
    // Assign "top-row" class to the row that is currently the parent
    const parentRow = rows.find(row => selectedVariants.parentValues[row.id]);
    if (parentRow) {
      parentRow.classList.add("top-row");
    }

    // Log top row details for debugging
    // console.log("Top Row:", parentRow || "No parent row selected");
  }
}

// Call this function whenever a dropdown changes
document.querySelectorAll("select.choices, input[type='text']").forEach(input => {
  input.addEventListener("change", () => {
    updateSelectedVariants();
    updateTopRowClass();
  });
});


// Function to remove variant row
function removeVariant(button) {
  let row = button.parentNode;
  let variantList = document.getElementById("variantList");

  // Remove the selected row
  variantList.removeChild(row);

  // Hide `saveVariantDiv` if no rows are left
  const saveVariantDiv = document.getElementById('saveVariantDiv');

  if (variantList.childElementCount === 0) {
    saveVariantDiv.style.display = 'none';
  }
}


function saveVariant() {
  // const customInput1 = document.getElementById('customInput1');
  // if (customInput1) {
  //   console.log(customInput1.value);
  // } else {
  //   console.log("Element with ID 'customInput1' not found");
  // }
  const rows = Array.from(document.querySelectorAll(".variantRow"));
  const variantTableBody = document.getElementById("variantTableBody");
  const parentValues = selectedVariants.parentValues.split(",").filter(value => value !== "");
  const childValues = selectedVariants.childValues ? selectedVariants.childValues.split(",").filter(value => value !== "") : [];
  
  // Ensure tags is an array
  const tags = selectedVariants.tags && typeof selectedVariants.tags === "string" && selectedVariants.tags.trim() !== ""
    ? selectedVariants.tags.split(",").map(tag => tag.trim())
    : [];

  // Validation: Ensure parent variants are selected
  if (parentValues.length === 0) {
    alert("Please select parent variants before saving.");
    return;
  }

  var isCustomRow = document.getElementsByClassName('customRow');


  console.log("Selected Parent Values:", parentValues);
  console.log("Selected Child Values:", childValues);
  console.log("Selected Tags:", tags);

  variantTableBody.innerHTML = ""; // Clear any previously generated variants

  // Iterate through each parent value to create parent rows
  parentValues.forEach((color) => {
    let parentRow = document.createElement("tr");
    parentRow.classList.add("variant-parent");

    // Filter out any empty values from tags and child values
    const filteredTags = tags.filter(tag => tag.trim() !== "");
    const filteredChildValues = childValues.filter(value => isNaN(value.trim()) && value.trim() !== "");

    // Check if it's a "custom" row based on the parent value
    

    // Determine number of variants based on if it's a custom row or not
    const numVariants = isCustomRow ? filteredChildValues.length : filteredChildValues.length * (filteredTags.length > 0 ? filteredTags.length : 1);

    parentRow.innerHTML = `
      <td class="d-flex gap-3">
        <input class="form-check-input variantProductCheck parent-checkbox" type="checkbox">
        <img src="../Images/productImage.png" alt="">
        <div class="variantParentDet">
          <p class="m-0 varParTitle">${color}</p>
          <p class="m-0 varParDescription">${numVariants > 0 ? 'Select Variants' : 'No Variants Available'}</p>
          ${numVariants > 0 ?
            `<span class="varParToChild">${numVariants.toString().padStart(2, '0')} Variants <span class="arrow"><img src="../Images/weui_arrow-filled.svg" alt=""></span></span>`
            : ''
          }
        </div>
      </td>
      <td><span class="varParPrice">RS. 7,000</span></td>
      <td><span class="varParStock">36</span></td>
    `;

    variantTableBody.appendChild(parentRow);

    // Add click event to toggle child visibility
    const parentRowElement = parentRow.querySelector(".varParToChild");
    if (numVariants > 0) {
      parentRowElement.addEventListener("click", () => {
        const childRows = document.querySelectorAll(`.child-of-${color}`);
        childRows.forEach(row => {
          row.style.display = row.style.display === "none" ? "table-row" : "none";
        });

        const arrow = parentRowElement.querySelector(".arrow");
        arrow.classList.toggle("rotate");
      });
    }

    // Generate combinations of child values and tags based on if it's a custom row or not
    const combinations = [];
    if (isCustomRow) {
      // Custom row: only use filtered child values, ignore tags
      filteredChildValues.forEach(size => {
        combinations.push(size.trim());
      });
    } else {
      // Regular row: use both filtered child values and tags
      if (filteredChildValues.length > 0 && filteredTags.length > 0) {
        filteredChildValues.forEach(size => {
          filteredTags.forEach(tag => {
            combinations.push(`${size.trim()} / ${tag.trim()}`);
          });
        });
      } else if (filteredChildValues.length > 0) {
        filteredChildValues.forEach(size => {
          combinations.push(size.trim());
        });
      }
    }
    

    console.log("Generated Combinations for", color, ":", combinations);

    // Add child rows to the table
    combinations.forEach(combination => {
      let childRow = document.createElement("tr");
      childRow.classList.add("variant-child", `child-of-${color}`);
      childRow.style.display = "none"; // Hide child rows initially

      childRow.innerHTML = `
        <td class="d-flex gap-3">
          <input class="form-check-input variantProductCheck child-checkbox" type="checkbox">
          <img src="../Images/productImage.png" alt="">
          <div class="variantParentDet">
            <p class="m-0 varParTitle">${combination}</p>
            <p class="m-0 varParDescription">Seller SKU. HIFI M-16</p>
          </div>
        </td>
        <td><span class="varParPrice">RS. 7,000</span></td>
        <td><span class="varParStock">36</span></td>
      `;

      variantTableBody.appendChild(childRow);
    });

    // Sync parent checkbox state with child checkboxes
    const parentCheckbox = parentRow.querySelector(".parent-checkbox");
    parentCheckbox.addEventListener("change", (event) => {
      const childCheckboxes = document.querySelectorAll(`.child-of-${color} .child-checkbox`);
      childCheckboxes.forEach(childCheckbox => {
        childCheckbox.checked = event.target.checked;
      });
    });
  });

  console.log("Variants successfully created.");
  updateTopRowClass(); // Ensure correct row classes are applied if needed
  updateSelectedVariants();
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


function toggleDivsAndTables(checkboxIds, divIds, tableIds) {
  const checkboxes = checkboxIds.map(id => document.getElementById(id));
  const divs = divIds.map(id => document.getElementById(id));
  const tables = tableIds.map(id => document.getElementById(id));

  // Always show 'merchant' on page load
  const merchantCheckbox = document.getElementById('merchant');
  const merchantDiv = document.getElementById('fullByMerchant');
  const merchantTable = document.getElementById('fbmTable');

  merchantCheckbox.checked = true;
  merchantDiv.classList.add('show');
  merchantTable.classList.add('table-visible');

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      // Hide all divs and tables and uncheck all checkboxes except the current one
      checkboxes.forEach((cb, i) => {
        if (i !== index) {
          cb.checked = false;
          divs[i].classList.remove('show');
          tables[i].classList.remove('table-visible');
          tables[i].classList.add('table-hidden');
        }
      });

      // Show or hide the current div and table
      if (checkbox.checked) {
        divs[index].classList.add('show');
        tables[index].classList.add('table-visible');
        tables[index].classList.remove('table-hidden');
      } else {
        divs[index].classList.remove('show');
        tables[index].classList.remove('table-visible');
        tables[index].classList.add('table-hidden');
      }
    });
  });
}

// Initialize the toggle functionality
toggleDivsAndTables(
  ['merchant', 'VB'],
  ['fullByMerchant', 'fullByVB'],
  ['fbmTable', 'fbvTable']
);
