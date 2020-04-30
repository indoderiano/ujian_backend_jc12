const express=require('express')
const {StoreControllers}=require('../controllers')

const Router=express.Router()

Router.get('/get',StoreControllers.get)
Router.post('/add',StoreControllers.add)
Router.put('/edit/:id',StoreControllers.edit)
Router.delete('/delete/:id',StoreControllers.delete)

module.exports=Router