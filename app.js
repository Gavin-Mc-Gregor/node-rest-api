const express =require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');



const productRoutes = require('./api/routes/items');
const bookingRoutes = require('./api/routes/bookings');
const userRoutes = require('./api/routes/users');
const customerRoutes = require('./api/routes/customers');
const addressRoutes = require('./api/routes/addresses');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin. X-Requested-with, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', userRoutes);
app.use('/items', productRoutes);
app.use('/bookings', bookingRoutes);
app.use('/customers', customerRoutes);
app.use('/addresses', addressRoutes);

app.use((req, res, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((req, res, next) =>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});
module.exports = app;