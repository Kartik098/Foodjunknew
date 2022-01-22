const Menu = require("../../models/menu");

function homeController(){
    return {
        async index(req, res){
            const fooditems = await Menu.find()
               return res.render("home",{fooditems:fooditems});
         
           
        }
    }
}

module.exports = homeController