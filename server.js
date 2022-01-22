require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session")
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const { options } = require("laravel-mix");
const flash = require("express-flash");
const connectMongo = require('connect-mongo');
const { json } = require("body-parser");
 const MongoStore =  connectMongo(session); 


const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.use((req, res, next) =>{
    res.locals.session = req.session;
    
    next();
})

app.use('/js',express.static('js'));
app.use('/images',express.static('images'));
app.use(expressLayout);
app.set('views',path.join(__dirname, '/resources/views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

const url ="mongodb://localhost:27017/food"
mongoose.connect(url, {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Database connected..");
}).on('error',function(err) {
    console.log(err);
});


//Session store
const sessionStore = new MongoStore({
    mongooseConnection:connection,
    collection: "sessions"
})

app.use(session({
    resave: false,
    saveUninitialized:true,
    secret:  process.env.COOKIE_SECRET,
    store: sessionStore,
    cookie:{maxAge: 1000 *60 *60 *24} 
  }));

app.use(flash())

require("./routes/web")(app)



app.post("/signup", function(req, res){ 
    const newUser = new User({
        name:req.body.name,
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.render("home");
        }
    });
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);

    User.findOne({email:username}, function(err, foundUser){
        if(err){
            console.log(err);
        } else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("home");
                    
                }
            }
        }

    })
})
app.listen(PORT,() =>{
    console.log("Server started on port 3000")
});
