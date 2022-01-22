const { application } = require("express");
const session = require("express-session");
// var Cart = require('../views/cart');  

function cartController(){
    return {
        index(req, res){
            var cart = req.session.cart;
            res.render("customers/cart",{cart:cart});
        },       
        update(req,res){
            // let cart ={
            //     Items :{
            //         itemId:{item:foodObject,qty:0}
            //     },
            //     totalqty:0,
            //     totalprice:0            
            // }
            // for the first time creating cart and adding basic structure
            if(!req.session.cart){
                req.session.cart ={
                    items:{},
                    totalQty:0,
                    totalprice:0 

                  
                }
                                             
            }
            var cart = req.session.cart;
            
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item:req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty+1;
                cart.totalprice =  cart.totalprice + req.body.price;
                
            }   else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty+1;
                cart.totalprice =  cart.totalprice + req.body.price;

            }
            return res.json({totalQty:req.session.cart.totalQty})
        }
    }
}

module.exports = cartController