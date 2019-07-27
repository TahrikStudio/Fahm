import Vue from 'vue'
import Router from 'vue-router'
import Listing from '@/components/Listing'
import Update from '@/components/Update'
import Playlist from '@/components/Playlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:sectionId?',
      name: 'Listing',
      component: Listing
    },
    {
      path: '/playlist/:playlistId?',
      name: 'Playlist',
      component: Playlist
    },
    {
      path: '/update',
      name: 'Update',
      component: Update
    }
  ]
})
