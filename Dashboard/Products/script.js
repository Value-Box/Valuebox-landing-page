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