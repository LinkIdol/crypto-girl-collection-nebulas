<template lang="pug">
  .container
    #login(v-if="!me")
      h1| 请使用 MetaMask 登录
      h3| 无法访问你的钱包接口，请登录后抽卡
    #draw(v-if="me")
            section.hero
              .hero-body
                  .container
                      h1.title| 幸运抽卡
                      h2.subtitle| 目前卡池可抽数量： {{getCardsLeft}} 张，卡牌限量，先到先得
                      h2.subtitle| 目前抽卡费 {{ getPrice }} 张，卡牌限量，先到先得
            .field.has-addons
                p.control.is-expanded
                    //- b-field(label="抽卡数量")
                    input.input.is-medium(type="text" :value="displayCount" disabled)
                p.control
                      button.button.is-success.is-medium(@click="add(10)")|+10
                p.control
                      button.button.is-danger.is-medium(@click="minus(10)")|-10
                p.control
                      button.button.is-success.is-medium(@click="add()")|+
                p.control
                      button.button.is-danger.is-medium(@click="minus()")|-
                p.control
                      button.button.is-primary.is-medium(@click="draw")| 搏一搏!
            section.hero
              .hero-body
                  .container
                      h2.subtitle| 即将耗费你
                      h1.title| {{getDisplayTotal}} NAS
                      h2.subtitle| 你确定要抽取卡牌吗
</template>

<script>
import Contract from '@/contract/linkidol';
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
      return result;
    },
  },
  computed: {
    ...mapState(['me']),
    displayCount() {
      return `${this.count} 张`;
    },
    countNasToWei() {
      return 1000000000000000000 * this.count;
    },
    getDisplayTotal() {
      return this.countNasToWei / 1000000000000000000;
    },
  },
  methods: {
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
      const result = await contract.draw();
      alert(result);
    },
  },
};
</script>
