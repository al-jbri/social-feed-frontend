import { loginUser } from "./api.js";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");
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

  const res = await loginUser(emailInput.value.trim(), passInput.value.trim());
  if (!res || !res.token) {
    submitButton.disabled = false;
    return showError(emailInput, res?.detail || "Invalid email or password");
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
  emailInput.classList.remove("!border-red-500");
  passInput.classList.remove("!border-red-500");
  errorLabel.textContent = "";
};

function validateForm() {
  if (
    !emailInput.value
      .trim()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  )
    return showError(emailInput, "The Email Isn't valid");
  if (!passInput.value.trim().match(/^.{8,}$/))
    return showError(passInput, "The Password Isn't valid");
  return true;
}
