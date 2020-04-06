const https = require('https');

function getTrendingsDevs(request) {
  let language = request.query.language || 'rails',
      timespan = request.query.since || 'weekly',
      remoteUrl = `https://github-trending-api.now.sh/developers?language=${language}&since=${timespan}`;
      
  return new Promise((resolve, reject) => {
    https.get(remoteUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data = data.concat(chunk);
      });

      response.on('end', () => {
        resolve(data);
      })

    })
    .on('error', (error) => {
      reject(error.toString());
    });
  });
}

module.exports = {
  getTrendingsDevs: getTrendingsDevs
};