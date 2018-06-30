import { BigNumber } from 'bignumber.js';
import coinProfile from '@/girl_cards.json';// '@/coinProfile.json';
import { getCoinMarketData, getBlockchainMarketCap } from '@/api';
import Contract from './contract';

export default class LinkIdolContract extends Contract {
  constructor() {
    super({
      // contractAddress: 'n1k1Wyry8No7JgEaW48kuqhmo8rRSP2ej5p',
      contractAddress: 'n1u2p2BsjG13KTBsnZyv9u2M9CFyWajQZqV',
      network: 'mainnet',
    });
  }

  async draw(referrer = 'n1MmUacQExJwkD1xHggwaEvTpKgUeSmV4Af', value) {
    this.call({
      functionName: 'draw',
      value: new BigNumber(value).times(1000000000000000000).toString(),
      args: [referrer],
    }).then(console.info);
    const result = await this.send(
      {
        functionName: 'draw',
        value,
        data: [referrer],
      });
    return result;
  }

  async getCardsLeft() {
    const result = await this.call({ functionName: 'getCardsLeft' });
    return JSON.parse(result);
  }

  async getPrice() {
    const result = await this.call({ functionName: 'getDrawPrice' });
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

  async getCardsByAddress(address) {
    const result = await this.call(
      {
        functionName: 'getCardsByAddress',
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
  // async getCardsInfoByAddress(address) {
  //   const ids = await this.getTokenIDsByAddress(address);
  //   const cardsInfo = await Promise.all(ids.map(async (tokenId) => {
  //     const code = await this.getCardNameByTokenId(tokenId);
  //     const infodic = coinProfile[code];
  //     let price;
  //     switch (code) {
  //       case 'Blockchain': {
  //         const result = await getBlockchainMarketCap();
  //         price = result.toFixed(2);
  //         break;
  //       }
  //       case 'SARI':
  //         price = 'N/A';
  //         break;
  //       default: {
  //         const result = await getCoinMarketData({ coinName: code });
  //         price = result.price.toFixed(2);
  //         break;
  //       }
  //     }
  //     return infodic;
  //   }));
  //   return cardsInfo;
  // }

  // async getCardsNameAndCount(cardids) {
  //   const ids = await this.getTokenIDsByAddress(address);
  //   const cardsInfo = await Promise.all(ids.map(async (tokenId) => {
  //     const code = await this.getCardNameByTokenId(tokenId);
  //     const infodic = coinProfile[code];
  //     return infodic;
  //   }));
  //   return cardsInfo;
  // }

  async getCardsCodeAndCountByAddress(address) {
    const ids = await this.getTokenIDsByAddress(address);
    const cardcodes = {};
    await Promise.all(ids.map(async (tokenId) => {
      const code = await this.getCardNameByTokenId(tokenId);
      switch (code) {
        case 'XPM':
          cardcodes.XPM ? cardcodes.XPM += 1 : cardcodes.XPM = 1;
          break;
        case 'SARI':
          cardcodes.SARI ? cardcodes.SARI += 1 : cardcodes.SARI = 1;
          break;
        case 'BTC':
          cardcodes.BTC ? cardcodes.BTC += 1 : cardcodes.BTC = 1;
          break;
        case 'ETH':
          cardcodes.ETH ? cardcodes.ETH += 1 : cardcodes.ETH = 1;
          break;
        case 'DOGE':
          cardcodes.DOGE ? cardcodes.DOGE += 1 : cardcodes.DOGE = 1;
          break;
        case 'Blockchain':
          cardcodes.Blockchain ? cardcodes.Blockchain += 1 : cardcodes.Blockchain = 1;
          break;
        default:
          break;
      }
    }));
    return cardcodes;
  }
}
