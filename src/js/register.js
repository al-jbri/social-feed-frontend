import { loginUser, registerUser } from "./api.js";

const form = document.getElementById("register-form");

const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");
const dnameInput = document.getElementById("display-name-input");
const unameInput = document.getElementById("user-name-input");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resetErrors();
  submitButton.disabled = true;

  const validation = validateForm();
  if (validation !== true) {
    submitButton.disabled = false;
    return;
  }

  const res = await registerUser(
    emailInput.value.trim(),
    passInput.value.trim(),
    dnameInput.value.trim(),
    unameInput.value.trim(),
  );
  if (!res || !res.token) {
    submitButton.disabled = false;
    return showError(unameInput, res?.detail || "Registration failed");
  }
  localStorage.setItem("access-token", res.token);
  location.replace("../");
});

// Helper functions
const errorLabel = document.getElementById("form-error");
const showError = (input, msg) => {
  input.classList.add("!border-red-500");
  errorLabel.textContent = msg;
};

const resetErrors = () => {
  const inputs = [emailInput, passInput, dnameInput, unameInput];
  inputs.forEach((input) => input.classList.remove("!border-red-500"));
  errorLabel.textContent = "";
};

function validateForm() {
  if (!dnameInput.value.trim().match(/^.{1,30}$/))
    return showError(dnameInput, "DisplayName must be between 1-30 characters");
  if (!unameInput.value.trim().match(/^.{3,30}$/))
    return showError(unameInput, "Username must be between 3-30 characters");
  if (!unameInput.value.trim().match(/^(?!\.)(?!.*\.$)(?!.*\.\.)[a-z0-9_.]+$/))
    return showError(
      unameInput,
      "Username must be only contain (small leters, numbers, underscores)",
    );
  if (
    !emailInput.value
      .trim()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  )
    return showError(emailInput, "The Email Isn't valid");
  if (!passInput.value.trim().match(/^.{8,}$/))
    return showError(passInput, "Password must be at least 8 characters");
  return true;
}
