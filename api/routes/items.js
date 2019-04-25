const express = require('express');
const router = express.Router();
const mysql = require('mysql')

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'In-10-sity*',
    database: 'qrscanner',
    debug: false
})
router.post('/create', (req, res) => {

    const itemtype = req.body.itemtype
    const availability = req.params.availability

    console.log('Tring to craete item')

    const queryString = 'sp_InsertItem(?,?)'
    connection.query(queryString, [itemtype, availability], (err, results, feilds) => {
        if (err) {
            console.log('Failed to insert user' + err)
            res.sendStatus(500)
            return
        }
        console.log('Inserted a new item with id: ', results.insertId);
        res.status(200).json(rows);
    })
})

router.get('/doLogin', (req, res) => {

    const username = req.body.username
    const password = req.body.passowrd

    console.log('Tring to get user')
    const queryString = 'select * from Users where users.U_UserName = ? and users.U_Password = ?;'
    connection.query(queryString, [username, password], (err, rows, feilds) => {
        if (err) {
            console.log('Failed to get user' + err)
            res.sendStatus(500)
            return
        }
        console.log(" login successful");
        res.json(rows)
    })
})

router.get('/', (req, res, next) => {
    const queryString = 'Call sp_getItems'
    connection.query(queryString, (err, rows, feilds) => {
        if (err) {
            console.log('Failed to get items' + err)
            res.sendStatus(500)
            return
        }
        res.status(200).json(rows);
    })
})

router.get('/:Id', (req, res, next) => {
    const userId = req.params.Id
    const queryString = 'SELECT * FROM users WHERE U_ID = ?'
    connection.query(queryString, [userId], (err, rows, feilds) => {
        if (err) {
            console.log('Failed to query for users ' + err)
            res.status(500)
            return
        }
        console.log('Retreiving single user')
        res.json(rows)
    })

});
router.patch('/:Id', (req, res, next) => {
    //ect
});
router.delete('/Id', (req, res, next) => {
    //ect
})

module.exports = router;