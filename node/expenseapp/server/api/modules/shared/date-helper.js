const converStringToDate = (dateStr) => {
    var parts = dateStr.split('/')
    return new Date(parts[2], parts[1] -1 , parts[0])
}

const isDateGreaterThanOrEqual = (testDate, baseDate) => {
    return converStringToDate(testDate).getTime >= converStringToDate(baseDate).getTime
}

const isDateLessThanOrEqual = (testDate, baseDate) => {
    return converStringToDate(testDate).getTime <= converStringToDate(baseDate).getTime
}

module.exports ={
    converStringToDate,
    isDateGreaterThanOrEqual,
    isDateLessThanOrEqual
}