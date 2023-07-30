
window.addEventListener("load",async()=>{

    const user = JSON.parse(localStorage.getItem("user"));
    const authorization = JSON.parse(localStorage.getItem("authorization"));
    
    console.log(user, authorization);
















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

})



