const url = require('url');
const queryString = require('querystring');

const mysql = require('mysql');
const { sqlConfig } = require('../config');
const connection = mysql.createConnection(sqlConfig)
connection.connect();

/**
 * 获取用户列表
 */
module.exports.UserList = (req, res) => {
    const $sql=`select * from user`;
    connection.query($sql,(error, results) => {
        console.log(results)
        if (error) {
            res.statusCode=500
            res.json({
                code: 0,
                msg:error
            })
            return console.error(error);
        }else{
             res.statusCode = 200;
            res.json({
            code: 1,
            msg: 'insert success',
            result:results
         })
        console.log('insert success')
        }
    })
    // const oUrl = url.parse(req.url);
    // const oQuery = queryString.parse(oUrl.query);
    // const { pagesize, pagecount } = oQuery;
    // const $sql = pagecount == undefined
    //     ? `select * from user`
    //     : `select * from user limit ${pagesize},${pagecount}`;
    // connection.query($sql, (error, result) => {
    //     if (error) {
    //         res.json({
    //             code: 0,
    //             error
    //         })
    //         return console.error(error);
    //     } else {
    //         connection.query('select count(*) as total  from user', (t_error, t_result) => {
    //             if (error) throw new Error(error);
    //             res.json({
    //                 code: 1,
    //                 result,
    //                 total: t_result[0].total
    //             })
    //         })
    //     }
    // })
}

/**
 * 获取mv分页列表数据
 */
module.exports.VedioList = (req, res) => {
    const oUrl = url.parse(req.url);
    const oQuery = queryString.parse(oUrl.query);
    const { pagesize, pagecount } = oQuery;
    const $sql = pagecount == undefined
        ? `select * from vedio`
        : `select * from vedio limit ${pagesize},${pagecount}`;
    connection.query($sql, (error, result) => {
        if (error) {
            res.json({
                code: 0,
                error
            })
            return console.error(error);
        } else {
            res.json({
                code: 1,
                result
            })
        }
    })
}

/**
 * 添加用户
 */
module.exports.AddUser = (req, res) => {
    const {username,password,type} = req.body;
    const $sql = 'insert into user  (`username`, `password`,`type`) VALUES (?,?,?)';
    const $params = [username,password,type];
    connection.query($sql, $params, (error, result) => {
        if (error) {
            res.json({
                code: 0,
                error
            })
            return console.error(error);
        }
         res.statusCode = 200;
        res.json({
            code: 1,
            msg: 'insert success'
        })
        console.log('insert success')
    })
}
/** 
 * 更改用户
*/
module.exports.Update = (req, res) => {
    const {username,password,type,uid}=req.body;
    const $sql = 'update user  set username=?, password=?,  type=? where  uid=?';
    const $params = [username,password,type,uid];
    connection.query($sql,$params,(error, result) => {
        if (error) {
            res.json({
                code: 0,
                error
            })
            return console.error(error);
        }
        res.statusCode = 200;
        res.json({
            code: 1,
            msg: 'update success'
        })
        console.log('update success')
    })
}
/** 
 * 删除用户
*/
module.exports.Delete = (req, res) => {
    const {uid}=req.body;
    const $sql = 'delete from user where `uid`=?';
    const $params = [uid];
    connection.query($sql,$params,(error, result) => {
        if (error) {
            res.json({
                code: 0,
                error
            })
            return console.error(error);
        }
        res.statusCode = 200;
        res.json({
            code: 1,
            msg: 'delete success'
        })
        console.log('delete success')
    })
}