const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();

const cryptocurrency_cspr_price = new client.Gauge({
  name: 'cryptocurrency_cspr_price',
  help: 'Cryptocurrency CSPR Price'
});

register.registerMetric(cryptocurrency_cspr_price);

module.exports = {
  cryptocurrency_cspr_price,
  register
};
