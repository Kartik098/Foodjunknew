import axios from 'axios'
import  Noty  from 'noty';
import 'noty/lib/noty.css';

let addToCart = document.querySelectorAll(".add-to-cart")
let cartCounter = document.querySelector("#cartCounter")
function updateCart(fooditem){
    axios.post("/update-cart",fooditem).then(res =>{
      console.log(res);

      cartCounter.innerText = res.data.totalQty;
       new Noty({
              
             type:"success",
             timeout:1000,
             text:"Item added to the cart!"
             
            
      }).show();      
    }).catch(err => {
      new Noty({
              
        type:"error",
        timeout:1000,
        text:"Something went wrong"
        
       
 }).show();      
    })
    
}

addToCart.forEach((btn) =>{
btn.addEventListener("click", function (e) {
 
var fooditem = JSON.parse(btn.dataset.fooditem);

console.log(fooditem);
updateCart(fooditem);
});
});
