const express = require('express')
const router = express.Router()
const mysql = require('mysql')


const connection = mysql.createConnection({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'qrscanner',
    debug    : false 
})

router.get('/', (req, res, next) =>{
    connection.query('Call sp_GetAddresses',(err,rows,feilds) =>{
      
        if(err){
            console.log('Failed to get Address' + err)
            res.sendStatus(500)
            return
        } 
        console.log("Addresses have successfully been fetched.");
        res.json(rows)
    })
})
router.post('/create', (req, res) =>{
   
    const line1 =  req.body.line1
    const city = req.body.city
    const latitude = req.body.latitude
    const longitude =  req.body.longitude
    const postalcode = req.body.postalcode
  
 console.log('Inserting address..')

 const queryString = 'call sp_InsertAddress(?,?,?,?,?)'
 connection.query(queryString, [line1, city, latitude, longitude, postalcode], (err, results, feilds )=>{
     if(err){
         console.log('Failed to insert address.' + err)
         res.sendStatus(500)
         return
     }
     console.log('Inserted new address with id: ', results.insertId);
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
