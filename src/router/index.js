import Vue from 'vue';
import Router from 'vue-router';
// import ItemView from '@/views/ItemView';
// import ListView from '@/views/ListView';
// import LoginView from '@/views/LoginView';
import FaqView from '@/views/FaqView';
// import UserView from '@/views/UserView';
import TermView from '@/views/TermView';
import PrivacyView from '@/views/PrivacyView';
import LuckyDraw from '@/views/LuckyDraw';
import CoinProfile from '@/views/CoinProfile';

import ReferralView from '@/views/Referral';
import HomePage from '@/views/HomePage';
import MyCollectionPage from '@/views/MyCollectionPage';

import RankingList from '@/views/RankingList';
import CoinGirl from '@/views/CoinGirl';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: HomePage,
    },
    {
      name: 'LuckyDraw',
      path: '/draw',
      component: LuckyDraw,
    },
    {
      name: 'CoinGirl',
      path: '/coin/:name',
      component: CoinGirl,
    },
    {
      name: 'ReferralTo',
      path: '/referral/:address',
      component: ReferralView,
    },
    {
      name: 'Referral',
      path: '/referral/',
      component: ReferralView,
    },
    {
      name: 'Collection',
      path: '/collection',
      component: MyCollectionPage,
    },
    {
      name: 'Collection',
      path: '/collection/:address',
      component: MyCollectionPage,
    },
    {
      name: 'RankingList',
      path: '/RankingList',
      component: RankingList,
    },
    {
      name: 'FAQ',
      path: '/faq',
      component: FaqView,
    },
    {
      name: 'Privacy',
      path: '/privacy-policy',
      component: PrivacyView,
    },
    {
      name: 'Term',
      path: '/terms-of-us',
      component: TermView,
    },
  ],
});
