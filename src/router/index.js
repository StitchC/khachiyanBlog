import Vue from 'vue';
import Router from 'vue-router';
import index from 'components/index/index.vue';
import article from 'components/article/article.vue';
import management from 'components/management/management.vue';
import publish from 'components/publish/publish.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/article',
          name: 'article',
          component: article
        }
      ]
    },
    {
      path: '/Management',
      name: 'Management',
      component: management,
      children: [
        {
          path: '/Management/publish',
          name: 'publish',
          component:publish
        }
      ]
    }
  ]
});
