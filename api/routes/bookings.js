const express = require('express')
const router = express.Router()
const mysql = require('mysql')


const connection = mysql.createConnection({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'In-10-sity*',
    database : 'qrscanner',
    debug    : false 
})

router.get('/', (req, res, next) =>{
    connection.query('Call sp_GetBookings',(err,rows,feilds) =>{
      
        if(err){
            console.log('Failed to get bookings' + err)
            res.sendStatus(500)
            return
        } 
        console.log("bookings have successfully been fetched.");
        res.json(rows)
    })
})
router.post('/create', (req, res) =>{
   
    const customerId =  req.body.customerId
    const itemId = req.body.itemId
    const adressId = req.body.adressId
    const userId = req.body.userId
    const bookingDate =  req.body.bookingDate
    const expiryDate = req.body.expiryDate
    const bookedIn = req.body.bookedIn
  
 console.log('Inserting booking..')

 const queryString = 'call sp_CreateBooking(?,?,?,?,?,?,?)'
 connection.query(queryString, [customerId, itemId , adressId, userId, bookingDate, expiryDate, bookedIn], (err, results, feilds )=>{
     if(err){
         console.log('Failed to insert booking.' + err)
         res.sendStatus(500)
         return
     }
     console.log('Inserted new booking with id: ', results.insertId);
     res.end()
 })   
})
router.get('/search', (req, res, next) =>{
    const search =  req.body.search
    console.log('Searching for address..') 
    const queryString = 'call sp_AddressSearch(?)'
    connection.query(queryString, [search],(err,rows,feilds) =>{
        if(err){
            console.log('Failed to get address' + err)
            res.sendStatus(500)
            return
        } 
        console.log("Address has successfully been fetched.");
        res.json(rows)
    })
})


module.exports = router;