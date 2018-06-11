import { BigNumber } from 'bignumber.js';
import coinProfile from '@/girl_cards.json';//'@/coinProfile.json';
import { getCoinMarketData, getBlockchainMarketCap } from '@/api';
import Contract from './contract';

export default class LinkIdolContract extends Contract {
  constructor() {
    super({
      contractAddress: 'n1k1Wyry8No7JgEaW48kuqhmo8rRSP2ej5p',
      network: 'testnet',
    });
  }

  async draw(referrer = 'n1MmUacQExJwkD1xHggwaEvTpKgUeSmV4Af', price) {
    const value = 0.01;
    const testResult = await this.call({
      functionName: 'luckyDraw',
      value: new BigNumber(price),
      args: [referrer],
    });
    if (isNaN(testResult)) {
      return false;
    }
    const result = await this.send(
      {
        functionName: 'luckyDraw',
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
    return new BigNumber(result).toString(10);
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
      const infodic = coinProfile[code];
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
      return infodic;
    }));
    return cardsInfo;
  }
}
