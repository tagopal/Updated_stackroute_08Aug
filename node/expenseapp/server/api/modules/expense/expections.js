const responseMessage = require('./response-messages');
const statusCodes = require('../shared/status-codes');

const expenseWithIdPresentException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.expenseWithIDAlreadyPresent}
}

const expenseWithIdNotPresentException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.expenseNotFoundWithId}
}

const nullExpenseExceptionForAdd = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.noDataReceived}
}

const nullExpenseExceptionForUpdate = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.noDataReceived}
}

const missingDataException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.missingData}
}

const emptyDataException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.emptyDataReceived}
}

const emptyDataForUpdateException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.emptyDataReceived}
}

const expenseWithoutIdReceivedException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.idMissingInrequest}
}

const expenseWithOnlyIdReceivedException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.missingValuesOtherThanId}
}

const expenseWithIdNotPresentforDeleteException = () => {
    return {errorStatus: statusCodes.BadRequest, errorMessage: responseMessage.expenseNotFoundWithIdForDelete}
}

module.exports = {
    expenseWithIdPresentException,
    expenseWithIdNotPresentException,
    nullExpenseExceptionForAdd,
    nullExpenseExceptionForUpdate,
    missingDataException,
    emptyDataException,
    emptyDataForUpdateException,
    expenseWithoutIdReceivedException,
    expenseWithOnlyIdReceivedException,
    expenseWithIdNotPresentforDeleteException
};
