const {db}=require('../connections/mysql')


module.exports={
    get:(req,res)=>{
        console.log('get all store')
        var sql='select * from store'
        db.query(sql,(err,allstore)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(allstore)
        })
    },
    add:(req,res)=>{
        console.log('add store')
        console.log(req.body)
        const add={
            branch_name:req.body.name
        }
        var sql=`insert into store set ?`
        db.query(sql,add,(err,result)=>{
            if(err) return res.status(500).send(err)

            sql=`select * from store`
            db.query(sql,(err,storelist)=>{
                if(err) return res.status(500).send(err)
                res.status(200).send(storelist)
            })
        })
    },
    edit:(req,res)=>{
        console.log('edit store')
        console.log(req.body)
        const {id}=req.params
        const edit={
            branch_name:req.body.name
        }
        var sql=`update store set ? where store_id=${id}`
        db.query(sql,edit,(err,edited)=>{
            if(err) return res.status(500).send(err)

            sql=`select * from store`
            db.query(sql,(err,storelist)=>{
                if(err) return res.status(500).send(err)
                res.status(200).send(storelist)
            })
        })
    },
    delete:(req,res)=>{
        console.log('delete store')
        console.log(req.body)
        const {id}=req.params
        var sql=`delete from store where store_id=${id}`
        db.query(sql,(err,deleted)=>{
            if(err) return res.status(500).send(err)

            sql='select * from store'
            db.query(sql,(err,storelist)=>{
                if(err) return res.status(500).send(err)
                res.status(200).send(storelist)
            })
        })
    }
}