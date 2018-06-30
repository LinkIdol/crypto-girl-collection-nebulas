<template lang="pug">
  .containera
    #login(v-if="!me")
      h1| 请使用 MetaMask 登录
      h3| 无法访问你的钱包接口，请登录后抽卡
    #draw(v-if="me")
            section.hero.head
              .hero-body
                  .container
                      h1.title| 幸运抽卡
                      h2.subtitle| 目前卡池可抽数量： {{getCardsLeft}} 张，卡牌限量，先到先得
                      h2.subtitle| 目前抽卡费
                      h1.title| {{ getPrice }} NAS / 张
            .container
                .buttons(style="width: 18rem")
                  a.button.is-primary(@click="setQty(1)")|抽 1 张
                  a.button.is-primary(@click="setQty(3)")|抽 3 张
                  a.button.is-primary(@click="setQty(6)")|抽 6 张
                  a.button.is-primary(@click="setQty(9)")|抽 9 张
                  a.button.is-primary(@click="setQty(12)")|抽 12 张
                  a.button.is-primary(@click="setQty(16)")|抽 16 张
                  a.button.is-primary(@click="setQty(20)")|抽 20 张
                  a.button.is-primary(@click="setQty(120)")|抽 120 张
                  a.button.is-primary(@click="setQty(1024)")|抽 1024 张
            //- .container
              .columns
                .column
                  section.hero
                    .hero-body
                        .containers
                            h2.subtitle| 即将耗费你
                            h1.title| {{getDisplayTotal}} NAS
                            h2.subtitle| 你确定要抽取卡牌吗
                .column
                      button.button.is-primary.is-large(@click="draw")| 搏一搏!

</template>

<script>
import Contract from '@/contract/linkidol';
import { BigNumber } from 'bignumber.js';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      count: 0,
    };
  },
  asyncComputed: {
    async getCardsLeft() {
      const contract = new Contract();
      const result = await contract.getCardsLeft();
      return result;
    },
    async getPrice() {
      const contract = new Contract();
      const result = await contract.getPrice();
      return new BigNumber(result).div(1000000000000000000).toString();
    },
  },
  computed: {
    ...mapState(['me']),
    displayCount() {
      return `${this.count} 张`;
    },
    getDisplayTotal() {
      // return new BigNumber(this.getPrice).times(this.count).toNumber();
      const d = new BigNumber(0.00001); // for mainnet
      // const d = new BigNumber(0.00000000000000001); // for testnet
      const a0 = new BigNumber(this.getPrice);
      const n = new BigNumber(this.count);
      return a0.times(n).plus((n.minus(1)).times(n).times(d).div(2));
    },
  },
  methods: {
    setQty(qty) {
      this.count = qty;
      this.draw();
    },
    add(time = 1) {
      this.count += time;
    },
    minus(time = 1) {
      if (this.count > 0) {
        this.count -= time;
      }
    },
    async draw() {
      const contract = new Contract();
      const result = await contract.draw(undefined, this.getDisplayTotal);
      alert(result);
    },
  },
};
</script>

<style scoped>
.head {
    background:  url('https://o28677qxx.qnssl.com/2018-06-01-ranking-background.png');
}
.buttons {
    margin: 1rem;
}
</style>
