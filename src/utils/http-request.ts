require('dotenv').config();
import * as http from 'http';

const httpRequest = async (alpha2Code) => {
  const url = `http://api.countrylayer.com/v2/lang/${alpha2Code}?access_key=${process.env.COUNTRY_LAYER_API_KEY}`;
  const response: { data: object } = { data: [] };
  return await new Promise<typeof response>((resolve, reject) =>
    http
      .get(url, (res) => {
        let data: string = '';
        if (res.statusCode === 200) {
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            const json = JSON.parse(data);
            response.data = json;
            resolve(response);
          });
        }
      })
      .on('error', (err) => {
        console.error(err.message);
        reject('error');
      })
  );
};

export default httpRequest;
