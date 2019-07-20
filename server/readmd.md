# 查询数据库步骤
## 安装
- 安装数据库
- 创建数据库、数据表
## mysql 中间件
- 安装
```cmd
    npm install --save msyql
```
- 创建数据库连接
```js
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123321',
        database : 'my_db'
    });
```
- 连接数据库
```js
    connection.connect();
```
- 执行sql语句
```js
    //sql 语句，增删改查
    const $sql = 'SELECT 1 + 1 AS solution';
    //执行sql
    connection.query($sql , (error, results)=> {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
```
- 断开连接
```js
    connection.end()
```


# HTTP状态码
- 200 - 请求成功
- 301 - 资源（网页等）被永久转移到其它URL
- 400 - 客户端请求的语法错误，服务器无法理解
- 401 - 没有权限访问资源
- 404 - 请求的资源（网页等）不存在
- 500 - 内部服务器错误

# JWT （JSON WEB TOKEN）
JSON Web Token（JWT）是目前最流行的跨域身份验证解决方案
## 组成
```js
    const token = {
        iss:'bwwz',
        uid:'1',
        tim: new Deta().getTime()
    }
```