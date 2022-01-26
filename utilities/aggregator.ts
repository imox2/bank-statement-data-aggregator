import moment from 'moment';

function getTotalsForEntities(collection, sort=true) {
    
    const entitiesSumObj = collection.reduce(function(result, item) {
      var index = item.entity;
      result[index] = (result[index] || 0) + item.amount;
      return result;
    }, {});
    let result = entitiesSumObj;
    if(sort) {
        const sorted = {}
        Object.keys(entitiesSumObj).sort ((a,b) => entitiesSumObj[b] - entitiesSumObj[a]).map(item => sorted[item] = entitiesSumObj[item]);
        result = sorted;
    }
    return result;
  }


const sortDateMoments = (testObj) => {
    const orderedDates = {}
    Object.keys(testObj).sort(function(a, b) {
        return (moment(a, 'DD/MM/YYYY').toDate() as any) - (moment(b, 'DD/MM/YYYY').toDate() as any);
    }).forEach(function(key) {
        orderedDates[key] = testObj[key];
    })
    return orderedDates;
}


  function getTotalsForDates(collection, sort=true) {
    
    const entitiesSumObj = collection.reduce(function(result, item) {
      var index = item.date;
      result[index] = (result[index] || 0) + item.amount;
      return result;
    }, {});
    let result = entitiesSumObj;
    if(sort) {
        const sorted = {}
        Object.keys(entitiesSumObj).sort ((a,b) => entitiesSumObj[b] - entitiesSumObj[a]).map(item => sorted[item] = entitiesSumObj[item]);
        result = sortDateMoments(sorted);
    }
    return result;
  }


export {getTotalsForEntities, getTotalsForDates};