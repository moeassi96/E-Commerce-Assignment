
window.addEventListener("load",()=>{

       const user = JSON.parse(localStorage.getItem("user"));
       const authorization = JSON.parse(localStorage.getItem("authorization"));
       const cart_id = localStorage.getItem("cart_id");
      console.log(user,authorization,cart_id)

    





















      const itemCards = document.querySelectorAll('.item-card');

      // Attach hover event listeners to each item card
      itemCards.forEach((card) => {
        card.addEventListener('mouseenter', () => showDescription(card));
        card.addEventListener('mouseleave', () => hideDescription(card));
      });
      console.log(itemCards)
      
      // Function to show the product description popup on hover
      function showDescription(card) {
        const description = card.querySelector('.product-description');
        description.style.display = 'block';
      }
      
      // Function to hide the product description popup on hover out
      function hideDescription(card) {
        const description = card.querySelector('.product-description');
        description.style.display = 'none';
      }
      
      
      
      
      
      
      































       
    // hiding Sign in btn when userid is available and adding eventlistener on sign up btn.
     const signIn_btn = document.getElementById("signIn-btn")
     const signOut_btn = document.getElementById("signOut-btn")

     if (user) {
       signOut_btn.style.display = "block";
      }
      else{
       console.log("hi")
       signIn_btn.style.display = "block";
       
      }

     signIn_btn.addEventListener("click",()=>{
       
       window.location.href = "../signIn.html";
     })
     //

     signOut_btn.addEventListener("click",async()=>{


       const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authorization.token}`,
                },
              });

    
            const data = await response.json()
              console.log(data)



       localStorage.clear()
       window.location.href = "../signIn.html";
     })


     const card_container = document.getElementById("category-items")


})