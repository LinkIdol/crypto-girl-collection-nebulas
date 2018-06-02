<template lang="pug">
    #referral(v-if="!getReferrer")
        section.hero.is-medium
            .hero-body
                .container
                    h1.title| 邀请好友 Referral
                    h2.subtitle| 推荐好友玩 Link Idol 可获得 5% 消费额的奖励!
                    .field.has-addons
                        label.label|你的邀请链接:
                        .control.is-expanded
                            input.input(type="text" :value="myRefferalLink" disabled)
                        .control
                            button.button.is-success(:data-clipboard-text="myRefferalLink")| 复制链接
    #referral(v-else)
        section.hero.is-medium
            .hero-body
                .container
                    h1.title| 欢迎来到 Link Idol <strong class="tag is-black is-medium">星云链服</strong>
                    h2.subtitle| 你的好友 {{getReferrer}} 推荐你来玩 Link Idol
                    router-link(:to="toHomePageParam"
                    class="button is-large is-primary is-rounded")| 立马游玩


</template>

<script>
import { mapState } from 'vuex';
import Clipboard from 'clipboard';

export default {
  created() {
    const clipboard = new Clipboard('.button');
    clipboard.on('success', (e) => {
      e.clearSelection();
    });
  },
  computed: {
    ...mapState({
      myAddress: state => state.me,
    }),
    getReferrer() {
      return this.$route.params.address;
    },
    toHomePageParam() {
      const referrer = this.getReferrer;
      return { name: 'HomePage', params: { referrer } };
    },
    myRefferalLink() {
      const website = 'http://nas.linkidol.pro/#/';
      if (this.myAddress) {
        return `${website}referral/${this.myAddress}`;
      }
      return '请安装钱包插件再来';
    },
  },
};
</script>
