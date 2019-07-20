/**
 * 测试接口
 */
module.exports.Api = (req, res) => {
    res.end('server is running')
}

/**
 * 登录接口
 */
const mysql = require('mysql');
const { createToken } = require('../utils');
const { sqlConfig } = require('../config');
const connection = mysql.createConnection(sqlConfig)
connection.connect();

module.exports.Login = (req, res) => {
    const { username, password, type = 0 } = req.body;
    //把前台传过来的用户名、密码，拼接sql语句到数据库查询
    const $sql = `select * from user where username='${username}' and password='${password}' and type='${type}'`;
    connection.query($sql, (error, results) => {
        if (error) {
            res.statusCode = 500;
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            if (results.length > 0) {
                const token = createToken(results[0].uid)
                const $save = `update user set token='${token}' where id=${results[0].uid}`;
                connection.query($save, (error, results) => {
                    if (error) {
                        return console.error(error)
                    }
                })
                res.statusCode = 200;
                res.json({
                    code: 1,
                    msg: 'success',
                    token: token
                })
            } else {
                res.statusCode = 401;
                res.json({
                    code: 0,
                    msg: '没有权限访问！'
                })
                return console.error(error)
            }
        }
    })
}