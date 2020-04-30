const express=require('express')
const {ProductControllers}=require('../controllers')

const Router=express.Router()

Router.get('/get',ProductControllers.get)
Router.post('/add',ProductControllers.add)
Router.put('/edit/:id',ProductControllers.edit)
Router.delete('/delete/:id',ProductControllers.delete)

module.exports=Router