const express=require('express')
const {InventoryControllers}=require('../controllers')

const Router=express.Router()

// Router.get('/allusers',UserControllers.allusers)
Router.get('/get',InventoryControllers.get)
Router.post('/add',InventoryControllers.add)
Router.put('/editstock/:id',InventoryControllers.editstock)
Router.delete('/delete/:id',InventoryControllers.delete)

module.exports=Router