/*
 * @Author: heinan 
 * @Date: 2019-07-10 10:42:00 
 * @Last Modified by: pigpig
 * @Last Modified time: 2019-07-19 20:47:23
 */


//路由白名单
module.exports.whiteList = [
  "/user/login",
  "/add",
  "/userlist",
  "/update",
  '/delete'
]

//数据库配置
module.exports.sqlConfig = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123321',
  database: 'zhuan'
}