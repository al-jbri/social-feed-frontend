import { loginUser } from "./api.js";
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await loginUser(emailInput.value, passInput.value);
  localStorage.setItem("access-token", res.token);
  location.href = "../";
});
