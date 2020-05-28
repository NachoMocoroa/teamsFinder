import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { store } from './store/store';
import '@/assets/css/tailwind.css';
import '@/assets/css/styles.css';

import ListView from './components/ListView.vue';
import FavoritesView from './components/FavoritesView.vue';
import TeamView from './components/TeamView.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: ListView },
  { path: '/teams/:conference?', component: ListView },
  { path: '/favorites', component: FavoritesView },
  { path: '/team/:id', name: 'team', component: TeamView }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
