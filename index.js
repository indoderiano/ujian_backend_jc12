const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const bearertoken=require('express-bearer-token')

const app=express()

const PORT=5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bearertoken())
app.use(cors())


app.get('/',(req,res)=>{
    return res.send("<h1 style='text-align:center; margin-top:100px;'>API Ujian Backend JC 12</h1>")
})


const {UserRouters,ProductRouters,StoreRouters,InventoryRouters}=require('./routers')
app.use('/users',UserRouters)
app.use('/products',ProductRouters)
app.use('/stores',StoreRouters)
app.use('/inventories',InventoryRouters)


app.listen(PORT,()=>console.log('API is online at port '+PORT))


