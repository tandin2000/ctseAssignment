const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//Importing api
const cartAPI = require('./src/routes/cart.routes');

const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8081;

const MONGODB_URI = `mongodb+srv://admin:1234@db.soqaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {

    if (error) {
        console.log('Database Error:', error.message);
        console.log('######################################################');
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Connected...');
    console.log('######################################################');
});

app.route('/').get((req, res) => {
    res.send('Backend Service Connected');
});

// Api calls
app.use('/cart', cartAPI());
// End of api calls

app.listen(PORT, () => {
    console.log('######################################################');
    console.log(`Server is ON and running on PORT : ${PORT}`);
    console.log('Connecting to Database...');
});