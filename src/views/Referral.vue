<template lang="pug">
    // Please learn the pug(jade) syntax before you edit this file!
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
                    h1.title| 分享到社交网络
                    .buttons
                      // a.button.is-large.is-circle(href="" target="_blank")
                      //   span.icon.is-medium
                      //     i.iconfont.icon-wechat
                      a.button.is-large.is-circle(:href="getFB" target="_blank")
                        span.icon.is-medium
                          i.iconfont.icon-Facebook
                      a.button.is-large.is-circle(:href="getTwitter" target="_blank")
                        span.icon.is-medium
                          i.iconfont.icon-twitter
                      a.button.is-large.is-circle(:href="getWeibo" target="_blank")
                        span.icon.is-medium
                          i.iconfont.icon-weibo
                      // a.button.is-large.is-circle(href="" target="_blank")
                      //   span.icon.is-medium
                      //     i.iconfont.icon-qq
                      a.button.is-large.is-circle(:href="getLine" target="_blank")
                        span.icon.is-medium
                          i.iconfont.icon-line
                      a.button.is-large.is-circle(@click="openBarcode = !openBarcode")
                        span.icon.is-medium
                          i.iconfont.icon-barcode
                      button.button.is-large.is-circle(:data-clipboard-text="myRefferalLink")
                        span.icon.is-medium
                          i.iconfont.icon-link
                    article.message.is-dark(v-show="openBarcode")
                      .message-header| 你的分享邀请码
                      .message-body
                        img(:src="generateQrCode")
    #referral(v-else)
        section.hero.is-medium
            .hero-body
                .container
                    h1.title| 欢迎来到 Link Idol <strong class="tag is-black is-medium">星云链服</strong>
                    h2.subtitle| 你的好友 {{getReferrer}} 推荐你来玩 Link Idol
                    router-link(:to="toHomePageParam"
                    class="button is-large is-primary is-circle")| 立马游玩


</template>

<script>
import { mapState } from 'vuex';
import Clipboard from 'clipboard';
import QRCode from 'qrcode';


export default {
  data: () => ({
    openBarcode: false,
  }),
  created() {
    const clipboard = new Clipboard('.button');
    clipboard.on('success', (e) => {
      e.clearSelection();
    });
  },
  asyncComputed: {
    async generateQrCode() {
      const { myRefferalLink } = this;
      const uri = await QRCode.toDataURL(myRefferalLink);
      return uri;
    },
  },

  computed: {
    ...mapState({
      myAddress: state => state.me,
    }),
    toHomePageParam() {
      const referrer = this.getReferrer;
      return { name: 'HomePage', params: { referrer } };
    },
    myRefferalLink() {
      const website = 'http://nas.linkidol.pro/#';
      if (this.myAddress) {
        return `${website}/draw/${this.myAddress}`;
      }
      return '无法检测到你的地址，请安装钱包插件再来';
    },
    getSafeLink() {
      return encodeURIComponent(this.myRefferalLink);
    },
    getFB() {
      const { getSafeLink } = this;
      return `https://www.facebook.com/sharer/sharer.php?u=${getSafeLink}`;
    },
    getLine() {
      const { getSafeLink } = this;
      return `https://social-plugins.line.me/lineit/share?url=${getSafeLink}`;
    },
    getTwitter() {
      const { getSafeLink } = this;
      const shareStr = `我在玩 LinkIdol, 要来一发吗？ ${getSafeLink}`;
      return `https://twitter.com/intent/tweet?text=${shareStr}`;
    },
    getWeibo() {
      const { getSafeLink } = this;
      const shareStr = `我在玩 LinkIdol, 要来一发吗？ ${getSafeLink}`;
      return `http://service.weibo.com/share/share.php?title=${shareStr}`;
    },
  },
  methods: {

  },
};
</script>

<style scoped>
@import url('https://at.alicdn.com/t/font_691860_lc6g5xabd7mygb9.css');

.is-circle {
  border-radius: 100% !important;
}

.iconfont {
  font-size: 2.5rem;
}
</style>

