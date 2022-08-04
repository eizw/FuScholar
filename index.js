const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const morgan = require("morgan");
const flash = require("flash");

const { scholarship, university } = require("./data")
const University = require("./university");
const Scholarship = require("./scholarship");

const async = require('async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/fuscholar', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true    
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected: index.js")
})

const fillData = async () => {
    await University.deleteMany({});
    await Scholarship.deleteMany({});

    Scholarship.insertMany(scholarship)
        .then(res => {
            console.log("command-line: PARSE db.scholarships => DONE");
        })
        .catch(e => {
            console.log(e);
        })

    University.insertMany(university)
        .then(res => {
            console.log("command-line: PARSE db.universities => DONE");
        })
        .catch(e => {
            console.log(e);
        })
    
    await Scholarship.find({}).sort({"name": "asc"}).exec(function(err, docs){});
    await University.find({}).sort({"name": "asc"}).exec(function(err, docs){});
}

fillData()
    .then(() => {
        console.log('done parsing!!');
    })
    .catch(e => {
        console.log(e);
    })

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUnitialized: true,
    cookie: {
        httpOnly: true,
        expites: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

// app.use(session(sessionConfig));
// app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//routes

app.get('/', async (req, res) => {
    const scholarships = await Scholarship.find({});
    const universities = await University.find({});
    scholarships.sort
    res.render('home.ejs', { scholarships, universities });
})

app.get('/uni/:name/:id', async (req, res) => {
    const { id } = req.params;
    const universities = await University.findById(id);
    res.render('university', { universities });
})  

app.get('/sch/:name/:id', async (req, res) => {
    const { id } = req.params;
    const scholarships = await Scholarship.findById(id);
    res.render('scholarship', { scholarships });
})


//test subject

app.get('/test', async (req, res) => {
    res.render('test.ejs');
})

//listen

app.listen(8080, () => {
    console.log("LISTENING ON PORT 8080!");
})