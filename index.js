const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT|| 3001;

const  cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Declare routes right here.
const routes = require('./routes');

// Prepend / to any route declared inside of routes
app.use(routes);


app.listen(PORT, () => console.log('Port started on port: ' + PORT));
