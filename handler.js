'use strict';

import { fetchSheetData } from './components/google';
import { getArtistData, getAccessToken} from './components/spotify';

export const getData = async (event, context, callback) => {
  try {
    let data  = fetchSheetData();
    let token = getAccessToken();
    let ready = await Promise.all([Promise.resolve(data), Promise.resolve(token)]);

    // promisify the two above so they happen asynchronously
    let  getArtists = await getArtistData(ready[0], ready[1]);

    const response = {
        "statusCode": 200,
        "headers": { 
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        "body": JSON.stringify(getArtists),
        "isBase64Encoded": false
      };

      callback(null, response);
  } catch(err){
    throw err;
  }
};