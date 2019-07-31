<template>
  <div>
    <div class="nav">
      <router-link v-if="parentId" id="back" :to="{name: 'Listing', params: {sectionId: parentId}}"><img class="icon" src="../assets/meta/back.svg"></router-link>
      <a v-else><img class="icon" src="../assets/meta/back-disabled.svg"></a>
      <h2 v-if="parentId">{{section.title}}</h2>
      <h2 v-else>Menu</h2>
    </div>
    <div class="sections" v-if="sections.length">
      <router-link v-bind:key="index" v-for="(section, index) in sections" :to="{name: 'Listing', params: {sectionId: section.id}}">
      <div class="section">
          <img v-if="section.image" :src="section.image">
          <img v-else src="../assets/meta/generic-icon.png">
          <br/>
          <span>{{section.title}}</span>
      </div>
      </router-link>
    </div>
    <div class="categories" v-if="playlists.length">
      <div v-bind:key="index" class="category" v-for="(playlist, index) in playlists">
        <router-link :to="{name: 'Playlist', params: {playlistId: playlist.id}}">
          {{playlist.title}}
        </router-link>
      </div>
    </div>
    <div v-if="isMainMenu" class="categories">
      <div class="category">
        <router-link :to="{name: 'Update'}">
          <img class="icon" src="../assets/meta/cloud.svg">Check for Update
        </router-link>
      </div>
      <div class="category">
        <a @click="openRateDialog"><img class="icon" src="../assets/meta/star.svg">Rate Us</a>
      </div>
      <div class="category">
        <a @click="exitApp"><img class="icon" src="../assets/meta/exit.svg">Exit</a>
      </div>
    </div>
  </div>
</template>

<script>
import {openRateDialog} from '../assets/script/rating.js'
export default {
  name: 'Listing',
  mounted: function () {
    if (window.plugins) window.plugins.insomnia.allowSleepAgain()
  },
  computed: {
    storeData () {
      return this.$store.state.data
    },
    sectionId: function () {
      return this.$route.params.sectionId ? this.$route.params.sectionId : '0'
    },
    section: function () {
      if (!this.storeData.data) return
      return this.storeData.data.section[this.sectionId]
    },
    sections: function () {
      if (!this.storeData.index) return
      var sectionIds = this.storeData.index.sections[this.sectionId] || []
      var sections = []
      for (var i = 0; i < sectionIds.length; i++) {
        var section = this.storeData.data.section[sectionIds[i]]
        section.id = sectionIds[i]
        sections.push(section)
      }
      return sections
    },
    playlists: function () {
      if (!this.storeData.index) return
      var playlistIds = this.storeData.index.playlists[this.sectionId] || []
      var playlists = []
      for (var i = 0; i < playlistIds.length; i++) {
        var playlist = this.storeData.data.playlist[playlistIds[i]]
        playlist.id = playlistIds[i]
        playlists.push(playlist)
      }
      return playlists
    },
    isMainMenu: function () {
      return this.$route.path === '/' || this.$route.path === '/0'
    },
    parentId: function () {
      if (!this.storeData.index) return
      var parentId
      for (var key in this.$store.state.data.index.sections) {
        if (this.$store.state.data.index.sections[key].indexOf(this.sectionId) > -1) {
          parentId = key
          break
        }
      }
      return parentId
    }
  },
  methods: {
    exitApp: function () {
      if (navigator.app) {
        navigator.app.exitApp()
      } else if (navigator.device) {
        navigator.device.exitApp()
      } else {
        window.close()
      }
    },
    openRateDialog: function () {
      openRateDialog()
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.categories {
  margin-top: 5vh;
}
.category a{
  padding: 1em 1em;
  display: block;
  margin: .2em 1em;
  background: white;
  color: black;
  cursor: pointer;
  text-align: left;
  text-transform: uppercase;
  box-shadow: 1px 1px 1px 1px #eee;
}
hr {
  border: none;
  margin-bottom: 2em;
}
.sections {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .2em;
  margin: 1rem;
}
.section {
    background-color: white;
    padding: .5em;
    box-shadow: 1px 1px 1px #ddd;
    position: relative;
    height: 7rem;
    word-break: break-word
}
.section span {
  position: absolute;
  left: 0;
  right: 0;
  bottom: .5em;
}
.section img {
  display: block;
  margin: auto;
  max-width: 80%;
  max-height: 84px;
}
</style>
