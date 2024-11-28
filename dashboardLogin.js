const loginInputEmail = document.getElementById("loginInputEmail");
if (loginInputEmail) {
  loginInputEmail.focus(); // Set focus to the phone number input field
}

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
    otpInputs[0].focus();
  
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


  