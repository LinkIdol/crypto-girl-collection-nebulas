<template>
  <div>
    <!-- rewrite -->
    <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="getAvatar" alt="Identicon" style="border-radius: 50%;">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4"> {{$t('User')}}: {{address}} </p>
        <p class="subtitle is-6">的卡片</p>
        <p class="subtitle is-6"><a class="button" :href="getEtherScanURL"> 查看TA的交易记录 </a></p>
      </div>
    </div>

      </div>
    </div>
    <!-- end of rewrite -->
    <div class="tabs">
      <ul>
        <li class="is-active">
          <a v-if="me && me.address.toUpperCase() === address">{{$t('My Cards')}}</a>
          <a v-else>{{$t('His Cards')}}</a>
        </li>
      </ul>
    </div>
    <ItemList :itemIds='itemIds' />
  </div>
</template>

<script>
import ItemList from '@/components/ItemList';
import getAvatarFromAddress from 'dravatar';

export default {
  name: 'UserView',
  components: {
    ItemList,
  },
  data: () => ({
    itemIds: [],
    contract: null,
  }),
  asyncComputed: {
    async getAvatar() {
      const uri = await getAvatarFromAddress(this.address);
      return uri;
    },
  },
  computed: {
    address() {
      return this.$route.params.address;
    },
    getEtherScanURL() {
      return `https://etherscan.io/address/${this.address}`;
    },
    me() {
      return this.$store.state.me;
    },
  },
  async created() {
    this.contract = {};
    await this.contract.initialize();
    this.itemIds = await this.fetchItems();
  },

  watch: {},

  methods: {
    async fetchItems() {
      const items = await this.contract.getItemsOf(this.$route.params.address);
      return items;
    },
  },
};
</script>
<style scoped>
.user-info-wrapper {
  border-radius: 5px;
}
</style>

