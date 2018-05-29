import { BigNumber } from 'bignumber.js';
import Contract from './contract';

export default class LinkIdolContract extends Contract {
  constructor() {
    super({ contractAddress: 'n1jC14u9KvnDVuNv1S6Pd8z5X3ebcGWp1jk', network: 'testnet' });
  }

  async draw(referrer = '') {
    const value = 0.001;
    const testResult = await this.call({
      functionName: 'luckyDraw',
      value: new BigNumber(value).times('1000000000000000000'),
      args: [referrer],
    });
    if (isNaN(testResult)) {
      alert(testResult);
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

  async getTokenIDsByAddress(address) {
    const result = await this.call({ functionName: 'getTokenIDsByAddress', args: [address] });
    return JSON.parse(result);
  }
  async getCardNameByTokenId(id) {
    const result = await this.call({ functionName: 'getCardNameByTokenId', args: [id] });
    return JSON.parse(result);
  }
  async getCardsInfoByAddress(address) {
    const ids = await this.getTokenIDsByAddress(address);
    const cardsInfo = await Promise.all(ids.map(async (id) => {
      const name = await this.getCardNameByTokenId(id);
      return { id, name };
    }));
    return cardsInfo;
  }
}
