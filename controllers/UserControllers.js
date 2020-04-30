const {db}=require('../connections/mysql')


module.exports={
    allusers:(req,res)=>{
        console.log('all users data')
        var sql='select * from users'
        db.query(sql,(err,alluser)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(alluser)
        })
        // res.status(200).send({data:'test'})
        console.log('ini setelah db')
    },
    empty:(req,res)=>{
        // nothing
        if(true) res.status(500).send({data:'empty2'})
        console.log('here')
        return res.status(200).send({data:'empty'})
        

    }
}