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
  
  const getOTP = document.getElementById('getOTP');
  const signUpForm = document.querySelector(".signUpForm");
  const varificationForm = document.querySelector(".varificationForm");
  
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


  function signUpPage(event) {
    // Prevent the default form submission
    event.preventDefault();
    console.log('clicked');
    window.location.href = "personalInfoSignUp.html";
  }
  