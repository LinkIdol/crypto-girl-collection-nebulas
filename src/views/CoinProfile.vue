<template lang="pug">
    .item-view(v-if="isOnList")
        .columns.is-multiline.is-mobile
            .column.is-full-mobile
                img(src="http://test.cdn.hackx.org/heros/1.jpg")
            .column.is-full-mobile
                .content
                    h1.title| {{coinName}} {{$t('coin.profile')}}
                    .field.is-horizontal(v-for="field in coinData" :key="field.代号")
                        .field-label
                            strong.tag.is-danger| {{field.k}}
                        .field-body
                            .field| {{field.v}}
    section.hero.is-medium.is-fullheight(v-else)
            .hero-body
                .container
                    h1.title| Sorry
                    h2.subtitle| 但 {{coinName}} 并没有出现在我们的图鉴中
</template>


<script>
// import { buyItem, exchangeLuckyToken, setGg, setNextPrice } from '@/api';
import request from 'superagent';
import coinProfile from '@/coinProfile';

export default {
  name: 'item-view',

  data: () => ({
    marketData: {
      price: 0,
      fiatSymbol: '',
    },
  }),

  asyncComputed: {},

  computed: {
    getPrice() {
      const { marketData } = this;
      return marketData.price.toFixed(2);
    },
    getCoinProfile() {
      const { coinName } = this;
      return coinProfile[coinName];
    },
    fiatSymbol() { return this.marketData.fiatSymbol; },
    coinData() {
      const { $t, getPrice, fiatSymbol, coinName, getCoinProfile } = this;
      const name = { k: $t('coin.fields.code'), v: coinName };
      const dob = { k: $t('coin.fields.DOB'), v: getCoinProfile.DOB };
      const founder = { k: $t('coin.fields.founder'), v: getCoinProfile.founder };
      const consensus = {
        k: $t('coin.fields.consensus'),
        v: $t(`coin.consensus.${getCoinProfile.consensus}`),
      };
      const price = { k: $t('coin.fields.price'), v: `${getPrice} ${fiatSymbol}` };

      return [name, dob, founder, consensus, price];
    },
    coinProfile() {
      const { coinName } = this;
      return coinProfile[coinName];
    },
    coinName() {
      return this.$route.params.name;
    },
    isOnList() {
      const { coinName } = this;
      return ['EOS', 'ETH', 'BTC', 'BCH'].indexOf(coinName) > -1;
    },
  },
  async created() {
    console.log();
    this.marketData = await this.getCoinMarketData();
  },

  watch: {},

  methods: {
    async getCoinMarketData() {
      const fiatSymbol = 'CNY';
      const { coinName } = this;
      const coinData = coinProfile[coinName];
      const { id } = coinData;
      const { body } = await request
        .get(`https://api.coinmarketcap.com/v2/ticker/${id}/`)
        .query({ convert: fiatSymbol });
      const marketData = body.data.quotes[fiatSymbol];
      return Object.assign(marketData, { fiatSymbol });
    },
  },
};
</script>
 <style scoped>
.item-slogan {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
.tag.is-danger {
    background-color: #91cbe9;
}
</style>
