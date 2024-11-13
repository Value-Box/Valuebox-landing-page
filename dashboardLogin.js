// const verifyBtn=document.getElementById('verifyBtn')
// verifyBtn.addEventListener('click',signUpPage)
// function signUpPage() {
//   window.location.href = "personalInfoSignUp.html";
// }


function passwordShower() {
  var loginPassword = document.getElementById("loginPassword");
  var toggleIcon = document.getElementById("toggleIcon");
  
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    loginPassword.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}
  function toggleSignUpForm() {
    const loginForm = document.querySelector(".logInForm");
    const signUpForm = document.querySelector(".signUpForm");
    loginForm.style.display =
      loginForm.style.display === "none" ? "block" : "none";
    signUpForm.style.display =
      signUpForm.style.display === "none" ? "block" : "none";
  }


  const otpInputs = document.querySelectorAll('.otpNum');

  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      // Ensure only one digit is entered
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);

      // Move to the next input if one digit is entered
      if (input.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    // Optional: Move to the previous input on Backspace if the current input is empty
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  
  const getOTP = document.getElementById('getOTP');
  const signUpForm = document.querySelector(".signUpForm");
  const varificationForm = document.querySelector(".varificationForm");
  const phoneNumInput = document.getElementById('phoneNumVerify');
  function validatePhoneNumber(input) {
    // Allow only numbers (remove any non-numeric characters)
    input.value = input.value.replace(/\D/g, "");

    // Display error message if not 11 digits
    if (input.value.length === 11) {
      phoneNumError.textContent = "";
    } else {
      phoneNumError.textContent = "Phone number must be exactly 11 digits.";
    }
  }
  // Timer and Resend OTP
  const otpButton = document.getElementById('resendOTP');
  const otpTimer = document.getElementsByClassName('timer')[0]; 
  let sec = 180; // 3 minutes in seconds
  let countdown = null;
  
  // Update the timer display
  const updateTimerDisplay = () => {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds; // Add leading zero
    otpTimer.textContent = `${minutes}:${seconds}`;
  };
  
  // Start the countdown
  const startCountdown = () => {
    countdown = setInterval(() => {
      if (sec > 0) {
        sec--;
        updateTimerDisplay();
      } else {
        clearInterval(countdown);
        otpButton.disabled = false; // Enable "Resend OTP" button
      }
    }, 1000);
  };
  
  // Event listener for Get OTP button
  getOTP.addEventListener('click', () => {
    // Check if the phone number has exactly 11 digits before proceeding
    if (phoneNumInput.value.length !== 11) {
      phoneNumError.textContent = "Phone number must be exactly 11 digits.";
      return; // Stop further execution
    }else{
      phoneNumError.textContent = "";
    }

    // Hide the sign-up form and show the verification form
    signUpForm.style.display = 'none';
    varificationForm.style.display = 'block';
  
    // Reset the timer and start the countdown
    sec = 180; // Reset to 3 minutes
    otpButton.disabled = true; // Disable "Resend OTP" button
    updateTimerDisplay(); // Update the initial timer display
    startCountdown(); // Start the countdown
  });
  
  // Event listener for Resend OTP button
  otpButton.addEventListener('click', () => {
    // Reset the timer and start the countdown again
    sec = 180; // Reset to 3 minutes
    otpButton.disabled = true; // Disable "Resend OTP" button
    updateTimerDisplay(); // Update the timer display
    startCountdown(); // Start the countdown again
  });
  
  console.log('hello')


  // function signUpPage(event) {
  //   // Prevent the default form submission
  //   event.preventDefault();
  //   console.log('clicked');
  //   window.location.href = "personalInfoSignUp.html";
  // }
  
//   const circles = document.querySelectorAll(".circle");
//   const progressBar = document.querySelector(".indicator");
//   const progressBarInner = progressBar.querySelector(".inner");

//   const otpErrorMsg=document.getElementById('otpErrorMsg');
// document.getElementById("verifyBtn").addEventListener("click", function () {
//   // Check if all OTP inputs are filled
//   const personalInfoForm = document.querySelector('.personalInfoForm');
//   const varificationForm = document.querySelector('.varificationForm');
//   let allFilled = true;
//   otpInputs.forEach((input) => {
//     if (input.value === '') {
//       allFilled = false; // At least one input is empty
//     }
//   });

//   if (allFilled) {
//     varificationForm.style.display = 'none';
//     personalInfoForm.style.display = 'block';
//     circles[0].classList.remove("active"); // Complete the second circle
//     circles[0].classList.add("completed");
//     circles[1].classList.add("active"); // Complete the second circle

//     const progressPercentage = 33.3333; // Progress bar to 66.67%
//     progressBar.style.width = `${progressPercentage}%`;
//     progressBarInner.style.backgroundColor = "#12B76A"; // Set progress bar color
//   } else {
//     // If not all inputs are filled, display an error or keep the form on the same page
//     otpErrorMsg.innerText='Please fill in all OTP fields before proceeding.'
//     otpErrorMsg.style.color='red'
//   }
// });