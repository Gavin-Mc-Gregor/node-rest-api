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
    connection.query('Call sp_GetCustomers',(err,rows,feilds) =>{
      
        if(err){
            console.log('Failed to get customers' + err)
            res.sendStatus(500)
            return
        } 
        console.log("Customers have successfully be fetched.");
        res.json(rows)
    })
})
router.post('/create', (req, res) =>{
   
    const number =  req.body.number
    const name = req.body.name
    const surname = req.body.surname
    const email =  req.body.email
  
 console.log('Inserting customer..')

 const queryString = 'call sp_InsertCustomer(?,?,?,?)'
 connection.query(queryString, [number, name, surname, email], (err, results, feilds )=>{
     if(err){
         console.log('Failed to insert Customer.' + err)
         res.sendStatus(500)
         return
     }
     console.log('Inserted new customer with id: ', results.insertId);
     res.end()
 })   
})
router.get('/search', (req, res, next) =>{
    const search =  req.body.search
    console.log('Searching for customer..') 
    const queryString = 'call sp_SearchCustomer(?)'
    connection.query(queryString, [search],(err,rows,feilds) =>{
        if(err){
            console.log('Failed to get customers' + err)
            res.sendStatus(500)
            return
        } 
        console.log("Customers have successfully be fetched.");
        res.json(rows)
    })
})


module.exports = router;