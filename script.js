const loginBtn = document.querySelector(".loginBtn");
// const logInForm = document.getElementsByClassName('logInForm')[0];
//   const signUpFormSection = document.getElementsByClassName('signUpForm')[0];

//   function loginPage(formId) {
//     window.location.href='dashboardLogin.html'
//     if (formId === '1') {
//       logInForm.style.display = 'block';
//       signUpFormSection.style.display = 'none';
//     } else if (formId === '2') {
//       signUpFormSection.style.display = 'block';
//       logInForm.style.display = 'none';
//     }
//   }

  const phoneInput = document.getElementById("phoneNumVerify");
  if (phoneInput) {
    phoneInput.focus(); // Set focus to the phone number input field
  }

  let mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



function loginPage() {
  window.location.href = `dashboardLogin.html`;
}
function signUpPage() {
  window.location.href = `personalInfoSignUp.html`;
  
}
function redirectHomePage() {
  window.location.href = "index.html";
}
function redirectSanatPage() {
  window.location.href = "sanat.html";
}
function redirectTajirPage() {
  window.location.href = "TajirProgram.html";
}

function redirectZinatPage() {
  window.location.href = "zinat.html";
}
function dashboard() {
  window.location.href = "Dashboard/Products/addProduct.html";
}

const otpErrorMsg=document.getElementById('otpErrorMsg');
document.getElementById("verifyBtn").addEventListener("click", function () {
  const personalSignupForm=document.getElementById('personalSignupForm');
  // Check if all OTP inputs are filled
  const personalInfoForm = document.querySelector('.personalInfoForm');
  const varificationForm = document.querySelector('.varificationForm');
  let allFilled = true;

  otpInputs.forEach((input) => {
    if (input.value === '') {
      allFilled = false; // At least one input is empty
    }
  });

  if (allFilled) {
    // All inputs are filled, so submit the form and redirect
    // document.getElementById("myForm").submit();
    // window.location.href = "personalInfoSignUp.html";
personalSignupForm.classList.remove('col-md-8', 'col-xl-6', 'col-xxl-5')
    varificationForm.style.display = 'none';
    personalInfoForm.style.display = 'block';
    circles[0].classList.remove("active"); // Complete the second circle
    circles[0].classList.add("completed");
    circles[1].classList.add("active"); // Complete the second circle

    const progressPercentage = 33.3333; // Progress bar to 66.67%
    progressBar.style.width = `${progressPercentage}%`;
    progressBarInner.style.backgroundColor = "#12B76A"; // Set progress bar color
  } else {
    // If not all inputs are filled, display an error or keep the form on the same page
    otpErrorMsg.innerText='Please fill in all OTP fields before proceeding.'
    otpErrorMsg.style.color='red'
  }
});

document.getElementById('editBtn').addEventListener('click',()=>{
  document.getElementById('signUpForm').style.display='block'
  document.getElementById('varificationForm').style.display='none'
})
// sessionStorage.setItem("targetForm", formId);
  // window.location.href = "dashboardLogin.html";

// persoanl Information sign Up Form Page JS
const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
const progressBarInner = progressBar.querySelector(".inner");
const buttons = document.querySelectorAll("button");

let currentStep = 2;

circles[0].classList.add("active");
// circles[1].classList.add("active");

// const initialProgressPercentage = 33.3333;
const initialProgressPercentage = 0;
progressBar.style.width = `${initialProgressPercentage}%`;
progressBarInner.style.backgroundColor = "#12B76A";

// Check if the Account Approval page is present

const accountApprovalSection = document.querySelector(".accountApprovalPage");

if (accountApprovalSection) {
  const circles = accountApprovalSection.querySelectorAll(".circle"),
    progressBar = accountApprovalSection.querySelector(".indicator"),
    progressBarInner = progressBar.querySelector(".inner"); // Target inner element for color

  // Mark first three circles as completed and remove any active state
  circles.forEach((circle, index) => {
    if (index < 3) {
      circle.classList.add("completed"); // Mark steps 1, 2, 3 as completed
      circle.classList.remove("active"); // Ensure the 'active' class is removed
    } else if (index === 3) {
      circle.classList.add("active"); // Mark step 4 as active
    }
  });

  // Set the progress bar to 99%
  progressBar.style.width = "99%"; // Set progress bar width to 99%
  progressBarInner.style.backgroundColor = "#12B76A"; // Set the color to green
}

// const updateSteps = (e) => {
//   // Update current step based on the button clicked
//   if (e.target.id === "next") {
//     if (currentStep < circles.length) currentStep++; // Move forward
//   } else {
//     if (currentStep > 1) currentStep--; // Move backward
//   }

//   // Loop through circles and set class based on currentStep
//   circles.forEach((circle, index) => {
//     circle.classList.remove("active", "completed"); // Reset classes
//     if (index < currentStep - 1) {
//       circle.classList.add("completed"); // Mark as completed
//     } else if (index === currentStep - 1) {
//       circle.classList.add("active"); // Mark as active
//     }
//   });

//   // Update progress bar width based on the current step
//   const progressPercentage = ((currentStep - 1) / (circles.length - 1)) * 100;
//   progressBar.style.width = `${progressPercentage}%`;
//   progressBarInner.style.backgroundColor = "#12B76A"; // Set progress bar color

//   // Disable buttons at first and last step
//   buttons[0].disabled = currentStep === 1; // Disable "Prev" button
//   buttons[1].disabled = currentStep === circles.length; // Disable "Next" button
// };

// // Event listeners for Next and Prev buttons
// buttons.forEach((button) => {
//   button.addEventListener("click", updateSteps);
// });

// Initialize steps on page load

document.addEventListener("DOMContentLoaded", function () {
  // Initialize intl-tel-input for the first phone input
  const phoneInput = document.querySelector("#personalPhoneNumber");
  const itiPhone = window.intlTelInput(phoneInput, {
    autoPlaceholder: "polite",
    separateDialCode: true,
    initialCountry: "pk",
    onlyCountries: ["pk"], // Only show Pakistan in the dropdown
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
  });

  // Initialize intl-tel-input for the second phone input
  const contactInput = document.querySelector("#contactMobileNumber");
  const itiContact = window.intlTelInput(contactInput, {
    autoPlaceholder: "polite",
    separateDialCode: true,
    initialCountry: "pk",
    onlyCountries: ["pk"], // Only show Pakistan in the dropdown
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
  });

  // Initialize intl-tel-input for the third phone input
  const personContactNumber = document.querySelector("#personContactNumber");
  const itiPersonContact = window.intlTelInput(personContactNumber, {
    autoPlaceholder: "polite",
    separateDialCode: true,
    initialCountry: "pk",
    onlyCountries: ["pk"], // Only show Pakistan in the dropdown
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
  });

  // Add form validation logic for all phone inputs
  const formValidation = FormValidation.formValidation(
    document.getElementById("demoForm"),
    {
      fields: {
        personalPhoneNumber: {
          validators: {
            notEmpty: {
              message: "The phone number is required",
            },
            callback: {
              message: "The phone number is not valid",
              callback: function (value, validator, $field) {
                return itiPhone.isValidNumber();
              },
            },
          },
        },
        contactMobileNumber: {
          validators: {
            notEmpty: {
              message: "The mobile number is required",
            },
            callback: {
              message: "The mobile number is not valid",
              callback: function (value, validator, $field) {
                return itiContact.isValidNumber();
              },
            },
          },
        },
        personContactNumber: {
          validators: {
            notEmpty: {
              message: "The person's contact number is required",
            },
            callback: {
              message: "The person's contact number is not valid",
              callback: function (value, validator, $field) {
                return itiPersonContact.isValidNumber();
              },
            },
          },
        },
      },
      plugins: {
        internationalTelephoneInput: [
          new FormValidation.plugins.InternationalTelephoneInput({
            field: "personalPhoneNumber",
            message: "The phone number is not valid",
            hiddenPhoneInput: "fullPhoneNumber",
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
          }),
          new FormValidation.plugins.InternationalTelephoneInput({
            field: "contactMobileNumber",
            message: "The mobile number is not valid",
            hiddenPhoneInput: "fullContactNumber",
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
          }),
          new FormValidation.plugins.InternationalTelephoneInput({
            field: "personContactNumber",
            message: "The person's contact number is not valid",
            hiddenPhoneInput: "fullPersonContactNumber",
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
          }),
        ],
      },
    }
  );
});
// Function to validate phone numbers
// const validatePhoneNumber = (inputField, errorMessageElement) => {
//   const phoneValue = inputField.value.replace(/-/g, ""); // Remove hyphen for length check
//   if (phoneValue.length !== 10) {
//     errorMessageElement.innerText = "Phone number must be exactly 10 digits.";
//     errorMessageElement.style.color = "red";
//     return false; // Invalid
//   } else {
//     errorMessageElement.innerText = ""; // Clear error message
//     return true; // Valid
//   }
// };

// // Get references to input fields and error message elements
// const phoneInputs = [
//   {
//     input: document.getElementById("personalPhoneNumber"),
//     error: document.getElementById("personalPhoneErrTxt"),
//   },
//   {
//     input: document.getElementById("contactMobileNumber"),
//     error: document.getElementById("contactMobileErrTxt"),
//   },
//   {
//     input: document.getElementById("personContactNumber"),
//     error: document.getElementById("bussNumberErrTxt"),
//   },
// ];

// // Add event listeners for each input field
// phoneInputs.forEach(({ input, error }) => {
//   // Clear error message while typing
//   input.addEventListener("input", () => {
//     error.innerText = ""; // Clear error message
//   });

//   // Validate on blur
//   input.addEventListener("blur", () => validatePhoneNumber(input, error));
// });

const BusinessIndvidualSection = document.querySelectorAll(
  ".BusinessInInfoIndForm .required"
);
const bussindIndAccNxtBtn = document.getElementById("bussindIndAccNxtBtn");

function bussIndividualFields() {
  let allFieldsFilled = true;

  BusinessIndvidualSection.forEach((input) => {
    if (input.type === "file") {
      if (input.files.length === 0) {
        allFieldsFilled = false; // No file selected
      } else {
        const fileType = input.files[0].type.split("/")[0];
        if (fileType !== "image") {
          allFieldsFilled = false; // Invalid file type
          alert("Please upload a valid image file.");
        }
      }
    } else {
      if (input.value.trim() === "") {
        allFieldsFilled = false; // Empty text input
      }
    }
  });

  // Enable button only if all fields are filled and a valid image is selected
  bussindIndAccNxtBtn.disabled = !allFieldsFilled;
}

// Add event listeners to each input field, including file input
BusinessIndvidualSection.forEach((input) => {
  if (input.type === "file") {
    input.addEventListener("change", bussIndividualFields);
  } else {
    input.addEventListener("input", bussIndividualFields);
  }
});
document
  .getElementById("contactMobileNumber")
  .addEventListener("input", function (event) {
    // Remove all non-numeric characters from input
    let input = event.target.value.replace(/\D/g, "");
    let formattedInput = "";

    // Format the input as XXX-XXXXXXX (only one hyphen after the first 3 digits)
    if (input.length > 0) {
      formattedInput += input.substring(0, 3);
    }
    if (input.length > 3) {
      formattedInput += "-" + input.substring(3);
    }

    // Set the formatted value back to the input field
    event.target.value = formattedInput;
  });

bussindIndAccNxtBtn.addEventListener("click", () => {
  let isValid = true;
  const contactEmailAddress = document.getElementById("contactEmailAddress");
  const indEmailErrTxt = document.getElementById("indEmailErrTxt");
  const contactMobileNumber = document.getElementById("contactMobileNumber");
  const indNumberErrTxt = document.getElementById("contactMobileErrTxt");
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?$/; // Modified pattern to allow optional top-level domain

  console.log(contactMobileNumber.value.length);
  // Validate contact mobile number length
  if (contactMobileNumber.value.length !== 11) {
    isValid = false;
    indNumberErrTxt.innerText = "Phone number must be exactly 10 digits.";
    indNumberErrTxt.style.color = "red";
    contactMobileNumber.focus();
    return; // Stop the function if the validation fails
  } else {
    indNumberErrTxt.innerText = ""; // Clear error message if valid
  }

  // Validate email format
  if (!emailPattern.test(contactEmailAddress.value)) {
    isValid = false;
    indEmailErrTxt.innerText = "Please enter a valid email address";
    indEmailErrTxt.style.color = "red";
    contactEmailAddress.focus();
    return; // Stop the function if the validation fails
  } else {
    indEmailErrTxt.innerText = ""; // Clear error message if valid
  }

  // If all validations pass
  if (isValid) {
    indNumberErrTxt.innerText = "";
    indEmailErrTxt.innerText = "";
    document.querySelector(".BusinessInInfoIndForm").style.display = "none"; // Ensure this is the correct selector
    document.querySelector(".BusinessInfoBussAccForm").style.display = "none"; // Ensure this is the correct selector
    document.querySelector(".personalInfoForm").style.display = "none";

    // Show the bank detail section
    document.querySelector(".bankDetail").style.display = "block";
    document
      .querySelector(".personalSignup")
      .scrollIntoView({ behavior: "smooth" });
    console.log("Bank detail link clicked");
  }
});

document
  .querySelector("#indwarehouseAddCheck")
  .addEventListener("change", function () {
    const individualWarehouseAddress = document.querySelector(
      ".indWarehouseAddress"
    );

    // Shop Address fields
    const shopBasedState = document.querySelector(
      ".BusinessInInfoIndForm #shopBasedState"
    );
    const shopCity = document.querySelector(".BusinessInInfoIndForm #shopCity");
    const shopArea = document.querySelector(".BusinessInInfoIndForm #shopArea");
    const shopAddress = document.querySelector(
      ".BusinessInInfoIndForm #shopAddress"
    );
    const shopPostCode = document.querySelector(
      ".BusinessInInfoIndForm #shopPostCode"
    );

    // Warehouse Address fields
    const indWarehouseState = document.querySelector(
      ".indWarehouseAddress #warehouseState"
    );
    const indWarehouseCity = document.querySelector(
      ".indWarehouseAddress #warehouseCity"
    );
    const indWarehouseArea = document.querySelector(
      ".indWarehouseAddress #warehouseArea"
    );
    const indWarehAddress = document.querySelector(
      ".indWarehouseAddress #warehouseAddress"
    );
    const indWarehousePostCode = document.querySelector(
      ".indWarehouseAddress #warehousePostCode"
    );

    if (this.checked) {
      // individualWarehouseAddress.style.display = "none";

      // Copy the values from Shop Address to Warehouse Address
      indWarehouseState.value = shopBasedState.value;
      indWarehouseCity.value = shopCity.value;
      indWarehouseArea.value = shopArea.value;
      indWarehAddress.value = shopAddress.value;
      indWarehousePostCode.value = shopPostCode.value;
      bussIndividualFields();
      indWarehouseState.disabled = true;
      indWarehouseCity.disabled = true;
      indWarehouseArea.disabled = true;
      indWarehAddress.disabled = true;
      indWarehousePostCode.disabled = true;
    } else {
      // individualWarehouseAddress.style.display = "block";

      // Clear the warehouse address fields when unchecked
      indWarehouseState.value = "";
      indWarehouseCity.value = "";
      indWarehouseArea.value = "";
      indWarehAddress.value = "";
      indWarehousePostCode.value = "";
      bussIndividualFields();
      indWarehouseState.disabled = false;
      indWarehouseCity.disabled = false;
      indWarehouseArea.disabled = false;
      indWarehAddress.disabled = false;
      indWarehousePostCode.disabled = false;
    }
  });
// Return Address Check
document
  .querySelector("#indReturnAddCheck")
  .addEventListener("change", function () {
    const individualReturnAddress = document.querySelector(".indReturnAdd");

    // Shop Address fields
    const shopBasedState = document.querySelector(
      ".BusinessInInfoIndForm #shopBasedState"
    );
    const shopCity = document.querySelector(".BusinessInInfoIndForm #shopCity");
    const shopArea = document.querySelector(".BusinessInInfoIndForm #shopArea");
    const shopAddress = document.querySelector(
      ".BusinessInInfoIndForm #shopAddress"
    );
    const shopPostCode = document.querySelector(
      ".BusinessInInfoIndForm #shopPostCode"
    );

    // Return Address fields
    const indReturnState = document.querySelector(".indReturnAdd #returnState");
    const indReturnCity = document.querySelector(".indReturnAdd #returnCity");
    const indReturnArea = document.querySelector(".indReturnAdd #returnArea");
    const indReturnAddress = document.querySelector(
      ".indReturnAdd #returnAddress"
    );
    const indReturnPostCode = document.querySelector(
      ".indReturnAdd #returnPostCode"
    );

    if (this.checked) {
      // Copy the values from Shop Address to Return Address
      indReturnState.value = shopBasedState.value;
      indReturnCity.value = shopCity.value;
      indReturnArea.value = shopArea.value;
      indReturnAddress.value = shopAddress.value;
      indReturnPostCode.value = shopPostCode.value;
      bussIndividualFields();
      indReturnState.disabled = true;
      indReturnCity.disabled = true;
      indReturnArea.disabled = true;
      indReturnAddress.disabled = true;
      indReturnPostCode.disabled = true;
    } else {
      // Clear the return address fields when unchecked
      indReturnState.value = "";
      indReturnCity.value = "";
      indReturnArea.value = "";
      indReturnAddress.value = "";
      indReturnPostCode.value = "";
      bussIndividualFields();
      indReturnState.disabled = false;
      indReturnCity.disabled = false;
      indReturnArea.disabled = false;
      indReturnAddress.disabled = false;
      indReturnPostCode.disabled = false;
    }
  });

const BusinessInfoBussAccSection = document.querySelectorAll(
  ".BusinessInfoBussAccForm .required"
);
const bussAccNxtBtn = document.getElementById("bussAccNxtBtn");

function getPhoto(inputId, messageId) {
  const input = document.getElementById(inputId);
  const file = input.files[0]; // Get the first selected file
  const fileSize = file.size / 1024; // Convert size to KB
  const fileName = file.name;
  const fileType = file.type; // Get the file type
  const messageElement = document.getElementById(messageId);

  // Check for file type and size constraints
  if (
    fileType !== "image/jpeg" &&
    fileType !== "image/png" &&
    fileType !== "image/jpg"
  ) {
    messageElement.innerHTML = `<span style="color: red;">Invalid file type. Please upload a JPEG, PNG, or JPG image.</span>`;
    input.value = ""; // Clear the input
  } else if (fileSize > 500) {
    messageElement.innerHTML = `<span style="color: red;">The selected file is too large. Please upload a file smaller than 500 KB.</span>`;
    input.value = ""; // Clear the input
  } else {
    // Show file name if valid
    messageElement.innerHTML = `Selected: ${fileName}`;
  }
}

// Get file input elements and message elements
const upRegProof = document.getElementById('upRegProof');
const upNtnNum = document.getElementById('upNtnNum');
const upTradDoc = document.getElementById('upTradDoc');

const upRegProofText = document.getElementById('upRegProofText');
const upNtnNumText = document.getElementById('upNtnNumText');
const upTradDocText = document.getElementById('upTradDocText');

// Add event listeners with wrapper functions to pass parameters correctly
upRegProof.addEventListener('change', function() {
  getPhoto('upRegProof', 'upRegProofText');
});
upNtnNum.addEventListener('change', function() {
  getPhoto('upNtnNum', 'upNtnNumText');
});
upTradDoc.addEventListener('change', function() {
  getPhoto('upTradDoc', 'upTradDocText');
});


function bussInfoAccountFields() {
  let allFieldsFilled = true;

  BusinessInfoBussAccSection.forEach((input) => {
    if (input.type === "file") {
      if (input.files.length === 0) {
        allFieldsFilled = false; // No file selected
      } else {
        const file = input.files[0];
        const fileType = file.type.split("/")[1].toLowerCase(); // Get the file extension (e.g., png, jpg, webp)

        // Check if the file type is one of the allowed types
        if (!["png", "jpg", "webp"].includes(fileType)) {
          allFieldsFilled = false; // Invalid file type
          // alert("Please upload a valid image file (PNG, JPG, or WebP).");
        }
      }
    } else {
      if (input.value.trim() === "") {
        allFieldsFilled = false; // Empty text input
      }
    }
  });

  // Enable button only if all fields are filled and a valid image is selected
  bussAccNxtBtn.disabled = !allFieldsFilled;
}

// Add event listeners to each input field, including file input
BusinessInfoBussAccSection.forEach((input) => {
  if (input.type === "file") {
    input.addEventListener("change", bussInfoAccountFields);
  } else {
    input.addEventListener("input", bussInfoAccountFields);
  }
});


function disablePastDates() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("cnicExpiryDate").setAttribute("min", today);
}


document.getElementById("personContactNumber").addEventListener("input", function (event) {
    // Remove all non-numeric characters from input
    let input = event.target.value.replace(/\D/g, "");
    let formattedInput = "";

    // Format the input as XXX-XXXXXXX (only one hyphen after the first 3 digits)
    if (input.length > 0) {
      formattedInput += input.substring(0, 3);
    }
    if (input.length > 3) {
      formattedInput += "-" + input.substring(3);
    }

    // Set the formatted value back to the input field
    event.target.value = formattedInput;
  });

bussAccNxtBtn.addEventListener("click", () => {
  let isValid = true;
  const bussEmailAddress = document.getElementById("personChargeEmail");
  const bussEmailErrTxt = document.getElementById("bussEmailErrTxt");
  const bussMobileNumber = document.getElementById("personContactNumber");
  const bussNumberErrTxt = document.getElementById("bussNumberErrTxt");
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})?$/; // Modified pattern to allow optional top-level domain

  if (bussMobileNumber.value.length !== 11) {
    isValid = false;
    bussNumberErrTxt.innerText = "Phone number must be exactly 10 digits.";
    bussNumberErrTxt.style.color = "red";
    bussMobileNumber.focus();
    return; // Stop the function if the validation fails
  }
  if (!emailPattern.test(bussEmailAddress.value)) {
    isValid = false;
    bussEmailErrTxt.innerText = "Please enter a valid email address";
    bussEmailErrTxt.style.color = "red";
    bussEmailAddress.focus();
    return;
  }

  if (isValid) {
    bussNumberErrTxt.innerText = "";
    bussEmailErrTxt.innerText = "";
    document.querySelector(".BusinessInInfoIndForm").style.display = "none"; // Ensure this is the correct selector
    document.querySelector(".BusinessInfoBussAccForm").style.display = "none"; // Ensure this is the correct selector
    document.querySelector(".personalInfoForm").style.display = "none";

    // Show the bank detail section
    document.querySelector(".bankDetail").style.display = "block";
    document
      .querySelector(".personalSignup")
      .scrollIntoView({ behavior: "smooth" });
    console.log("Bank detail link clicked");
  }
});

document
  .querySelector("#bussinessWarehouseAddress")
  .addEventListener("change", function () {
    const individualWarehouseAddress = document.querySelector(
      ".indWarehouseAddress"
    );

    // Shop Address fields
    const shopBasedState = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessState"
    );
    const shopCity = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessCity"
    );
    const shopArea = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessArea"
    );
    const shopAddress = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessAddress"
    );
    const shopPostCode = document.querySelector(
      ".BusinessInfoBussAccForm #businessPostCode"
    );

    // Warehouse Address fields
    const indWarehouseState = document.querySelector(
      ".bussWarehouseAddress #warehouseState"
    );
    const indWarehouseCity = document.querySelector(
      ".bussWarehouseAddress #warehouseCity"
    );
    const indWarehouseArea = document.querySelector(
      ".bussWarehouseAddress #warehouseArea"
    );
    const indWarehAddress = document.querySelector(
      ".bussWarehouseAddress #warehouseAddress"
    );
    const indWarehousePostCode = document.querySelector(
      ".bussWarehouseAddress #warehousePostCode"
    );

    if (this.checked) {
      // individualWarehouseAddress.style.display = "none";

      // Copy the values from Shop Address to Warehouse Address
      indWarehouseState.value = shopBasedState.value;
      indWarehouseCity.value = shopCity.value;
      indWarehouseArea.value = shopArea.value;
      indWarehAddress.value = shopAddress.value;
      indWarehousePostCode.value = shopPostCode.value;
      bussInfoAccountFields();
      indWarehouseState.disabled = true;
      indWarehouseCity.disabled = true;
      indWarehouseArea.disabled = true;
      indWarehAddress.disabled = true;
      indWarehousePostCode.disabled = true;
    } else {
      // individualWarehouseAddress.style.display = "block";

      // Clear the warehouse address fields when unchecked
      indWarehouseState.value = "";
      indWarehouseCity.value = "";
      indWarehouseArea.value = "";
      indWarehAddress.value = "";
      indWarehousePostCode.value = "";
      bussInfoAccountFields();
      indWarehouseState.disabled = false;
      indWarehouseCity.disabled = false;
      indWarehouseArea.disabled = false;
      indWarehAddress.disabled = false;
      indWarehousePostCode.disabled = false;
    }
  });

document
  .querySelector("#bussReturnAddressCheck")
  .addEventListener("change", function () {
    const individualReturnAddress = document.querySelector(".indReturnAdd");

    // Shop Address fields
    const shopBasedState = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessState"
    );
    const shopCity = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessCity"
    );
    const shopArea = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessArea"
    );
    const shopAddress = document.querySelector(
      ".BusinessInfoBussAccForm #bussinessAddress"
    );
    const shopPostCode = document.querySelector(
      ".BusinessInfoBussAccForm #businessPostCode"
    );

    // Return Address fields
    const indReturnState = document.querySelector(
      ".bussReturnAddress #returnState"
    );
    const indReturnCity = document.querySelector(
      ".bussReturnAddress #returnCity"
    );
    const indReturnArea = document.querySelector(
      ".bussReturnAddress #returnArea"
    );
    const indReturnAddress = document.querySelector(
      ".bussReturnAddress #returnAddress"
    );
    const indReturnPostCode = document.querySelector(
      ".bussReturnAddress #returnPostCode"
    );

    if (this.checked) {
      // Copy the values from Shop Address to Return Address
      indReturnState.value = shopBasedState.value;
      indReturnCity.value = shopCity.value;
      indReturnArea.value = shopArea.value;
      indReturnAddress.value = shopAddress.value;
      indReturnPostCode.value = shopPostCode.value;
      bussInfoAccountFields();
      indReturnState.disabled = true;
      indReturnCity.disabled = true;
      indReturnArea.disabled = true;
      indReturnAddress.disabled = true;
      indReturnPostCode.disabled = true;
    } else {
      // Clear the return address fields when unchecked
      indReturnState.value = "";
      indReturnCity.value = "";
      indReturnArea.value = "";
      indReturnAddress.value = "";
      indReturnPostCode.value = "";
      bussInfoAccountFields();
      indReturnState.disabled = false;
      indReturnCity.disabled = false;
      indReturnArea.disabled = false;
      indReturnAddress.disabled = false;
      indReturnPostCode.disabled = false;
    }
  });
// const shopBasedState=document.querySelector('.BusinessInInfoIndForm #shopBasedState')
// const shopCity=document.querySelector('.BusinessInInfoIndForm #shopCity')
// const shopArea=document.querySelector('.BusinessInInfoIndForm #shopArea')
// const shopAddress=document.querySelector('.BusinessInInfoIndForm #shopAddress')
// const shopPostCode=document.querySelector('.BusinessInInfoIndForm #shopPostCode')

// Warehouse Address Check

// document.getElementById("bussinessWarehouseAddress").addEventListener("change", function () {
//     const bussWarehouseAddress = document.querySelector(
//       ".bussWarehouseAddress"
//     );

//     if (this.checked) {
//       bussWarehouseAddress.style.display = "none"; // Hide the address when checked
//     } else {
//       bussWarehouseAddress.style.display = "block"; // Show the address when unchecked
//     }
//   });
// document.getElementById("bussReturnAddressCheck").addEventListener("change", function () {
//     const bussReturnAddress = document.querySelector(".bussReturnAddress");

//     if (this.checked) {
//       bussReturnAddress.style.display = "none"; // Hide the address when checked
//     } else {
//       bussReturnAddress.style.display = "block"; // Show the address when unchecked
//     }
//   });







// function checkBankFields() {
//   let allFieldsFilled = true;

//   bankDetailSection.forEach((input) => {
//     if (input.type === "file") {
//       if (input.files.length === 0) {
//         allFieldsFilled = false; // No file selected
//       } else {
//         const file = input.files[0];
//         const fileType = file.type.split("/")[0];
//         const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB
        
//         // Check file type and size
//         if (fileType !== "image" || fileSizeInMB > 2) {
//           allFieldsFilled = false; // Invalid file type or size too large
//         }
//       }
//     } else {
//       if (input.value.trim() === "") {
//         allFieldsFilled = false; // Empty text input
//       }
//     }
//   });

//   // Enable button only if all fields are filled, a valid image is selected, and size is under 2 MB
//   submitButton.disabled = !allFieldsFilled;
// }

// bank Check Fields

// bank cheque Photo


const bankDetailSection = document.querySelectorAll(".bankDetail .bankRequired");
const submitButton = document.getElementById("bussAccNxtBtnSubmit");
const errorMsgTag = document.getElementById("bankCheckCopy"); // Error message tag

function checkBankFields() {
  let allFieldsFilled = true;

  // Loop through all inputs in the bankDetailSection
  bankDetailSection.forEach((input) => {
    if (input.type === "file") {
      if (input.files.length === 0) {
        allFieldsFilled = false; // No file selected
      } else {
        const file = input.files[0];
        const fileType = file.type.split("/")[1].toLowerCase(); // Get the file extension (e.g., png, jpg, webp)

        // Check if the file type is one of the allowed types
        if (!["png", "jpg", "webp"].includes(fileType)) {
          allFieldsFilled = false; // Invalid file type
          // alert("Please upload a valid image file (PNG, JPG, or WebP).");
        }
      }
    } else {
      if (input.value.trim() === "") {
        allFieldsFilled = false; // Empty text input
      }
    }
  });

  // Enable/disable the submit button based on allFieldsFilled
  submitButton.disabled = !allFieldsFilled;
}



// Add event listeners to each input field
bankDetailSection.forEach((input) => {
  if (input.type === "file") {
    input.addEventListener("change", checkBankFields);
  } else {
    input.addEventListener("input", checkBankFields);
  }
});

  const chequeCopy = document.getElementById("chequeCopy");
  const bankCheckCopyText = document.getElementById("bankCheckCopy");
  chequeCopy.addEventListener('change', function() {
  getPhoto('chequeCopy', 'bankCheckCopy');
});

// function bankChequePhoto() {
//   const fileInput = document.getElementById("chequeCopy");
//   const bankCheckCopy = document.getElementById("bankCheckCopy");

//   if (fileInput.files.length > 0) {
//     const file = fileInput.files[0];
//     const fileName = file.name;
//     const fileNameWithoutExtension = fileName.split(".")[0];
//     const extension = fileName.split(".").pop().toLowerCase();

//     // If both checks pass, display the file name and extension
//     bankCheckCopy.innerHTML = `File Name: ${fileNameWithoutExtension}, Extension: ${extension}`;
//     bankCheckCopy.style.color='#002882'
//   } else {
//     bankCheckCopy.innerHTML = "No file chosen";
//   }
// }


function clsAlphaNoOnly (e) {  // Accept only alpha numerics, no special characters 
  var regex = new RegExp("^[a-zA-Z0-9]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }

  e.preventDefault();
  return false;
}
// submitButton.addEventListener("click", (event) => {
//   // event.preventDefault();
//   // document.querySelector(".bankDetail").style.display = "none";

//   // const selectedRadio = document.querySelector(
//   //   'input[name="individualForm"]:checked'
//   // );

//   // if (selectedRadio) {
//   //   document.querySelector(".BusinessInInfoIndForm").style.display = "block"; // Show the next section for individual
//   // } else {
//   //   document.querySelector(".BusinessInfoBussAccForm").style.display = "block"; // Show the next section for business
//   // }

// });
function accountApprovalPage(event) {
  event.preventDefault();

  const ibanInput = document.getElementById("bankIBAN").value.trim();
  const ibanErrText = document.getElementsByClassName("ibanText")[0]; // Access the first element

  // Check if IBAN is exactly 24 characters long
  if (ibanInput.length !== 24) {
    ibanErrText.style.color = 'red';
    ibanErrText.innerText = 'IBAN must be exactly 24 characters.';
    document.getElementById("bankIBAN").focus();
    return; // Stop the function to prevent navigation
  } else {
    ibanErrText.innerText = ''; // Clear error if IBAN is valid
  }

  // If IBAN is valid, proceed to the account approval page
  window.location.href = "accountApproval.html";
}


// Get all submit buttons with the class 'nextBtn'

// function getFrontSidePhoto() {
//   const fileInput = document.getElementById("cnicFrontSidePhoto");
//   const frontSidePhoto = document.getElementById("frontSidePhoto");
//   // Get the file name without the extension
//   const fileName = fileInput.files[0]
//     ? fileInput.files[0].name
//     : "No file chosen";
//   const fileNameWithoutExtension = fileInput.files[0]
//     ? fileName.split(".")[0]
//     : "";
//   const extension = fileInput.files[0] ? fileName.split(".")[1] : "";
//   frontSidePhoto.textContent = `File Name: ${fileNameWithoutExtension}, Extension: ${extension}`;
// }

// function getBackSidePhoto() {
//   const fileInput = document.getElementById("cnicFrontBackPhoto");
//   const backSidePhoto = document.getElementById("backSidePhoto");
//   // Get the file name without the extension
//   const fileName = fileInput.files[0]
//     ? fileInput.files[0].name
//     : "No file chosen";
//   const fileNameWithoutExtension = fileInput.files[0]
//     ? fileName.split(".")[0]
//     : "";
//   const extension = fileInput.files[0] ? fileName.split(".")[1] : "";
//   backSidePhoto.textContent = `File Name: ${fileNameWithoutExtension}, Extension: ${extension}`;
// }
const personalNextBtn = document.getElementById("personalNextBtn");
let inputs = document.querySelectorAll(".personalInfoForm .required");

function checkPerInfoFields() {
  let allFieldsFilled = true;

  inputs.forEach((input) => {
    if (input.type === "file") {
      if (input.files.length === 0) {
        allFieldsFilled = false; // No file selected
      } else {
        const fileType = input.files[0].type.split("/")[0];
        if (fileType !== "image") {
          allFieldsFilled = false; // Invalid file type
        }
      }
    } else {
      if (input.value.trim() === "") {
        allFieldsFilled = false; // Empty text input
      }
    }
  });

  // Enable button only if all fields are filled and valid images are selected
  personalNextBtn.disabled = !allFieldsFilled;
}

// Function to handle CNIC front side image upload
function getFrontSidePhoto() {
  const input = document.getElementById("cnicFrontSidePhoto");
  const file = input.files[0]; // Get the first selected file
  const frontSidePhotoMsg = document.getElementById("frontSidePhoto");

  if (file) {
    const fileSize = file.size / 1024; // Convert size to KB
    const fileName = file.name;

    if (fileSize > 500) {
      // Show red alert if size is more than 500 KB
      frontSidePhotoMsg.innerHTML = `<span style="color: red;">The selected file is too large. Please upload a file smaller than 500 KB.</span>`;
      input.value = ""; // Clear the input if file size is too large
    } else {
      // Show the current selected file name
      frontSidePhotoMsg.innerHTML = `Selected: ${fileName}`;
    }
  } else {
    // If no file is selected, show the default message
    frontSidePhotoMsg.innerHTML = "No file selected";
  }
}


// Function to handle CNIC back side image upload
function getBackSidePhoto() {
  const input = document.getElementById("cnicFrontBackPhoto");
  const file = input.files[0]; // Get the first selected file
  const backSidePhotoMsg = document.getElementById("backSidePhoto");

  if (file) {
    const fileSize = file.size / 1024; // Convert size to KB
    const fileName = file.name;

    if (fileSize > 500) {
      // Show red alert if size is more than 500 KB
      backSidePhotoMsg.innerHTML = `<span style="color: red;">The selected file is too large. Please upload a file smaller than 500 KB.</span>`;
      input.value = ""; // Clear the input if file size is too large
    } else {
      // Show file name if valid
      backSidePhotoMsg.innerHTML = `Selected: ${fileName}`;
    }
  } else {
    // If no file is selected, retain the previous file name or show a message
    backSidePhotoMsg.innerHTML = `No file selected`;
  }
}


inputs.forEach((input) => {
  if (input.type === "file") {
    input.addEventListener("change", checkPerInfoFields);
  } else {
    input.addEventListener("input", checkPerInfoFields);
  }
});

document
  .getElementById("personalPhoneNumber")
  .addEventListener("input", function (event) {
    // Remove all non-numeric characters from input
    let input = event.target.value.replace(/\D/g, "");
    let formattedInput = "";

    // Format the input as XXX-XXXXXXX (only one hyphen after the first 3 digits)
    if (input.length > 0) {
      formattedInput += input.substring(0, 3);
    }
    if (input.length > 3) {
      formattedInput += "-" + input.substring(3);
    }

    // Set the formatted value back to the input field
    event.target.value = formattedInput;
  });

document
  .getElementById("cnicNumber")
  .addEventListener("input", function (event) {
    let input = event.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    let formattedInput = "";

    // Format the input as XXXXX-XXXXXXX-X
    if (input.length > 0) {
      formattedInput += input.substring(0, 5); // First 5 characters
    }
    if (input.length > 5) {
      formattedInput += "-" + input.substring(5, 12); // Next 7 characters after first hyphen
    }
    if (input.length > 12) {
      formattedInput += "-" + input.substring(12, 13); // One character after second hyphen
    }

    event.target.value = formattedInput; // Set the formatted value back to the input field
  });

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    let passwordInput = document.getElementById("personalPassword");
    let toggleIcon = this.querySelector("i");

    // Toggle password visibility
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    }
  });
document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    let passworpersonalConfirmPassworddInput = document.getElementById(
      "personalConfirmPassword"
    );
    let toggleIcon = this.querySelector("i");

    // Toggle password visibility
    if (personalConfirmPassword.type === "password") {
      personalConfirmPassword.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    } else {
      personalConfirmPassword.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    }
  });

document.getElementById("personalNextBtn").addEventListener("click", function (event) {
    // Prevent form submission
    event.preventDefault();

    let isValid = true;

    let emailInput = document.getElementById("personalEmail");
    let password = document.getElementById("personalPassword").value;
    const phoneNumberInput = document.getElementById("personalPhoneNumber").value;
    let personalCnicNumber = document.getElementById("cnicNumber").value.trim();
    let confirmPassword = document.getElementById("personalConfirmPassword").value;
    const personalPhoneErrTxt=document.getElementById('personalPhoneErrTxt')
    const personalEmailErrTxt=document.getElementById('personalEmailErrTxt')
    const passwordErrText=document.getElementById('password')
    const confirmPassErrText=document.getElementById('confirmPassword')
    const cnicErrText = document.querySelector('.cnicText'); // Use querySelector to select by class

    // Define the special character pattern
    let specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    let uppercasePattern = /[A-Z]/; // At least one uppercase letter
let lowercasePattern = /[a-z]/; // At least one lowercase letter
let numberPattern = /[0-9]/;
    // Close any previous alerts
    Swal.close();

    // Check if all required fields are filled
    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        isValid = false;
        Swal.fire({
          title: "Enter all credentials",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          timer: 5000,
          customClass: {
            popup: "white-alert", // Custom class for the popup
          },
        });
        return; // Exit the loop early
      }
    });

    // Check for valid email format
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})?$/; // Modified pattern to allow optional top-level domain

    if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      personalEmailErrTxt.style.color='red'
      personalEmailErrTxt.innerText='Invalid Email Format'
      emailInput.focus();
      return;
    }else {
      isValid = true;
      personalEmailErrTxt.innerText = ''; // Clear the error message if valid
    }

    // Check if the phone number has exactly 11 digits
if (phoneNumberInput.length !== 11) {
      isValid = false;
      personalPhoneErrTxt.style.color = 'red';
      personalPhoneErrTxt.innerText = 'Phone number must be exactly 11 digits.'; // Ensure the message is correct
      document.getElementById("personalPhoneNumber").focus(); // Focus on the input element
      return; 
    } else {
      isValid = true;
      personalPhoneErrTxt.innerText = ''; // Clear the error message if valid
    }

    if (personalCnicNumber.length !== 15 ) {
      isValid = false;
      cnicErrText.style.color = 'red';
      cnicErrText.innerText = 'CNIC number must contain exactly 13 digits.';
      document.getElementById("cnicNumber").focus(); // Set focus to the input
      return;
    } else {
      cnicErrText.innerText = ''; // Clear error message
    }

    let missingRequirements = [];

    // Password mismatch check
    if (password !== confirmPassword) {
      isValid = false;
      confirmPassErrText.style.color = 'red';
      confirmPassErrText.innerText = 'Password Mismatch';
      document.getElementById('personalConfirmPassword').focus();
      return;
    } else {
      confirmPassErrText.innerText = '';
    }
    
    // Minimum length check
    if (password.length < 8) {
      missingRequirements.push('at least 8 characters long');
    }
    
    // Uppercase letter check
    if (!uppercasePattern.test(password)) {
      missingRequirements.push('an uppercase letter');
    }
    
    // Lowercase letter check
    if (!lowercasePattern.test(password)) {
      missingRequirements.push('a lowercase letter');
    }
    
    // Number check
    if (!numberPattern.test(password)) {
      missingRequirements.push('a number');
    }
    
    // Special character check
    if (!specialCharPattern.test(password)) {
      missingRequirements.push('a special character');
    }
    
    // Display all missing requirements in a single error message
    if (missingRequirements.length > 0) {
      isValid = false;
      passwordErrText.style.color = 'red';
      passwordErrText.innerText = `Password must contain: ${missingRequirements.join(', ')}.`;
      document.getElementById('personalPassword').focus();
    } else {
      // Clear error if all conditions are met
      passwordErrText.innerText = '';
      isValid = true;
    }

    // If all fields are valid, proceed
    if (isValid) {
      personalNextBtn.disabled = false;
      circles[0].classList.add("completed");
      circles[1].classList.remove("active"); // Complete the second circle
      circles[1].classList.add("completed"); // Complete the second circle
      circles[2].classList.add("active"); // Set third circle as active

      const progressPercentage = 66.6667; // Progress bar to 66.67%
      progressBar.style.width = `${progressPercentage}%`;
      progressBarInner.style.backgroundColor = "#12B76A"; // Set progress bar color

      console.log("All fields are valid. Proceeding...");

      // Hide the current section
      document.querySelector(".personalInfoForm").style.display = "none";
      const selectedRadio = document.querySelector(
        'input[name="accountType"]:checked'
      );

      if (selectedRadio && selectedRadio.id === "individualForm") {
        document.querySelector(".BusinessInInfoIndForm").style.display =
          "block"; // Show the next section for individual
        document.querySelector(".BusinessInfoBussAccForm").style.display =
          "none"; // Hide business section
        document
          .querySelector(".personalSignup")
          .scrollIntoView({ behavior: "smooth" });
      } else {
        document.querySelector(".BusinessInfoBussAccForm").style.display =
          "block"; // Show the next section for business
        document.querySelector(".BusinessInInfoIndForm").style.display = "none"; // Hide individual section
        document
          .querySelector(".personalSignup")
          .scrollIntoView({ behavior: "smooth" });
      }
    }
  });

const backBtns = document.querySelectorAll(".backBtn");
const bankDetailLinks = document.querySelectorAll(".bankDetailLink");
const bankDetBackBtn = document.querySelectorAll(".bankDetBackBtn");
const bankAccBackBtn = document.getElementById("bankAccBackBtn");

backBtns.forEach(function (backBtn) {
  backBtn.addEventListener("click", function () {
    // Hide the business info forms
    document.querySelector(".BusinessInInfoIndForm").style.display = "none";
    document.querySelector(".BusinessInfoBussAccForm").style.display = "none";

    // Show the personal info form
    const personalInfoForm = document.querySelector(".personalInfoForm");
    personalInfoForm.style.display = "block";

    // Ensure the personal info form is displayed before scrolling
    if (personalInfoForm) {
      console.log("Scrolling to personal info form...");
      document
        .querySelector(".personalSignup")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Personal info form not found!");
    }
  });
});

// bankDetailLinks.forEach((link) => {
//   link.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent default link behavior

//     // Hide all forms
//     document.querySelector(".BusinessInInfoIndForm").style.display = "none"; // Ensure this is the correct selector
//     document.querySelector(".BusinessInfoBussAccForm").style.display = "none"; // Ensure this is the correct selector
//     document.querySelector(".personalInfoForm").style.display = "none";

//     // Show the bank detail section
//     document.querySelector(".bankDetail").style.display = "block";
//     document.querySelector(".personalSignup").scrollIntoView({ behavior: 'smooth' });
//     console.log("Bank detail link clicked");
//   });
// });

bankDetBackBtn.forEach(function (backBtn) {
  backBtn.addEventListener("click", function () {
    const selectedRadio = document.querySelector(
      'input[name="accountType"]:checked'
    );

    if (selectedRadio && selectedRadio.id === "individualForm") {
      document.querySelector(".BusinessInInfoIndForm").style.display = "block"; // Show the next section for individual
      document.querySelector(".bankDetail").style.display = "none";
      document.querySelector(".personalInfoForm").style.display = "none";
    } else {
      document.querySelector(".BusinessInfoBussAccForm").style.display =
        "block"; // Show the next section for business
      document.querySelector(".bankDetail").style.display = "none";
      document.querySelector(".personalInfoForm").style.display = "none";
    }
  });
});

bankAccBackBtn.addEventListener("click", () => {
  const selectedRadio = document.querySelector(
    'input[name="accountType"]:checked'
  );

  if (selectedRadio && selectedRadio.id === "individualForm") {
    document.querySelector(".BusinessInInfoIndForm").style.display = "block"; // Show the next section for individual
    document.querySelector(".bankDetail").style.display = "none";
    document.querySelector(".personalInfoForm").style.display = "none";
    document
      .querySelector(".personalSignup")
      .scrollIntoView({ behavior: "smooth" });
  } else {
    document.querySelector(".BusinessInfoBussAccForm").style.display = "block"; // Show the next section for business
    document.querySelector(".bankDetail").style.display = "none";
    document.querySelector(".personalInfoForm").style.display = "none";
    document
      .querySelector(".personalSignup")
      .scrollIntoView({ behavior: "smooth" });
  }
});

//   document.getElementById("verifyBtn").addEventListener("click", function () {
//     document.getElementById("myForm").submit();
// });

