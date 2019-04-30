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
    connection.query('Call sp_getUsers',(err,rows,feilds) =>{
        res.json(rows)
    })
});

router.post('/create', (req, res) =>{
   
       const username =  req.body.name
       const password =  req.body.password
       const name = req.body.name
       const surname = req.body.surname
       const usertype = req.body.usertype
    
    console.log('Tring to craete user')

    const queryString = 'INSERT INTO users (U_UserName, U_Password, U_Name, U_Surname, UT_UserType) VALUES(?, ?, ?, ?, ?)'
    connection.query(queryString, [username, password, name, surname, usertype], (err, results, feilds )=>{
        if(err){
            console.log('Failed to insert user' + err)
            res.sendStatus(500)
            return
        }
        console.log('Insert a new user with id: ', results.insertId);
        res.end()
    })   
})

router.get('/doLogin', (req, res) => {

    const username = req.body.username
    const password = req.body.passowrd

    console.log('Tring to get user')
    const queryString = 'select * from Users where users.U_UserName = ? and users.U_Password = ?;'
    connection.query(queryString, [username, password], (err,rows, feilds) => {
        if (err) {
            console.log('Failed to get user' + err)
            res.sendStatus(500)
            return
        }
        console.log(" login successful");
        res.json(rows)
    })
})

router.get('/:Id', (req, res, next)=>{
    const userId = req.params.Id
    const queryString = 'SELECT * FROM users WHERE U_ID = ?'
    connection.query(queryString, [userId], (err, rows, feilds) =>{
        if(err){
            console.log('Failed to query for users '+ err)
            res.status(500)
            return
        }
        console.log('Retreiving single user')
        res.json(rows)
    })
    
});
router.patch('/:Id', (req,res,next) =>{
    //ect
});
router.delete('/Id', (req,res,next) =>{
    //ect
})

module.exports = router;
