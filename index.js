const axios = require('axios');

const API_SECRET = '';
const MEASUREMENT_ID = '';
const X_COIN_API_KEY = ''

async function getRate() {
  const res = await axios.get('https://rest.coinapi.io/v1/exchangerate/ETH/USD', {
    params: {
      apikey: X_COIN_API_KEY
    }
  })

  return res.data.rate
}

async function sendRate(rate) {
  await axios.post('https://www.google-analytics.com/mp/collect', {
    client_id: '12312312323',
    events: [
      {
        name: "eth_rate",
        params: {
          rate
        }
      }
    ]
  }, {
    params: {
      api_secret: API_SECRET,
      measurement_id: MEASUREMENT_ID
    }
  })
}

async function start() {
  const rate = await getRate();

  await sendRate(rate)

  console.log(`Rate ${rate} sent`)
}

start()
