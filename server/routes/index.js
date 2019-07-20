var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const bodyParserMidllware = bodyParser.urlencoded({ extended: false })

const { Login } = require('../controller/user')
const { AddUser,UserList,Update,Delete} = require('../controller/movie')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/login', bodyParserMidllware, Login)
router.post('/add',bodyParserMidllware,AddUser)
router.get('/userlist',bodyParserMidllware,UserList)
router.post('/update',bodyParserMidllware,Update)
router.post('/delete',bodyParserMidllware,Delete)
module.exports = router;