const express=require('express')
const router=express.Router()

const customersController=require('../app/controllers/customersController')
router.get('/customers',customersController.list)
router.post('/customers',customersController.create)
router.get('/customers/:id',customersController.show)
router.put('/customers/edit/:id',customersController.update)
router.delete('/customers/:id',customersController.destroy)

const departmentsController=require('../app/controllers/departmentsController')
router.get('/departments',departmentsController.list)
router.post('/departments',departmentsController.create)
router.put('/departments/:id',departmentsController.update)
router.get('/departments/:id',departmentsController.show)
router.delete('/departments/:id',departmentsController.remove)

const employeesController=require('../app/controllers/employeesController')
router.get('/employees',employeesController.list)
router.post('/employees',employeesController.create)
router.get('/employees/:id',employeesController.show)
router.put('/employees/:id',employeesController.update)
router.delete('/employees/:id',employeesController.destroy)

const ticketsController=require('../app/controllers/ticketsController')
router.get('/tickets',ticketsController.list)
router.post('/tickets',ticketsController.create)
router.get('/tickets/:id',ticketsController.show)
router.put('/tickets/:id',ticketsController.update)
router.delete('/tickets/:id',ticketsController.destroy)

module.exports=router
