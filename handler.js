'use strict';

import { fetchData } from './helpers';

export const getData = async (event, context, callback) => {
  try {
    let data = await fetchData();
    const response = {
        "statusCode": 200,
        "headers": { 
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        "body": data,
        "isBase64Encoded": false
      };

      callback(null, response);
  } catch(err){
    throw err;
  }
};