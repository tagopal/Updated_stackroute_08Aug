const responseMessages ={
    successfullyAdded : 'Expense record is added successfully',
    notFound: 'Details not found',
    expenseWithIDAlreadyPresent: 'Expense record is already exist with the given id',
    emptyDataReceived:'Empty Data is not allowed, Please provide valid data',
    noDataReceived:'Please provide data to add new expense',
    missingData:'All Data are mandatory',
    sucessfullyUpdated:'Expense record is updated sucessfully',
    expenseNotFoundWithId:'Expense record is not found with the given Id',
    emptyDataForUpdate:'Empty Data is not allowed, Please provide valid data to Update',
    noDataReceivedForUpdate:'Please provide id and some data to update expense record',
    idMissingInrequest:'Please provide expense id to update record',
    missingValuesOtherThanId:'Please provide values those needs to update',
    sucessfullyDeleted: 'Expense record is deleted sucessfully',
    expenseNotFoundWithIdForDelete:'Please provide correct id for Deletion'
}

module.exports = responseMessages;