/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins 引入這個專案的東西

import vuetify from './vuetify'
import pinia from '../store' // 狀態管理的東西
import router from '../router' // 路由

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
}
