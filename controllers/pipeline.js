exports.getLotDevicesPipeLine = (id) => {
    let pipeline =  [
        {
          '$match': {
            'accountId': id
          }
        }, {
          '$group': {
            '_id': {
              'parkingLot': '$parkingLot'
            }, 
            'elements': {
              '$push': '$$ROOT'
            }, 
            'total': {
              '$sum': 1
            }
          }
        }
      ]
    return pipeline
}