import { BigNumber } from 'bignumber.js';
import coinProfile from '@/coinProfile.json';
import { getCoinMarketData, getBlockchainMarketCap } from '@/api';
import Contract from './contract';

export default class LinkIdolContract extends Contract {
  constructor() {
    super({
      // contractAddress: 'n1k1Wyry8No7JgEaW48kuqhmo8rRSP2ej5p',
      contractAddress: 'n1eH7Ad1mxNcSTmMoGmjJJZevCEftvQYNJq', // No BigNum 4 this
      network: 'testnet',
    });
  }

  async draw(referrer = 'n1MmUacQExJwkD1xHggwaEvTpKgUeSmV4Af', value) {
    this.call({
      functionName: 'multiDraw',
      value: new BigNumber(value).times(1000000000000000000).toString(),
      args: [referrer],
    }).then(console.info);
    const result = await this.send(
      {
        functionName: 'multiDraw',
        value,
        data: [referrer],
      });
    return result;
  }

  async getCardsLeft() {
    const result = await this.call({ functionName: 'getCardsLeft' });
    return result;
  }

  async getPrice() {
    const result = await this.call({ functionName: 'getPrice' });
    return JSON.parse(result);
  }

  async getTokenIDsByAddress(address) {
    const result = await this.call(
      {
        functionName: 'getTokenIDsByAddress',
        args: [address],
      });
    return JSON.parse(result);
  }
  async getCardNameByTokenId(id) {
    const result = await this.call(
      {
        functionName: 'getCardNameByTokenId',
        args: [id],
      });
    return JSON.parse(result);
  }
  async getCardsInfoByAddress(address) {
    const ids = await this.getTokenIDsByAddress(address);
    const cardsInfo = await Promise.all(ids.map(async (tokenId) => {
      const code = await this.getCardNameByTokenId(tokenId);
      const { card, fullname, color, textColor } = coinProfile[code];
      let price;
      switch (code) {
        case 'Blockchain': {
          const result = await getBlockchainMarketCap();
          price = result.toFixed(2);
          break;
        }
        case 'SARI':
          price = 'N/A';
          break;
        default: {
          const result = await getCoinMarketData({ coinName: code });
          price = result.price.toFixed(2);
          break;
        }
      }
      return { tokenId, price, code, card, fullname, color, textColor };
    }));
    return cardsInfo;
  }
}
