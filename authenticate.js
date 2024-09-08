function toggleForm(formType) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (formType === "login") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else if (formType === "signup") {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}

document
  .getElementById("signup-link")
  .addEventListener("click", () => toggleForm("signup"));
document
  .getElementById("login-link")
  .addEventListener("click", () => toggleForm("login"));

document.addEventListener("DOMContentLoaded", function () {
  // Form elements for login
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const errorMessage = document.getElementById("error-message");

  // Form elements for sign-up
  const signupForm = document.getElementById("signup-form");
  const signupUsernameInput = document.getElementById("signup-username");
  const signupEmailInput = document.getElementById("signup-email");
  const signupPasswordInput = document.getElementById("signup-password");
  const signupPasswordConfirmInput =
    document.getElementById("signup-password-1");

  // existing credentials
  let storedCredentials = [
    { username: "x", password: "123" },
    { username: "y", password: "456" },
    { username: "z", password: "789" },
  ];

  // Merge with credentials from local storage if they exist
  const localStoredCredentials =
    JSON.parse(localStorage.getItem("storedCredentials")) || [];
  storedCredentials = storedCredentials.concat(localStoredCredentials);

  // Sign-up form submission event
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = signupUsernameInput.value.trim();
    const email = signupEmailInput.value.trim();
    const password = signupPasswordInput.value.trim();
    const confirmPassword = signupPasswordConfirmInput.value.trim();

    // Validate that passwords match
    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match. Please try again.";
      errorMessage.style.display = "block";
      return;
    }

    // Check if the username already exists
    const existingUser = storedCredentials.find(
      (cred) => cred.username === username
    );
    if (existingUser) {
      errorMessage.textContent =
        "Username already exists. Please choose another one.";
      errorMessage.style.display = "block";
      return;
    }

    // Save the new credentials to localStorage
    storedCredentials.push({ username: username, password: password });
    localStorage.setItem(
      "storedCredentials",
      JSON.stringify(storedCredentials)
    );

    alert("Registration successful! You can now log in.");

    // Clear the form fields after submission
    signupUsernameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
    signupPasswordConfirmInput.value = "";

    // Switch to the login form after successful registration
    toggleForm("login");
  });

  // Login form submission event
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // Checking if the entered credentials match any in localStorage
    const user = storedCredentials.find(
      (cred) =>
        cred.username === enteredUsername && cred.password === enteredPassword
    );

    if (user) {
      // Successful login
      window.location.href = "home.html";
    } else {
      // Invalid credentials
      errorMessage.textContent =
        "Invalid username or password. Please try again.";
      errorMessage.style.display = "block";
    }
  });
  // Hide error message when the user starts typing
  usernameInput.addEventListener("input", function () {
    errorMessage.style.display = "none";
  });
  passwordInput.addEventListener("input", function () {
    errorMessage.style.display = "none";
  });
});
