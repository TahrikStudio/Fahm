<template>
  <div>
    <div class="nav">
      <router-link id="back" :to="{name: 'Listing', params: {sectionId: sectionId}}"><img class="icon" src="../assets/meta/back.svg"></router-link>
      <h2>
        {{playlist.title}}
      </h2>
    </div>
    <Video :title="title" :videoId="videoId" v-if="play"/>
    <h3></h3>
    <div class="videos">
      <div @click="playVideo(video)" v-bind:key="index" class="video" v-for="(video, index) in videos">
        <img :src="thumbnail(video)">
        {{video.snippet.title.split('|')[0]}}
      </div>
    </div>
    <div v-if="error" id="error" style="border: 1px solid red">
      {{error}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CONST from '../assets/script/secret.js'
import Video from './Video'

export default {
  name: 'Playlist',
  data: function () {
    return {
      play: false,
      videoId: '',
      title: false,
      videos: [],
      error: false
    }
  },
  components: {
    Video
  },
  methods: {
    playVideo: function (video) {
      this.play = true
      this.videoId = video.snippet.resourceId.videoId
      this.title = video.snippet.title
    },
    thumbnail: function (video) {
      let thumbnail = '../assets/logo/placeholder.png'
      try {
        thumbnail = video.snippet.thumbnails.medium.url
      } catch (e) {
        this.error = e
        this.error += e.error + e.message
        console.log(e)
      }
      return thumbnail
    },
    fetchChannels: function () {
      let _this = this
      axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',
          playlistId: this.playlist.playlist,
          key: CONST.AUTH_KEY,
          order: 'date',
          maxResults: 50
        }
      })
        .then(function (response) {
          let data = response.data
          _this.videos = data.items
        })
        .catch(function (error) {
          _this.error = error.stack
        })
    }
  },
  mounted: function () {
    if (this.playlist.playlist) {
      this.fetchChannels()
    }
  },
  computed: {
    playlistId () {
      return this.$route.params.playlistId
    },
    playlist () {
      var playlist = this.playlistId && this.$store.state.data.data
        ? this.$store.state.data.data.playlist[this.playlistId] : {}
      playlist.id = this.playlistId
      return playlist
    },
    sectionId () {
      if (!this.$store.state.data.index) return
      var parent = '0'
      for (var key in this.$store.state.data.index.playlists) {
        if (this.$store.state.data.index.playlists[key].indexOf(this.playlistId) > -1) {
          parent = key
          break
        }
      }
      return parent
    }
  },
  watch: {
    'playlist.playlist': function (playlist) {
      if (playlist) {
        this.fetchChannels()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videos {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: .2em;
  margin-top: 2vh
}
.video {
    background-color: white;
    padding: .5em;
    box-shadow: 1px 1px 1px #ddd;
    position: relative;
    word-break: break-all;
}
.video a {
  position: absolute;
  left: 0;
  right: 0;
  bottom: .5em;
}
.video img {
  display: block;
  margin: auto;
  max-width: 80%;
}
</style>
