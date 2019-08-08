const router = require('express').Router();

const db = require('./expense-db');
const responseMessages = require('./response-messages');
const stautsCode = require('../shared/status-codes');
const validations = require('./validations');

// write all routing code and logic here

//get search expenses
router.get('/:category?',(req,res) =>{
    const category = req.params.category;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    const data = db.getAll(category, startDate, endDate);
    res.status(stautsCode.success).json(data);
});

//create expenses
router.post('/',(req,res) =>{
   try{
    validations.validateRequestContentLength(req.headers['content-length'], 'add');
    db.addExpense(req.body);
    res.status(stautsCode.Created).json(responseMessages.successfullyAdded);
   } catch (error){
    res.status(error.errorStatus).json(error.errorMessage);
   }
});

//update expenses
router.put('/:id',(req,res) =>{
    const id = req.params.id;
    try{
     validations.validateRequestContentLength(req.headers['content-length'], 'update');
     db.updateExpense(id, req.body);
     res.status(stautsCode.success).json(responseMessages.successfullyUpdated);
    } catch (error){
     res.status(error.errorStatus).json(error.errorMessage);
    }
 });

 //update expenses
router.delete('/:id',(req,res) =>{
    const id = req.params.id;
    try{     
     db.deleteExpense(id);
     res.status(stautsCode.success).json(responseMessages.successfullyDeleted);
    } catch (error){
     res.status(error.errorStatus).json(error.errorMessage);
    }
 });

//Undefined router
router.get('*', (req, res) => {
    res.status(stautsCode.NotFound).json(responseMessages.NotFound);
});

module.exports = router;