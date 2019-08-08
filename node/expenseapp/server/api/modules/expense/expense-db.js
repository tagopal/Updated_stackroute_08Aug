let db = require('../../../db.json');

const dateHelper = require('../shared/date-helper');
const validations = require('./validations');

const getAll = (category, startDate, endDate) => {
    let data = db;

    if(category){
        data = data.filter(e => e.category == category);
    }
    if(startDate){
        data = data.filter(e => dateHelper.isDateGreaterThanOrEqual(e.expenseDate,startDate));
    }
    if(endDate){
        data = data.filter(e => dateHelper.isDateGreaterThanOrEqual(e.expenseDate,endDate));
    }
    return data;
};

const addExpense = (expense) => {
    validations.validateExpenseToAdd(expense,db);
    db.push(expense);
}

const updateExpense = (id, expense) => { 
    validations.validateExpenseToUpdate(id, expense, db);
    db = db.map(e =>(e.id === id)? expense : e);
}

const deleteExpense = (id) => {
    validations.validateExpenseToDelete(id, db);
    db = db.filter(e =>(e.id !== id));
}

module.exports = {
    getAll,
    addExpense,
    updateExpense,
    deleteExpense
};