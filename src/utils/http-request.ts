require('dotenv').config();
import * as http from 'http';

const httpRequest = async (alpha2Code) => {
  const url = `http://api.countrylayer.com/v2/lang/${alpha2Code}?access_key=${process.env.COUNTRY_LAYER_API_KEY}`;
  const response: { data: any[] } = { data: [] };
  return await new Promise<typeof response>((resolve, reject) =>
    http
      .get(url, (res) => {
        if (res.statusCode === 200) {
          res.on('data', (chunk) => response.data.push(JSON.parse(chunk)));
          res.on('end', () => resolve(response));
        }
      })
      .on('error', (err) => {
        console.error(err.message);
        reject('error');
      })
  );
};

export default httpRequest;
