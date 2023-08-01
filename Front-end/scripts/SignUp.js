window.addEventListener("load", () => {
  const signUp_btn = document.getElementById("signUp_btn");

  signUp_btn.addEventListener("click", async () => {
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = "customer";

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (data.message === "User created successfully") {
        console.log("User created successfully");

        const user_id = data.user.id;

        const res = await fetch(
          `http://127.0.0.1:8000/api/add-cart/${user_id}`,
          {
            method: "POST",
          }
        );

        const cartdata = await res.json();
        console.log(cartdata.message);

        //
        window.location.href = "../signIn.html";
      } else if (
        data.message === "An error occurred during user registration"
      ) {
        if (data.error === "The email has already been taken.") {
          document.getElementById("password-error").innerText =
            "(Already a member)";
          document.getElementById("password-error").style.display = "block";
        } else {
          document.getElementById("password-error").innerText =
            "(Invalid inputs)";
          document.getElementById("password-error").style.display = "block";
        }
      }
    } catch (error) {
      document.getElementById("password-error").style.display = "block";
    }
  });
});
