import axios from 'axios';
const clientId   	  = process.env.SPOTIFY_CLIENT_ID;
const clientSecret    = process.env.SPOTIFY_CLIENT_SECRET;

export async function getAccessToken(){
	try {
		let r = await axios({
	        method: 'post',
	        url:'https://accounts.spotify.com/api/token',
	        params: {
	            client_id: clientId,
	            client_secret: clientSecret,
	            grant_type :'client_credentials'
	        },
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        }
	    })
		return r.data.access_token;
	} catch(err){
		throw err;
	}
}

export async function getArtistData(data, token){
	try {
		let ids = data.slice(1).map((artist, index) => {
			return artist.spotifyId;
		}).toString();

		let url = `https://api.spotify.com/v1/artists/?ids=${ids}`
		let response = await axios({
	        method: 'get',
	        url: url,
	        headers: {
	            'Content-Type': 'application/json',
	            'Authorization': 'Bearer ' + token
	        }
	    });

	    return response.data.artists;
	} catch(err){
		console.log('err: ', err);
		throw err;
	}
}

