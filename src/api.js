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
  window.addEventListener('message', (e) => {
    if (e.data.data.account) {
      resolve(e.data.data.account);
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
  const { id } = coinData;
  const { body } = await request
    .get(`https://api.coinmarketcap.com/v2/ticker/${id}/`)
    .query({ convert: fiatSymbol });
  const marketData = body.data.quotes[fiatSymbol];
  return Object.assign(marketData, { fiatSymbol });
}
