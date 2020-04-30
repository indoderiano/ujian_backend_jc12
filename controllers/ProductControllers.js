const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')


module.exports={
    get:(req,res)=>{
        var sql='select * from product'
        db.query(sql,(err,productlist)=>{
            if(err) return res.status(500).send(err)
            return res.status(200).send(productlist)
        })
        // res.status(200).send({product:'test'})
    },
    add:(req,res)=>{
        console.log('add product')
        // upload image
        const path='/photo'
        const upload=uploader(path,'PRD').fields([{name:'image'}])

        upload(req,res,(err)=>{
            if(err) return res.status(500).json({message:'Upload image failed',error:err.message})
            const {image}=req.files
            const imagePath=image?path+'/'+image[0].filename:null
            console.log(imagePath)
            console.log(req.body)
            
            // in case the ref object does not exist
            // need to delete image, then terminate
            if(!req.body.data){
                console.log('delete image')
                fs.unlinkSync('./public'+imagePath)
                return res.status(500).json({message:'data undefined, please check again'})
            }
            if(!imagePath){
                return res.status(500).json({message:'image cannot be empty'})
            }

            const data=JSON.parse(req.body.data)
            data.imagePath=imagePath

            console.log(data)
            
            var sql=`insert into product set ?`
            db.query(sql,data,(err,result)=>{
                if(err){
                    console.log(err)
                    if(imagePath){
                        fs.unlinkSync('./public'+imagePath)
                    }
                    return res.status(500).json({message:'Cannot upload to mysql, please check again',error:err.message})
                }
                sql='select * from product'
                db.query(sql,(err,productlist)=>{
                    if(err) return res.status(500).send(err)
                    return res.status(200).send(productlist)
                })
            })
        })
    },
    edit:(req,res)=>{
        console.log('edit')
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            console.log(result)
            if(result.length){
                const path='/photo'
                const upload=uploader(path,'PRD').fields([{name:'image'}])

                upload(req,res,(err)=>{
                    if(err) return res.status(500).json({message:'Upload image failed',error:err.message})
                    const {image}=req.files
                    const imagePath=image?path+'/'+image[0].filename:null
                    console.log(imagePath)
                    console.log(req.body)
                    
                    // in case the ref object does not exist
                    // need to delete image, then terminate
                    if(!req.body.data){
                        console.log('delete image')
                        fs.unlinkSync('./public'+imagePath)
                        return res.status(500).json({message:'data undefined, please check again'})
                    }
                    if(!imagePath){
                        return res.status(500).json({message:'image cannot be empty'})
                    }

                    const data=JSON.parse(req.body.data)
                    data.imagePath=imagePath

                    console.log(data)
                    
                    var sql=`update product set ? where product_id=${id}`
                    db.query(sql,data,(err,updateproduct)=>{
                        if(err){
                            console.log(err)
                            if(imagePath){
                                fs.unlinkSync('./public'+imagePath)
                            }
                            return res.status(500).json({message:'Cannot upload to mysql, please check again',error:err.message})
                        }

                        // hapus image yg lama
                        fs.unlinkSync('./public'+result[0].imagePath)
                        
                        sql='select * from product'
                        db.query(sql,(err,productlist)=>{
                            if(err) return res.status(500).send(err)
                            return res.status(200).send(productlist)
                        })
                    })
                })
            }
        })
    },
    delete:async (req,res)=>{
        console.log('delete')
        const {id}=req.params
        var sql=`select imagePath from product where product_id=${id}`

        // wrong!
        // try{
        //     console.log('try')
        //     var product=await db.query(sql)
        //     res.status(200).send(product)

        // }catch(err){
        //     return res.status(500).send(err)
        // }

        db.query(sql,(err,product)=>{
            if(err) return res.status(500).send(err)

            var imagePath=product[0].imagePath
            // res.status(200).send(imagePath)
            sql=`delete from product where product_id=${id}`
            db.query(sql,(err,deleted)=>{
                if(err) return res.status(500).send(err)
                // now delete image from folder
                fs.unlinkSync('./public'+imagePath)
                res.status(200).send({message:'delete berhasil'})
            })
            
        })
    }
}