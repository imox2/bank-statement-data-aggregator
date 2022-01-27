const commonTags = {
    'BSELTD' : 'Mutual fund',
    'Payment from Ph': 'PhonePe',
    'add-money@paytm': 'Added to paytm',
    'cred': 'Cred'
};

function tagRecords(collection) {
    collection.forEach(col => {
        col.tags = [];
        Object.keys(commonTags).forEach(tag => {
            if(col.description.indexOf(tag)!=-1) {
                col.tags.push(commonTags[tag])
            }
        })
    })
  }


export {tagRecords};