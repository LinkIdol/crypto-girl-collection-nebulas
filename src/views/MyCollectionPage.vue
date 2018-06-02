<template>
<div>

<section>
  <div class="userContainer" v-if="!profile">
    <div class="usercontent">
      <h2 class="title">Loading Profile, please wait
      </h2>
    </div>
  </div>
  <div class="userContainer" v-else>
    <div class="usericon" >
        <img class="iconimg" alt="" width="100" :src="profile.avatar"/>
      </div>
      <div class="usercontent">
        <h2 class="title"> {{profile.nickname}} 的收藏 </h2>
        <p class="useraddress"> 钱包地址 {{address}}</p>
      </div>
    </div>
    </section>

  <section>
      <div class="columns is-multiline is-mobile section2div">
        <div class="column is-4-desktop is-4-tablet is-12-mobile cardItem"
        v-for="item in cardsInfo" :key="item.cmcId"
        @click="gotoCoinProfile(item.code)">
          <img class="cardItemImg" alt="" :src="item.card"/>
          <div :style="{ backgroundColor: item.color, height: '50px' }">
            <span>
            <a :style="{ lineHeight: '50px', color: item.textcolor, paddingLeft: '20px' }">
              {{ $t(`coin.name.${item.fullname}`) }} {{ item.code }}</a>
          </span>
          <span class="priceSpan">
              <a :style="{ lineHeight: '50px', color: item.textcolor }">
                市价: {{ item.price }} USD</a>
          </span>
          </div>
        </div>
      </div>
    </section>

</div>
</template>

<script>
import { mapState } from 'vuex';
import NasId from '@/contract/nasid';
import LinkIdol from '@/contract/linkidol';

export default {
  name: 'MyCollectionPage',
  data: () => ({
    items: [],
    itemIds: [],
  }),
  // async created() {

  // },
  asyncComputed: {
    async profile() {
      const nasId = new NasId();
      const result = await nasId.fetchAccountDetail(this.address);
      return result;
    },
    async cardsInfo() {
      const idol = new LinkIdol();
      const result = await idol.getCardsInfoByAddress(this.address);
      return result;
    },
  },
  methods: {
    gotoCoinProfile(code) {
      this.$router.push({ path: `/coin/${code}` });
    },
  },
  computed: {
    ...mapState({
      me: state => state.me,
    }),
    address() {
      return this.$route.params.address || this.me;
    },
  },
  mounted() {
    this.$http.get('static/girl_cards.json').then((response) => {
      this.itemIds = response.body;
    });
  },
};
</script>

<style scoped>
/*
  section 1
*/
.userContainer {
  background-image: url("https://o28677qxx.qnssl.com/2018-06-01-collection_bk.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #fff;
  width: 100%;
  /*padding-top: 43.5%;*/
  padding-top: 28%;
  position: relative;
  text-align: center;
}
.usericon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 60px;
}
.iconimg{
  border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.usercontent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding-top: 15%;
}
.useraddress {
  color: #08567e;
}

/*
  section 2
*/
.section2div {
  padding-right: 50px;
  padding-left: 50px;
  padding-top: 30px;
  padding-bottom: 50px;
}
.cardItemImg{
  vertical-align:bottom;
  cursor: pointer;
}
.priceSpan {
  float:right;
  padding-right: 20px;
}

@media (max-width: 800px) {
  .cardContainer {
    background-size: cover;
    padding-top: 60%;
  }
  .charaimg{
    width: 100%;
  }
  .btnContainer {
    padding-top: 50%;
  }

  .section2div {
    padding-top: 100px;
  }
  .cardItemImg{
    width: 100%;
  }
}
</style>

