export async function loginUser(mail, pass) {
  const url = "https://posts-website-backend.onrender.com/sign_in";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "authorization": "Bearer " + token
    },
    body: JSON.stringify({
      email: mail,
      password: pass,
    }),
  });
  const data = await res.json();
  return data;
}

export async function registerUser(dname, uname, mail, pass) {
  const url = "https://posts-website-backend.onrender.com/sign_up";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: mail,
      password: pass,
      display_name: dname,
      user_name: uname,
    }),
  });
  const data = await res.json();
  return data;
}
