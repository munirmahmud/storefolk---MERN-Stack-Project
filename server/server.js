require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {readdirSync} = require('fs');

const app = express();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@react-projects.8vnfa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    
// Database connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connected'))
.catch((err) => console.log("DB connection error: ", err.message));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());


// Route
app.get('/', (req, res) => {
    res.send("Home Page")
});

//Autoload Routes
readdirSync('./routes/').map((route) => app.use('/api', require(`./routes/${route}`)));

app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT}: http://localhost:${process.env.PORT}`);
})

