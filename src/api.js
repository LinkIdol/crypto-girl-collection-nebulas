import Promise from 'bluebird';
import Cookie from 'js-cookie';
// import * as config from '@/config';
import request from 'superagent';
// // import timeout from 'timeout-then';
// import cryptoWaterMarginABI from './abi/cryptoWaterMargin.json';
// import convertContractABI from './abi/convertContract.json';
// import NebPay from './lib/nebPay'
import { network } from './config';
import NebPay from './lib/nebpay';

const nebPay = new NebPay();

export async function upload(data) {
  const to = network.mainnet.address;
  const resp = await nebPay.call(to, 0, 'save', JSON.stringify(data), { listener: undefined });
  return resp;
}

export const asyncGetAddr = () => new Promise((resolve, reject) => {
  window.postMessage({
    target: 'contentscript',
    data: {
    },
    method: 'getAccount',
  }, '*');
  window.addEventListener('message', (e) => {
    // e.detail contains the transferred data (can
    if (e.data.data.account) {
      resolve(e.data.data.account);
    }
  });
});

async function callContractMethod({ functionName, args }) {
  const from = await asyncGetAddr();
  const to = network.mainnet.address;
  const other = {
    value: '0',
    nonce: 0,
    gasPrice: '1000000',
    gasLimit: '2000000',
    contract: { function: functionName, args: JSON.stringify(args) },
  };
  const { body } = await request
    .post('https://mainnet.nebulas.io/v1/user/call')
    .send(Object.assign({ from, to }, other));

  const { result } = body.result;
  const value = JSON.parse(result);
  return value;
}

export async function get() {
  const result = await callContractMethod({ functionName: 'get', args: [] });
  const value = JSON.parse(result);
  console.log(value);
  return value;
}


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
