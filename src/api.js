// import Promise from 'bluebird';
import Cookie from 'js-cookie';
// import * as config from '@/config';
import request from 'superagent';
// // import timeout from 'timeout-then';
// import cryptoWaterMarginABI from './abi/cryptoWaterMargin.json';
// import convertContractABI from './abi/convertContract.json';
// import NebPay from './lib/nebPay'
import coinProfile from './coinProfile.json';


export const asyncGetAddr = () => new Promise((resolve) => {
  window.postMessage({
    target: 'contentscript',
    data: {
    },
    method: 'getAccount',
  }, '*');
  window.addEventListener('message', ({ data }) => {
    if (data.data && data.data.account) {
      resolve(data.data.account);
    }
  });
});


export const getLocale = async () => (
  Cookie.get('locale') ||
  (
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage
  ).toLowerCase()
);

export const setLocale = async (locale) => {
  Cookie.set('locale', locale, { expires: 365 });
};

export async function getCoinMarketData({ coinName, fiatSymbol = 'CNY' }) {
  const coinData = coinProfile[coinName];
  const { cmcId } = coinData;
  const { body } = await request
    .get(`https://api.coinmarketcap.com/v2/ticker/${cmcId}/`)
    .query({ convert: fiatSymbol });
  const marketData = body.data.quotes[fiatSymbol];
  return Object.assign(marketData, { fiatSymbol });
}

export async function getBlockchainMarketCap(fiatSymbol = 'USD') {
  const { body } = await request
    .get('https://api.coinmarketcap.com/v2/global/')
    .query({ convert: fiatSymbol });
  const { data } = body;
  const price = data.quotes.USD.total_market_cap;
  return price;
}
