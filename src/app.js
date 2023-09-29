const express = require('express')
const app = express()
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const passport = require("passport")
const cookieParser = require('cookie-parser')
const path = require('path')


const PORT = 8080;

app.use(express.json())


mongoose.connect('mongodb+srv://mariomastroviti1:GTelibEmjmiqCT5m@cluster0.vey3hwj.mongodb.net/pruebaintegradora?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Conexión exitosa a la base de datos");
})
.catch(error => {
    console.error("Error en la conexión a la base de datos", error);
});



app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://mariomastroviti1:GTelibEmjmiqCT5m@cluster0.vey3hwj.mongodb.net/pruebaintegradora?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600,
    }),
    secret: 'claveSecreta',
    resave: false,
    saveUninitialized: true,
}));

//initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'handlebars');


app.listen(PORT, () =>{
    console.log(`escuchando en el puerto ${PORT}`);
})