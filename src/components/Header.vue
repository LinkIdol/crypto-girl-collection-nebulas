<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item"
                     :to="{ name: 'Home'}">
          <img src="/static/assets/logo.png">&nbsp;&nbsp;{{$t('LinkIdol')}}
        </router-link>

        <router-link
        v-if="me"
       class="navbar-item"
                     :to="{ name: 'Collection' }">
          我的收藏
        </router-link>

        <router-link
        v-if="me"
       class="navbar-item"
                     :to="{ name: 'LuckyDraw' }">
          立即抽卡
        </router-link>

        <router-link
        v-if="me"
       class="navbar-item"
                     :to="{ name: 'Referral' }">
          引荐计划 <strong class="tag is-black is-small"> 有佣金 </strong>
        </router-link>

        <router-link
        v-else
       class="navbar-item"
                     :to="{ name: 'Collection' }">
          怎么玩?
        </router-link>

      <!-- forgive me, just doing a crappy demo first, then we do this -->
        <!-- <router-link
       class="navbar-item"
                     :to="{ name: 'RankingList' }">
          排行榜
        </router-link> -->
        <!-- <router-link
       class="navbar-item"
                     :to="{ name: 'GirlList' }">
          {{$t('GirlList')}}
        </router-link>

        <router-link v-if="me"
            class="navbar-item"
            :to="{ name: 'LuckyDraw' }">
          {{$t('LuckyDraw')}}
        </router-link>

        <router-link v-if="me"
          class="navbar-item"
            :to="{ name: 'User', params:{address: me.address}}">
          {{$t('My Cards')}}
        </router-link>

        <router-link v-else
       class="navbar-item"
                     :to="{ name: 'Login'}">
          {{$t('Sign In')}}
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'FAQ'}">
          {{$t('FAQs')}}
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'Rank'}">
          {{$t('Ranking')}}
        </router-link> -->

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <!-- <div class="field is-grouped">
            <p class="control">
              {{network.name}}
            </p>
          </div> -->
        </div>
        <div class="navbar-item">
          <div class="field is-grouped">

            <div class="control">
              <div class="select">
                <select v-model="locale">
                  <option v-for="(item) in $config.i18n"
                          :key="item.locale"
                          :value="item.locale">
                    {{item.langDisplay}}</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>

    </nav>
    <div v-if="infos.length > 0" class="notification is-danger content" >
        <p v-for="(info,index) in infos" :key="index">{{info}}</p>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      infos: [],
    };
  },
  async created() {
    this.$store.dispatch('initLocale');
    this.$store.dispatch('FETCH_ME');


    const infos = [];
    this.infos = infos;
  },
  computed: {
    ...mapState(['me']),
    locale: {
      get() {
        const locale = this.$store.state.locale;
        const i18n = this.$config ? this.$config.i18n : [];
        const lang = i18n.find(
          item =>
            item.locale === locale ||
            item.aliases.some(alias => alias === locale),
        );
        return lang ? lang.locale : null;
      },
      set(value) {
        this.$store.dispatch('setLocale', value);
      },
    },
    me() {
      return this.$store.state.me;
    },
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #91cbe9;
  color: #fafafa !important;
}
.navbar-item {
    color: #0787c8 !important;
}
</style>
