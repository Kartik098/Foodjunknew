

function authController(){
    return {
        login(req, res){
            res.render("auth/login");
        },
        signup(req, res){
            res.render("auth/signup");
        },
        postSignup(req,res){
            const { name, email, password } = req.body;
        }
    }
}

module.exports = authController