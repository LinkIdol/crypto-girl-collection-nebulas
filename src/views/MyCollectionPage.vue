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
        @click="gotoCoinProfile(item.tokenId)">
          <CardItem :item='item' :hasMouseOver='true'></CardItem>
          <!-- <div class="haveCount">
            <a :style="{ color: item.textcolor }">拥有{{ item.havecount }}张</a>
          </div> -->
        </div>
      </div>
    </section>

</div>
</template>

<script>
import { mapState } from 'vuex';
import NasId from '@/contract/nasid';
import LinkIdol from '@/contract/linkidol';
import CardItem from '@/components/CardItem';
import Profiles from '../cards/cards.json';

export default {
  name: 'MyCollectionPage',
  components: {
    CardItem,
  },
  asyncComputed: {
    async profile() {
      const nasId = new NasId();
      const result = await nasId.fetchAccountDetail(this.address);
      return result;
    },
    async cardsInfo() {
      const idol = new LinkIdol();
      const result = await idol.getCardsByAddress(this.address);
      return result.map((card) => {
        const profile = Profiles[card.heroId];
        return Object.assign(card, profile);
      });
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

.cardItem {
  position: relative;
}
.haveCount {
  position:absolute;
  bottom: 70px;
  left: 30px;
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

