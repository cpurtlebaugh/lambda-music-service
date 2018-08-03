'use strict';

import { fetchData } from './components/google';
import { authorizeSpotify, getArtistData, getAccessToken} from './components/spotify';

export const getData = async (event, context, callback) => {
  try {
    let data = await fetchData();
    // let aurthorize = await authorizeSpotify();
    let token = await getAccessToken();
    // promisify the two above so they happen asynchronously
    console.log('token: ', token);
    let  getArtists = await getArtistData(data, token);

    const response = {
        "statusCode": 200,
        "headers": { 
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        "body": getArtists,
        "isBase64Encoded": false
      };

      callback(null, response);
  } catch(err){
    throw err;
  }
};