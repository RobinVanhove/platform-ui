/**
 * Copyright (c) 2020-2023 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login'),
    },
    {
      path: '/logout',
      name: 'logout',
    },
    {
      path: '/service/:tree',
      name: 'service',
      component: () => import('@/views/Login'),
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: () => import(/* webpackChunkName: "forbidden" */ '@/views/Forbidden'),
    },
    {
      // send any bad routes to default login
      path: '*',
      redirect: '/',
    },
  ],
});
