window.addEventListener("load", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const authorization = JSON.parse(localStorage.getItem("authorization"));
  const cart_id = localStorage.getItem("cart_id");
  console.log(user, authorization, cart_id);

  const productres = await fetch(`http://127.0.0.1:8000/api/getallproducts`, {
    method: "GET",
  });

  const products = await productres.json();

  products.forEach((product) => {
    const productCard = `
                          <div class="item-card">
                              <div class="card-header">
                                <h3 class="product-name">${product.name}</h3>
                                  <p>$<span>${product.price}</span></p>
                                  </div>
                                    <div class =card-img><img src="${product.image}" alt="${product.name}"></div>
                                  <div class="product-description">
                                    ${product.description}
                                </div>
                              <div class="add" data-product-id="${product.id}">
                                Add to cart
                              </div>
                              <div class="add-f" data-product-id="${product.id}">
                                Add to favourites
                              </div>
                            </div>
                         `;

    document.getElementById("category-items").innerHTML += productCard;
    addToCart()
    addToFavourites()
    hoverDescription()
  });


  allBtn = document.getElementById("all-cat")
  razorsBtn = document.getElementById("razors-cat")
  creamBtn = document.getElementById("cream-cat")
  brushBtn = document.getElementById("brush-cat")
  favoritesBtn = document.getElementById("favorites")




  allBtn.addEventListener("click",()=>{

    razorsBtn.style.backgroundColor = "#d9d9d9";
    allBtn.style.backgroundColor = "#8D6B94";
    creamBtn.style.backgroundColor = "#d9d9d9";
    brushBtn.style.backgroundColor = "#d9d9d9";
    favoritesBtn.style.backgroundColor = "#d9d9d9";

    document.getElementById("category-items").innerHTML = "";

    products.forEach((product) => {
      
      const productCard = `
                          <div class="item-card">
                              <div class="card-header">
                                <h3 class="product-name">${product.name}</h3>
                                  <p>$<span>${product.price}</span></p>
                                  </div>
                                    <div class =card-img><img src="${product.image}" alt="${product.name}"></div>
                                  <div class="product-description">
                                    ${product.description}
                                </div>
                              <div class="add" data-product-id="${product.id}">
                                Add to cart
                              </div>
                              <div class="add-f" data-product-id="${product.id}">
                                Add to favourites
                              </div>
                            </div>
                         `;
      document.getElementById("category-items").innerHTML += productCard;
      addToCart()
      addToFavourites()
      })
      hoverDescription()
  })

  razorsBtn.addEventListener("click",()=>{

    razorsBtn.style.backgroundColor = "#8D6B94";
    allBtn.style.backgroundColor = "#d9d9d9";
    creamBtn.style.backgroundColor = "#d9d9d9";
    brushBtn.style.backgroundColor = "#d9d9d9";
    favoritesBtn.style.backgroundColor = "#d9d9d9";

    document.getElementById("category-items").innerHTML = "";

    products.forEach((product) => {
      

      if(product.category_id === 1){
        
        const productCard = `
        <div class="item-card">
            <div class="card-header">
              <h3 class="product-name">${product.name}</h3>
                <p>$<span>${product.price}</span></p>
                </div>
                  <div class =card-img><img src="${product.image}" alt="${product.name}"></div>
                <div class="product-description">
                  ${product.description}
              </div>
            <div class="add" data-product-id="${product.id}">
              Add to cart
            </div>
            <div class="add-f" data-product-id="${product.id}">
                Add to favourites
            </div>
          </div>
       `;
      document.getElementById("category-items").innerHTML += productCard;

      
      
    // Get the "Add to cart" buttons and add event listeners
    
    
    addToCart()
    addToFavourites()


      }
    });
    hoverDescription()
  })


  creamBtn.addEventListener("click",()=>{

    razorsBtn.style.backgroundColor = "#d9d9d9";
    allBtn.style.backgroundColor = "#d9d9d9";
    creamBtn.style.backgroundColor = "#8D6B94";
    brushBtn.style.backgroundColor = "#d9d9d9";
    favoritesBtn.style.backgroundColor = "#d9d9d9";


    document.getElementById("category-items").innerHTML = "";

    products.forEach((product) => {
      

      if(product.category_id === 2){
        
      const productCard = `
                          <div class="item-card">
                              <div>
                                <h3 class="product-name">${product.name}</h3>
                                  <p>$<span>${product.price}</span></p>
                                  </div>
                                  <div class =card-img><img src="${product.image}" alt="${product.name}"></div>
                                  <div class="product-description">
                                    ${product.description}
                                </div>
                              <div class="add" data-product-id="${product.id}">
                                Add to cart
                              </div>
                              <div class="add-f" data-product-id="${product.id}">
                                Add to favourites
                              </div>
                            </div>
                         `;
      document.getElementById("category-items").innerHTML += productCard;
      addToCart()
      addToFavourites()
      }
    });
    hoverDescription()
  })

  brushBtn.addEventListener("click",()=>{

    razorsBtn.style.backgroundColor = "#d9d9d9";
    allBtn.style.backgroundColor = "#d9d9d9";
    creamBtn.style.backgroundColor = "#d9d9d9";
    brushBtn.style.backgroundColor = "#8D6B94";
    favoritesBtn.style.backgroundColor = "#d9d9d9";

    document.getElementById("category-items").innerHTML = "";

    products.forEach((product) => {
      

      if(product.category_id === 3){
        
      const productCard = `
                          <div class="item-card">
                              <div class="card-header">
                                <h3 class="product-name">${product.name}</h3>
                                  <p>$<span>${product.price}</span></p>
                                  </div>
                                    <div class =card-img><img src="${product.image}" alt="${product.name}"></div>
                                  <div class="product-description">
                                    ${product.description}
                                </div>
                              <div class="add" data-product-id="${product.id}">
                                Add to cart
                              </div>
                              <div class="add-f" data-product-id="${product.id}">
                                Add to favourites
                              </div>
                            </div>
                         `;
      document.getElementById("category-items").innerHTML += productCard;
      
      addToCart()
      addToFavourites()
      }})

      hoverDescription()
    
  })


  favoritesBtn.addEventListener("click",async()=>{
    razorsBtn.style.backgroundColor = "#d9d9d9";
    allBtn.style.backgroundColor = "#d9d9d9";
    creamBtn.style.backgroundColor = "#d9d9d9";
    brushBtn.style.backgroundColor = "#d9d9d9";
    favoritesBtn.style.backgroundColor = "#8D6B94";

    document.getElementById("category-items").innerHTML = "";


    const favres = await fetch(`http://127.0.0.1:8000/api/getFavoritesByUserId/${user.id}`,{

        method: 'GET',
          
        })
        const fav_products = await favres.json()
        
        fav_products.forEach((product) =>{
          const productCard = `
                          <div class="item-card">
                              <div>
                                <h3 class="product-name">${product.name}</h3>
                                  <p>$<span>${product.price}</span></p>
                                  </div>
                                  <div class =card-img><img src="${product.image}" alt="${product.name}"></div>
                                  <div class="product-description">
                                    ${product.description}
                                </div>
                              <div class="add" data-product-id="${product.id}">
                                Add to cart
                              </div>
                              <div class="remove-f" data-product-id="${product.id}">
                                Remove
                              </div>
                            </div>
                         `;
      document.getElementById("category-items").innerHTML += productCard;
      addToCart()

        })
    
        const removeFavoritesButtons = document.querySelectorAll(".remove-f");
        removeFavoritesButtons.forEach((button) => {
          button.addEventListener("click",async () => {

            const product_id = button.dataset.productId;

            const deleteres = await fetch(`http://127.0.0.1:8000/api/removeFavorite/${user.id}/${product_id}`,{

            method: 'DELETE',
              
            })
            const deleteMessage = await deleteres.json()
            console.log(deleteMessage)
            favoritesBtn.click();
          });
        });
  })

  

  //


  // hiding Sign in btn when userid is available and adding eventlistener on sign up btn.
  const signIn_btn = document.getElementById("signIn-btn");
  const signOut_btn = document.getElementById("signOut-btn");

  if (user) {
    signOut_btn.style.display = "block";
  } else {
    console.log("hi");
    signIn_btn.style.display = "block";
  }

  signIn_btn.addEventListener("click", () => {
    window.location.href = "../signIn.html";
  });
  //


  //sign out
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
  //
 





  function hoverDescription (){
    // hover description
    const itemCards = document.querySelectorAll(".item-card");
    
    itemCards.forEach((card) => {
      card.addEventListener("mouseenter", () => showDescription(card));
      card.addEventListener("mouseleave", () => hideDescription(card));
    });
   
  
    
    function showDescription(card) {
      const description = card.querySelector(".product-description");
      description.style.display = "block";
    }
  
   
    function hideDescription(card) {
      const description = card.querySelector(".product-description");
      description.style.display = "none";
    }
  
  }
  
  
  function addToCart(){
    const addtocartButtons = document.querySelectorAll(".add");
    addtocartButtons.forEach((button) => {
  
      button.addEventListener("click", async() => {
        const product_id = button.dataset.productId;

        button.innerText = "Added to cart"
        button.style.backgroundColor = "#8D6B94"
        button.style.cursor = "auto"
       
        const addtocartresponse = await fetch("http://127.0.0.1:8000/api/add-to-cart", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart_id, product_id }),
              });
  
            const data = await addtocartresponse.json()
            
  
      });
    });
  }

  function addToFavourites(){
    const addtofavoritesbuttons = document.querySelectorAll(".add-f");
    addtofavoritesbuttons.forEach((button)=>{

      button.addEventListener("click",async()=>{

        const product_id = button.dataset.productId;

        button.innerText = "Added to Favourites"
        button.style.backgroundColor = "#8D6B94"
        button.style.cursor = "auto"

        const favres = await fetch(`http://127.0.0.1:8000/api/addFavorite/${user.id}/${product_id}`,{

        method: 'GET',
          
        })



      })
    })


  }
});




