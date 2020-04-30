// connection
const mysql=require('mysql')
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'maungapain',
    database:'ujianbackend',
    port:'3306'
})
db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('ujian backend database is connected')
    }
})

module.exports={db}