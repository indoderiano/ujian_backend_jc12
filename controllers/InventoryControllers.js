const {db}=require('../connections/mysql')

var sqlList=`
    select inventory_id as No, p.nama as Product, s.branch_name as Branch_name, inventory as Stock  
    from inventory i
    join product p on i.product_id=p.product_id
    join store s on i.store_id=s.store_id
    order by inventory_id
`

module.exports={
    get:(req,res)=>{
        console.log('get inventory')
        // var sql=`
        //     select inventory_id as No, p.nama as Product, s.branch_name as Branch_name, inventory as Stock  
        //     from inventory i
        //     join product p on i.product_id=p.product_id
        //     join store s on i.store_id=s.store_id
        //     order by i.inventory_id
        // `
        db.query(sqlList,(err,list)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(list)
        })
    },
    add:(req,res)=>{
        console.log('add inventory')
        console.log(req.body)
        const {product,branch,stock}=req.body


        // this case if front end input the name of product, branch name, instead of , product_id and store_id

        // get product_id
        var sql=`select product_id from product where nama='${product}'`
        db.query(sql,(err,product)=>{
            if(err) return res.status(500).send(err)
            var product_id=product[0].product_id
            console.log(product_id)

            // get store_id
            sql=`select store_id from store where branch_name='${branch}'`
            db.query(sql,(err,store)=>{
                if(err) return res.status(500).send(err)
                var store_id=store[0].store_id
                console.log(store_id)

                // check if inventory already exist
                sql=`select * from inventory where product_id=${product_id} and store_id=${store_id}`
                db.query(sql,(err,inventory)=>{
                    if(err) return res.status(500).send(err)

                    if(inventory.length){
                        // cancel create
                        return res.status(500).send({message:'inventory already exist'})
                    }else{
                        // create new inventory
                        var add={
                            product_id:product_id,
                            store_id:store_id,
                            inventory:stock
                        }
                        sql=`insert into inventory set ?`
                        db.query(sql,add,(err,created)=>{
                            if(err) return res.status(500).send(err)
        
                            sql=`select * from inventory`
                            db.query(sqlList,(err,inventorylist)=>{
                                if(err) return res.status(500).send(err)
                                res.status(200).send(inventorylist)
                            })
                        })
                    }
                })

            })
        })
    },
    editstock:(req,res)=>{
        console.log('edit inventory')
        console.log(req.body)
        const {id}=req.params
        const {stock}=req.body


        var edit={
            inventory:stock
        }
        var sql=`update inventory set ? where inventory_id=${id}`
        db.query(sql,edit,(err,edited)=>{
            if(err) return res.status(500).send(err)
            
            db.query(sqlList,(err,inventorylist)=>{
                if(err) return res.status(500).send(err)
                res.status(200).send(inventorylist)
            })
        })

    },
    delete:(req,res)=>{
        console.log('delete inventory')
        const {id}=req.params
        var sql=`delete from inventory where inventory_id=${id}`
        db.query(sql,(err,deleted)=>{
            if(err) return res.status(500).send(err)
            
            db.query(sqlList,(err,inventorylist)=>{
                if(err) return res.status(500).send(err)
                res.status(200).send(inventorylist)
            })
        })
    }
}