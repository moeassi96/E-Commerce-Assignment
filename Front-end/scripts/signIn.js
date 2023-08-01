window.addEventListener("load", () => {
  const signIn_btn = document.getElementById("signIn_btn");

  signIn_btn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.message === "Unauthorized") {
        document.getElementById("password-error").style.display = "block";
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem(
          "authorization",
          JSON.stringify(data.authorization)
        );

        const user_id = data.user.id;

        if (data.user.role === "customer") {
          const res = await fetch(
            `http://127.0.0.1:8000/api/get-cart-id/${user_id}`,
            {
              method: "GET",
            }
          );

          const data = await res.json();

          const cart_id = data.cart_id;

          localStorage.setItem("cart_id", cart_id);

          //

          window.location.href = "views/LandingPage.html";
        } else {
          window.location.href = "views/dashboard.html";
        }
      }
    } catch (error) {
      document.getElementById("password-error").style.display = "block";
    }
  });

  const signUp_btn = document.getElementById("signUp-btn");

  signUp_btn.addEventListener("click", () => {
    window.location.href = "views/signUp.html";
  });
});
