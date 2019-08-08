const exceptions = require('./expections');

const validateExpenseToAdd = (expense, allExpenses) => {
    if (!expense){
        throw exceptions.nullExpenseException();
    }

    if (Object.keys(expense).length === 0 && expense.constructor === Object ){
        throw exceptions.missingDataException();
    }

    const expenseWithSameId = allExpenses.find(e => e.id === expense.id);
    if (expenseWithSameId) {
        throw exceptions.expenseWithIdPresentException();
    }
}

const validateExpenseToUpdate = (id, expense, allExpenses) => {
    const expenseWithId = allExpenses.find(e => e.id === id);
    if (expenseWithId) {
        throw exceptions.expenseWithIdNotPresentException();
    }
    if (Object.keys(expense).length === 0 && expense.constructor === Object ){
        throw exceptions.emptyDataForUpdateException();
    }
    if (!expenseWithId) {
        throw exceptions.expenseWithoutIdReceivedException();
    }
    if (!(expense.title && expense.category && expense.description && expense.amount && expense.expenseDate)) {
        throw exceptions.expenseWithOnlyIdReceivedException();
    }
}

const validateExpenseToDelete = (id, allExpenses) => {
    const expenseWithId = allExpenses.find(e => e.id === id);
    if (expenseWithId) {
        throw exceptions.expenseWithIdNotPresentforDeleteException();
    }
}

const validateRequestContentLength = (Length, requestType) => {
    if (parseInt(Length) === 0){
        if (requestType === 'add'){
            throw exceptions.nullExpenseExceptionForAdd(requestType);
        }
        if (requestType === 'update'){
            throw exceptions.nullExpenseExceptionForUpdate(requestType);
        }
    }
}

module.exports = {
    validateExpenseToAdd,
    validateExpenseToUpdate,
    validateExpenseToDelete,
    validateRequestContentLength
}