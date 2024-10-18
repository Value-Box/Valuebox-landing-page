const loginBtn = document.querySelector(".loginBtn");

function loginPage() {
  window.location.href = "dashboardLogin.html";
}

// persoanl Information sign Up Form Page JS
const circles = document.querySelectorAll(".circle"),
  progressBar = document.querySelector(".indicator"),
  progressBarInner = progressBar.querySelector(".inner"), // Target inner element for color
  buttons = document.querySelectorAll("button");

let currentStep = 2; // Start from step 2 since step 1 is already completed

// Initialize first circle as completed and second circle as active
circles[0].classList.add("completed"); // First step completed
circles[1].classList.add("active"); // Second step active

// Set the initial progress bar width for step 2 (since step 1 is completed)
const initialProgressPercentage = 33.3333; // Set progress for the first step
progressBar.style.width = `${initialProgressPercentage}%`;
progressBarInner.style.backgroundColor = "#12B76A"; // Set progress bar color to green

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
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
  });

  // Initialize intl-tel-input for the second phone input
  const contactInput = document.querySelector("#contactMobile");
  const itiContact = window.intlTelInput(contactInput, {
    autoPlaceholder: "polite",
    separateDialCode: true,
    initialCountry: "pk",
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
  });

  // Add form validation logic for both phone inputs
  const formValidation = FormValidation.formValidation(
    document.getElementById("demoForm"),
    {
      fields: {
        phone: {
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
        contactMobile: {
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
      },
      plugins: {
        internationalTelephoneInput:
          new FormValidation.plugins.InternationalTelephoneInput({
            field: "phone",
            message: "The phone number is not valid",
            hiddenPhoneInput: "fullPhoneNumber",
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
          }),
        internationalTelephoneInput:
          new FormValidation.plugins.InternationalTelephoneInput({
            field: "contactMobile",
            message: "The mobile number is not valid",
            hiddenPhoneInput: "fullContactNumber",
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
          }),
      },
    }
  );
});

document
  .getElementById("warehouseAddressCheck")
  .addEventListener("change", function () {
    const warehouseAddress = document.querySelector(".warehouseAddress");

    if (this.checked) {
      warehouseAddress.style.display = "none"; // Hide the address when checked
    } else {
      warehouseAddress.style.display = "block"; // Show the address when unchecked
    }
  });
document
  .getElementById("returnAddressCheck")
  .addEventListener("change", function () {
    const returnAddress = document.querySelector(".returnAddress");

    if (this.checked) {
      returnAddress.style.display = "none"; // Hide the address when checked
    } else {
      returnAddress.style.display = "block"; // Show the address when unchecked
    }
  });

document
  .getElementById("bussinessWarehouseAddress")
  .addEventListener("change", function () {
    const bussWarehouseAddress = document.querySelector(
      ".bussWarehouseAddress"
    );

    if (this.checked) {
      bussWarehouseAddress.style.display = "none"; // Hide the address when checked
    } else {
      bussWarehouseAddress.style.display = "block"; // Show the address when unchecked
    }
  });
document
  .getElementById("bussReturnAddressCheck")
  .addEventListener("change", function () {
    const bussReturnAddress = document.querySelector(".bussReturnAddress");

    if (this.checked) {
      bussReturnAddress.style.display = "none"; // Hide the address when checked
    } else {
      bussReturnAddress.style.display = "block"; // Show the address when unchecked
    }
  });

function getFrontSidePhoto() {
  const fileInput = document.getElementById("cnicFrontSidePhoto");
  const frontSidePhoto = document.getElementById("frontSidePhoto");
  // Get the file name without the extension
  const fileName = fileInput.files[0]
    ? fileInput.files[0].name
    : "No file chosen";
  const fileNameWithoutExtension = fileInput.files[0]
    ? fileName.split(".")[0]
    : "";
  const extension = fileInput.files[0] ? fileName.split(".")[1] : "";
  frontSidePhoto.textContent = `File Name: ${fileNameWithoutExtension}, Extension: ${extension}`;
}

function getBackSidePhoto() {
  const fileInput = document.getElementById("cnicFrontBackPhoto");
  const backSidePhoto = document.getElementById("backSidePhoto");
  // Get the file name without the extension
  const fileName = fileInput.files[0]
    ? fileInput.files[0].name
    : "No file chosen";
  const fileNameWithoutExtension = fileInput.files[0]
    ? fileName.split(".")[0]
    : "";
  const extension = fileInput.files[0] ? fileName.split(".")[1] : "";
  backSidePhoto.textContent = `File Name: ${fileNameWithoutExtension}, Extension: ${extension}`;
}

// bank cheque Photo
function bankChequePhoto() {
  const fileInput = document.getElementById("chequeCopy");
  const bankCheckCopy = document.getElementById("bankCheckCopy");

  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    const fileNameWithoutExtension = fileName.split(".")[0];
    const extension = fileName.split(".").pop();
    bankCheckCopy.textContent = `File Name: ${fileNameWithoutExtension}, Extension: ${extension}`;
  } else {
    bankCheckCopy.textContent = "No file chosen";
  }
}

// bank Check Fields
const bankDetailSection = document.querySelectorAll(".bankDetail .bankRequired");
const submitButton = document.getElementById("bussAccNxtBtnSubmit");

function checkBankFields() {
  let allFieldsFilled = true;

  bankDetailSection.forEach((input) => {
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
  submitButton.disabled = !allFieldsFilled;
}

// Add event listeners to each input field, including file input
bankDetailSection.forEach((input) => {
  if (input.type === "file") {
    input.addEventListener("change", checkBankFields);
  } else {
    input.addEventListener("input", checkBankFields);
  }
});

submitButton.addEventListener('click',(event)=>{
    event.preventDefault();
    document.querySelector(".bankDetail").style.display = "none";

    const selectedRadio = document.querySelector('input[name="individualForm"]:checked');

    if (selectedRadio) {
      document.querySelector(".BusinessInInfoIndForm").style.display = "block"; // Show the next section for individual
    } else {
      document.querySelector(".BusinessInfoBussAccForm").style.display = "block"; // Show the next section for business
    }
})

// Get all submit buttons with the class 'nextBtn'
const personalNextBtn=document.getElementById('personalNextBtn');
let inputs = document.querySelectorAll(".required");

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
    personalNextBtn.disabled = !allFieldsFilled;
  }

  inputs.forEach((input) => {
    if (input.type === "file") {
      input.addEventListener("change", checkPerInfoFields);
    } else {
      input.addEventListener("input", checkPerInfoFields);
    }
  });


document.getElementById("personalNextBtn").addEventListener("click", function (event) {
    // Prevent form submission
    event.preventDefault();

    let isValid = true;

    let emailInput = document.getElementById("personalEmail");
    let password = document.getElementById("personalPassword").value;
    let confirmPassword = document.getElementById("personalConfirmPassword").value;

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
          timer: 5000, // Optional: Automatically close after 5 seconds
        });
        return; // Exit the loop early
      }
    });
    

    // Check for valid email format
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      Swal.fire({
        title: "Invalid Email Format",
        text: "Please enter a valid email address",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        timer: 5000,
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      isValid = false;
      Swal.fire({
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        timer: 5000, // Optional: Automatically close after 5 seconds
      });
      return;
    }

    // If all fields are valid, proceed
    if (isValid) {
        personalNextBtn.disabled=false;
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
      const selectedRadio = document.querySelector('input[name="accountType"]:checked');

      if (selectedRadio && selectedRadio.id === "individualForm") {
        document.querySelector(".BusinessInInfoIndForm").style.display = "block"; // Show the next section for individual
        document.querySelector(".BusinessInfoBussAccForm").style.display = "none"; // Hide business section
      } else {
        document.querySelector(".BusinessInfoBussAccForm").style.display = "block"; // Show the next section for business
        document.querySelector(".BusinessInInfoIndForm").style.display = "none"; // Hide individual section
      }
      
    }
  });

const backBtns = document.querySelectorAll(".backBtn");
const bankDetailLinks = document.querySelectorAll(".bankDetailLink");
const bankDetBackBtn = document.querySelectorAll(".bankDetBackBtn");
const bankAccBackBtn = document.getElementById("bankAccBackBtn");

backBtns.forEach(function (backBtn) {
  backBtn.addEventListener("click", function () {
    document.querySelector(".BusinessInInfoIndForm").style.display = "none"; // Ensure this is the correct selector
    document.querySelector(".BusinessInfoBussAccForm").style.display = "none"; // Ensure this is the correct selector
    document.querySelector(".personalInfoForm").style.display = "block";
  });
});

bankDetailLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
  
      // Hide all forms
      document.querySelector(".BusinessInInfoIndForm").style.display = "none"; // Ensure this is the correct selector
      document.querySelector(".BusinessInfoBussAccForm").style.display = "none"; // Ensure this is the correct selector
      document.querySelector(".personalInfoForm").style.display = "none";
      
      // Show the bank detail section
      document.querySelector(".bankDetail").style.display = "block";
      
      console.log("Bank detail link clicked");
    });
  });

bankDetBackBtn.forEach(function (backBtn) {
    backBtn.addEventListener("click", function () {
        const selectedRadio = document.querySelector('input[name="accountType"]:checked');

        if (selectedRadio && selectedRadio.id === "individualForm") {
          document.querySelector(".BusinessInInfoIndForm").style.display = "block"; // Show the next section for individual
          document.querySelector(".bankDetail").style.display = "none";
          document.querySelector(".personalInfoForm").style.display = "none";
        } else {
          document.querySelector(".BusinessInfoBussAccForm").style.display = "block"; // Show the next section for business
          document.querySelector(".bankDetail").style.display = "none";
          document.querySelector(".personalInfoForm").style.display = "none";
        }
    });
  });
  
bankAccBackBtn.addEventListener("click", () => {
    const selectedRadio = document.querySelector('input[name="accountType"]:checked');

    if (selectedRadio && selectedRadio.id === "individualForm") {
      document.querySelector(".BusinessInInfoIndForm").style.display = "block"; // Show the next section for individual
      document.querySelector(".bankDetail").style.display = "none";
      document.querySelector(".personalInfoForm").style.display = "none";
    } else {
      document.querySelector(".BusinessInfoBussAccForm").style.display = "block"; // Show the next section for business
      document.querySelector(".bankDetail").style.display = "none";
      document.querySelector(".personalInfoForm").style.display = "none";
    }
});