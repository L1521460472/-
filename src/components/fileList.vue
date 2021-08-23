<template>
  <!-- 文件消息 -->
  <div>
    <div id="fileList" v-if="fileData.fileGroupDetail">
      <div class="feilTop" v-if="fileData.fileGroupDetail.fileType == 1">
        <img class="picture" :src="fileData.fileGroupDetail.fileUrl" />
      </div>
      <div class="feilTop" v-if="fileData.fileGroupDetail.fileType == 2">
        <!-- <audio ref="audio" preload readyState>
          <source :src="fileData.fileGroupDetail.fileUrl" type="audio/mpeg"/>
        </audio> -->
        <audio ref="audio" @ended="handleEnded" @loadedmetadata="handleDuration" @timeupdate="handlePlaying" preload readyState>
          <source :src="fileData.fileGroupDetail.fileUrl" type="audio/mpeg" />
        </audio>
        <div class="audioCon">
          <img class="iamgeLeft" :src="iamgeLeftUrl" alt="" />
          {{ duration }}
          <img class="imageRight" @click="handlePlay" :src="imageRightUrl" alt="" />
        </div>
      </div>
      <div class="feilTop" v-if="fileData.fileGroupDetail.fileType == 3">
        <video class="video" preload controls="controls" :src="fileData.fileGroupDetail.fileUrl"></video>
      </div>
      <div class="feilBottom" v-if="fileData.suggestions && fileData.suggestions.length > 0">
        <span v-for="(item, index) in fileData.suggestions" :key="index">
          <span class="btn" v-if="item.action">{{
            item.action.displayText
          }}</span>
          <span class="btn" v-if="item.reply">{{
            item.reply.displayText
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fileList',
  props: {
    fileData: {
      type: Object,
    },
  },
  data() {
    return {
      iamgeLeftUrl: require('../assets/svg/pause2_icon.svg'),
      imageRightUrl: require('../assets/svg/play_icon.svg'),
      duration: '00:00', //音频时长
      currentTime: '0:00',
    }
  },
  methods: {
    // 音频播放
    handlePlay() {
      this.flag = !this.flag
      if (this.flag) {
        this.$refs.audio.play()
        this.iamgeLeftUrl = require('../assets/images/paly2_icon.gif')
        this.imageRightUrl = require('../assets/svg/pause_icon.svg')
      } else {
        this.$refs.audio.pause()
        this.iamgeLeftUrl = require('../assets/svg/pause2_icon.svg')
        this.imageRightUrl = require('../assets/svg/play_icon.svg')
      }
    },
    handleEnded() {
      this.flag = !this.flag
      this.iamgeLeftUrl = require('../assets/svg/pause2_icon.svg')
      this.imageRightUrl = require('../assets/svg/play_icon.svg')
    },
    handleDuration() {
      var h = Math.floor(this.$refs.audio.duration / 360)
      var m =
        Math.floor(this.$refs.audio.duration / 60) < 10
          ? '0' + Math.floor(this.$refs.audio.duration / 60)
          : Math.floor(this.$refs.audio.duration / 60)
      var s = Math.floor(this.$refs.audio.duration % 60)
      var str = h > 0 ? h + ':' + m + ':' + s : m + ':' + s
      this.duration = str
    },
    handlePlaying(e) {
      var h = Math.floor(e.target.currentTime / 360)
      var m =
        Math.floor(e.target.currentTime / 60) < 10
          ? '0' + Math.floor(e.target.currentTime / 60)
          : Math.floor(e.target.currentTime / 60)
      var s =
        Math.floor(e.target.currentTime % 60) < 10
          ? '0' + Math.floor(e.target.currentTime % 60)
          : Math.floor(e.target.currentTime % 60)
      var str = h > 0 ? h + ':' + m + ':' + s : m + ':' + s
      this.currentTime = str
    },
  },
}
</script>

<style lang="less" scoped>
#fileList {
  width: 330px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 0 30px;
  box-sizing: border-box;
  .feilTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px;
    .audioCon {
      width: 100%;
      height: 72px;
      border: 1px solid #e5e5e5;
      background: #ffffff;
      float: left;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .iamgeLeft {
        margin-left: 5px;
        cursor: pointer;
      }
      .imageRight {
        margin-right: 5px;
        cursor: pointer;
      }
    }
    .picture {
      width: 270px;
    }
    .video {
      width: 270px;
      height: 152px;
    }
    .video:focus {
      outline: none;
    }
  }
  .feilBottom {
    width: 268px;
    padding: 20px 0;
    border-top: 1px solid #e5e5e5;
    white-space: nowrap;
    overflow-x: auto;
    .btn {
      width: fit-content;
      height: 34px;
      display: inline-block;
      line-height: 34px;
      text-align: center;
      border: 1px solid #e5e5e5;
      border-radius: 34px;
      margin-right: 16px;
      padding: 0 10px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .btn:hover {
      color: #409eff;
      border-color: #409eff;
    }
    .btn:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
</style>
