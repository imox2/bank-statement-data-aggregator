function getOutgoingsOfADate(collection, dateString, sort=true) {
    
    const dateData = collection.filter(col=>col.date==dateString);
    return dateData;
  }

  function findRecordsAboveAmount(collection, amount, sort=true) {
    
    const data = collection.filter(col=>col.amount>=amount);
    return data;
  }

  function findRecordsAboveAndBelowAmount(collection, aboveAmount, belowAmount, sort=true) {
    
    const data = collection.filter(col=>col.amount>=aboveAmount && col.amount <belowAmount);
    return data;
  }

export {getOutgoingsOfADate,findRecordsAboveAmount, findRecordsAboveAndBelowAmount};