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
document.getElementById("addProNextBtn").addEventListener("click", function () {

    // If valid, you can proceed further
   
      document.querySelector("#basicInformationForm").style.display = "none";
      document.querySelector("#addProductSection").style.display = "block";
    
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
    // updateSelectedVariants(); // Update after removing a tag (this function is not defined here)
  };

  // Insert the new tag element before the input field
  wrapper.insertBefore(tag, wrapper.querySelector('input'));
  
  // Update the hidden input field with the current tags array
  inputElem.value = tagsArray.join(',');
  // console.log("Updated hidden input value (after add):", inputElem.value);
  // updateSelectedVariants();
}

  


$(document).ready(function () {
  // Initial setup: show FBM table and section, hide FBV table
  $('#merchant').prop('checked', true);
  $('#fullByMerchant').slideDown(0); // Show instantly on page load
  $('#fbmTable').slideDown(0); // Show instantly on page load
  $('#fbvTable').slideUp(0); // Hide instantly on page load

  // Animation speed (in milliseconds)
  const animationSpeed = 200;

  // Handle FBM checkbox click
  $('#merchant').change(function () {
    if ($(this).is(':checked')) {
      // Ensure FBV is unchecked
      $('#VB').prop('checked', false);
      $('#location_fieldset').css('display', 'flex'); // Set display to flex

      // Animate FBM table and section
      $('#fullByMerchant').slideDown(animationSpeed);
      $('#fbmTable').slideDown(animationSpeed);

      // Hide FBV table
      $('#fbvTable').slideUp(animationSpeed);
    } else {
      // Ensure at least one checkbox remains checked
      $(this).prop('checked', true);
    }
  });

  // Handle FBV checkbox click
  $('#VB').change(function () {
    if ($(this).is(':checked')) {
      // Ensure FBM is unchecked
      $('#merchant').prop('checked', false);
      $('#location_fieldset').hide();
      // Animate FBV table
      $('#fbvTable').slideDown(animationSpeed);

      // Hide FBM table and section
      $('#fullByMerchant').slideUp(animationSpeed);
      $('#fbmTable').slideUp(animationSpeed);
    } else {
      // Ensure at least one checkbox remains checked
      $(this).prop('checked', true);
      $('#location_fieldset').show();
    }
  });
});


