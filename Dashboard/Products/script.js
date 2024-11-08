document.querySelectorAll('.required').forEach(function(input) {
    // On focus, remove the red border
    input.addEventListener('focus', function() {
        input.classList.remove('is-invalid'); // Remove red border on focus
    });

    // On blur, check if input is empty and add the red border if it's empty
    input.addEventListener('blur', function() {
        // For select elements, check if the value is empty
        if (input.tagName === 'SELECT' && input.value === '') {
            input.classList.add('is-invalid'); // Add red border if select is empty
        } else if (input.value.trim() === '') {
            input.classList.add('is-invalid'); // Add red border if input is empty
        }
        let choices=document.querySelector('choices__inner')
        if(choices.value==''){
            choices.classList.add('is-invalid');
        } else if (input.value.trim() === '') {
            choices.classList.add('is-invalid'); // Add red border if input is empty
        }
    });

    // On input (as the user types), remove the red border
    input.addEventListener('input', function() {
        if (input.value.trim() !== '') {
            input.classList.remove('is-invalid'); // Remove red border as soon as user types
        }
    });
});

// Validate on form submission or button click
document.getElementById("addProNextBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;
    
    // Get all required fields (both input and select with the 'required' class)
    const inputs = document.querySelectorAll('.required');

    // Check if any required input is empty
    inputs.forEach(function (input) {
        // For select elements, check if the value is empty
        if (input.tagName === 'SELECT' && input.value === "") {
            input.classList.add('is-invalid'); // Add red border for empty select
            isValid = false;
        } else if (input.value.trim() === "") {
            input.classList.add('is-invalid'); // Add red border for empty input field
            isValid = false;
        }
    });

    // If valid, you can proceed further
    if (isValid) {
        document.querySelector("#basicInformationForm").style.display = "none";
    }
});


// Initialize Choices.js
const dropdownElement = document.getElementById('categoryDropDown');
const choicesInstance = new Choices(dropdownElement);

// Add event listener for radio buttons
document.querySelectorAll('input[name="flexRadioDefault"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const selectedValue = this.value;  // Get the value of the selected radio button

        // Set the dropdown value using Choices.js API
        choicesInstance.setChoiceByValue(selectedValue);
    });
});

document.getElementById("utubeUrl").addEventListener("input", function() {
    const youtubeUrl = document.getElementById("utubeUrl").value;
    const errorMessage = document.getElementById("errorMessage");
  
    // YouTube URL regular expression pattern
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)([a-zA-Z0-9_-]{11})$/;
  
    // Test the URL with the regex
    if (!youtubePattern.test(youtubeUrl)) {
      errorMessage.style.display = "block"; // Show error message
    } else {
      errorMessage.style.display = "none"; // Hide error message
    }
  });


  function calculatPricing() {
    // Cost, Selling aur Special Prices ko parse karna
    let costPrice = parseInt(document.getElementById('costPrice').value) || 0;
    let sellingPrice = parseInt(document.getElementById('sellingPrice').value) || 0;
    let specialPrice = parseInt(document.getElementById('specialPrice').value) || 0;
    let profitElement = document.getElementById('Profit');

    let profit = sellingPrice - costPrice;
    let finalProfit = specialPrice - costPrice;
    console.log('Special Price:', specialPrice);  

    

    

    if(specialPrice>0){
        if (finalProfit > 0) {
            profitElement.textContent = finalProfit;
        } else {
            profitElement.textContent = "0.00"; 
        } 
    }else{
        if (profit > 0) {
            profitElement.textContent = profit;
        } else {
            profitElement.textContent = "0.00"; 
        } 
    }
}



function selectedOptionDropdown() {
    let selOptType = document.getElementById('selOptType').value;
    let colorDropDown = document.getElementById('colorDropDown');
    let sizeDropDown = document.getElementById('sizeDropDown');
    let customInput1 = document.getElementById('customInput1');
    let customInput2 = document.getElementById('customInput2');

    // Hide color and size dropdowns and inputs by default
    colorDropDown.style.display = 'none';
    sizeDropDown.style.display = 'none';
    customInput1.style.display = 'none';
    customInput2.style.display = 'none';

    // Show the corresponding dropdown or inputs based on the selection
    if (selOptType === 'color') {
        colorDropDown.style.display = 'block';
    } else if (selOptType === 'size') {
        sizeDropDown.style.display = 'block';
    } else if (selOptType === 'custom') {
        customInput1.style.display = 'block';  // Show first custom input
        customInput2.style.display = 'block';  // Show second custom input
    }
}

function addVariant() {
    let colorSelect = document.getElementsByClassName('colorDropDown');
    let selectedColor = colorSelect.value; // Get selected color value
    let variantList = document.getElementById('variantList');

    if (selectedColor) {
      // Create a new row with the selected color
      let newRow = document.createElement('div');
      newRow.classList.add('variantRow', 'd-flex', 'gap-3', 'mt-2');
      newRow.innerHTML = `
        <span class="variantLabel">Color: </span>
        <span class="variantValue">${selectedColor}</span>
        <button class="removeVariantBtn" onclick="removeVariant(this)">Remove</button>
      `;

      // Append the new row to the list
      variantList.appendChild(newRow);
    } else {
      alert("Please select a color first.");
    }
  }

  // Function to remove a variant
  function removeVariant(button) {
    let row = button.parentNode;
    row.remove(); // Remove the row
  }
  function selectedColor() {
    // Access the Choices.js instance for the color dropdown
    let colorDropDown = document.getElementsByClassName('colorDropDown')[0]; // Grab the first matching element
    let colorChoices = colorDropDown.choices; // Access the Choices.js instance

    // Get the selected values (this will return an array of selected options)
    let selectedValues = colorChoices.getValue(true); // `true` will return the selected values as an array

    // Log the selected values to the console
    console.log(selectedValues);
}
