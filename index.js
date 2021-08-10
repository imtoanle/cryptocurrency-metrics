require('dotenv').config();

const PORT = process.env.PORT || 8112;

var metrics = require('./metric');

const express = require('express');
const app = express();
const request = require('request');

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

(async function requestCoingecko() {
  request('https://api.coingecko.com/api/v3/simple/price?ids=casper-network&vs_currencies=usd', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    metrics.cryptocurrency_cspr_price.set(body["casper-network"].usd);
  });

  setTimeout(requestCoingecko, 10*1000);
})();

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', metrics.register.contentType);
    res.send(await metrics.register.metrics());
});

app.listen(PORT, () => console.log('Server is running on http://localhost:' + PORT +', metrics are exposed on http://localhost:' + PORT + '/metrics'));
