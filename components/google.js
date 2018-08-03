'use strict';

import { google } from 'googleapis';
const sheets 		= google.sheets('v4');
const client_email  = process.env.GOOGLE_CLIENT_EMAIL;
const private_key   = process.env.GOOGLE_PRIVATE_KEY;
const spotifySheetID = process.env.GOOGLE_SHEET_ID;
const client 		= new google.auth.JWT(
    client_email,
    null,
    private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
    null
);

export async function fetchSheetData(){
	try {
		let token 				= await getToken();
		return getSheet(spotifySheetID, token);

	} catch (err){
		throw err;
	}
};

export async function getToken(){
	return new Promise((resolve, reject) => {
	    client.authorize((err, tokens) => {
	        if (err) {
	            reject(err);
	        } else {
	            resolve(tokens.access_token);
	        }
	    });
	});
};

export async function getSheet(id, token){
	return new Promise((resolve, reject) => {
		let req = {
			spreadsheetId: id,
			range: 'A:B',
			access_token: token
		};
		
		sheets.spreadsheets.values.get(req, (err, res) => {
			if(err){
				console.log('err: ', err);
				reject(err);
			} else {
				console.log('res: ', res.data.values.length);
				let result = res.data.values.map((el) => {
					let name = el.slice()[0];
					let spotifyId = el.slice()[1];
					return {
						name: name,
						spotifyId: spotifyId
					}
				});
				resolve(result);
			}
		})
	});
};
