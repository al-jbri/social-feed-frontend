if (!localStorage.getItem("access-token")) location.href = "/login/";

const testFetch = async () => {
  const token = localStorage.getItem("access-token");

  const response = await fetch(
    "https://posts-website-backend.onrender.com/posts?page=1&limit=20",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  );

  const data = await response.json();
  console.log("posts", data);
};

testFetch();
