window.addEventListener("load", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const authorization = JSON.parse(localStorage.getItem("authorization"));
  const cart_id = localStorage.getItem("cart_id");
  console.log(user, authorization, cart_id);

  const itemsres = await fetch(
    `http://127.0.0.1:8000/api/cart-items/${cart_id}`,
    {
      method: "GET",
    }
  );

  const cart_itemsobj = await itemsres.json();
  const cart_items = cart_itemsobj.cart_items;
  const items_Container = document.getElementById("cart-products");

  let grandTotal = 0;

  cart_items.forEach((item) => {
    const total = item.price * item.quantity;
    grandTotal += total;

    items_Container.innerHTML += `
          <div class="cart-item flex items-center">
              <div class="cart-product flex gap-20 items-center">
                  <div class="cart-image">
                      <img src="${item.image}" alt="">
                  </div>
                  <div class="cart-name">
                      ${item.name}
                  </div>
              </div>
              <div class="cart-price">
                  <p>$<span>${item.price}</span></p>
              </div>
              <div class="cart-quantity">
                  <div id="minus" class="quantity-button" data-product-id="${item.product_id}">-</div>
                  <span id="quantity-${item.product_id}">${item.quantity}</span>
                  <div id ="plus" class="quantity-button" data-product-id="${item.product_id}">+</div>
              </div>
              <div class="cart-total">
                  <p>$<span id="price-${item.product_id}">${total}</span></p>
              </div>
              <div class="cart-actions">
                  <button class="remove-btn" data-product-id="${item.product_id}">Remove</button>
              </div>
          </div>`;

    const quantityButtons = document.querySelectorAll(".quantity-button");
    quantityButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        const quantityElement = document.querySelector(
          `#quantity-${productId}`
        );
        const priceElement = document.querySelector(`#price-${productId}`);
        const grandTotalElement = document.querySelector(
          ".cart-grandtotal .quantity span"
        );

        let quantity = parseInt(quantityElement.textContent);
        let price = parseFloat(priceElement.textContent.replace("$", ""));

        if (button.id === "plus") {
          quantity++;
          price += parseFloat(item.price);
          grandTotal += parseFloat(item.price);
        } else {
          if (quantity < 2) {
          } else {
            quantity--;
            price -= parseFloat(item.price);
            grandTotal -= parseFloat(item.price);
          }
        }

        quantityElement.textContent = quantity;
        priceElement.textContent = `${price}`;
        grandTotalElement.textContent = grandTotal.toFixed(2);
      });
    });
  });

  const grandTotalElement = document.querySelector(
    ".cart-grandtotal .quantity span"
  );
  grandTotalElement.textContent = grandTotal.toFixed(2);

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.productId;

      const deleteres = await fetch(
        `http://127.0.0.1:8000/api/delete-cart-item/${cart_id}/${productId}`,
        {
          method: "DELETE",
        }
      );

      const deleteMessage = await deleteres.json();
      console.log(deleteMessage);
      window.location.href = "";
    });
  });

  const checkoutBtn = document.getElementById("checkoutBtn");

  checkoutBtn.addEventListener("click", async () => {
    const resetres = await fetch(
      `http://127.0.0.1:8000/api/reset-cart-items/${cart_id}`,
      {
        method: "DELETE",
      }
    );

    const resetMessage = await resetres.json();
    console.log(resetMessage);
    window.location.href = "LandingPage.html";
  });

  // Hiding Sign in btn when userid is available and adding eventlistener on sign up btn.
  const signIn_btn = document.getElementById("signIn-btn");
  const signOut_btn = document.getElementById("signOut-btn");

  if (user) {
    signOut_btn.style.display = "block";
  } else {
    signIn_btn.style.display = "block";
  }

  signIn_btn.addEventListener("click", () => {
    window.location.href = "../signIn.html";
  });

  // Sign out
  signOut_btn.addEventListener("click", async () => {
    const response = await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authorization.token}`,
      },
    });

    const data = await response.json();
    console.log(data);

    localStorage.clear();
    window.location.href = "../signIn.html";
  });
});
