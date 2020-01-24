const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const PORT = process.env.PORT|| 3001;

const  cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// if(process.env.NODE_ENV === 'production') {
//    console.log("Running on production");
//    app.use(express.static('client/build'));
//}

const connectHistoryApiFallback = require('connect-history-api-fallback');


app.use(connectHistoryApiFallback({
  verbose: false
}));

// static files and folders must be set after connectHistoryApiFallback
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Declare routes right here.
const routes = require('./routes');

// Prepend / to any route declared inside of routes
app.use(routes);


app.listen(PORT, () => console.log('Port started on port: ' + PORT));
