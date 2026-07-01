import { loginUser, registerUser } from "./api.js";
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");
const dnameInput = document.getElementById("display-name-input");
const unameInput = document.getElementById("user-name-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await registerUser(
    emailInput.value,
    passInput.value,
    dnameInput.value,
    unameInput.value,
  );
  localStorage.setItem("access-token", res.token);
  location.replace("../");
});
