<template>
  <!-- 卡片消息 -->
  <div class="expandCardList">
    <div class="cardListBox">
      <div class="cardList" v-for="(item, index) in cardData.messageMouldCards" :key="item.id">
        <div class="cardListT" v-if="item.fileGroupDetail.fileType == 1">
          <img :src="item.fileGroupDetail.fileUrl" alt="" />
        </div>
        <div class="cardListA" v-if="item.fileGroupDetail.fileType == 2">
          <audio :ref="'cardAudio' + index" @ended="handleEnded(index)" @loadedmetadata="handleDuration(index)" @timeupdate="handlePlaying" preload readyState>
            <source :src="item.fileGroupDetail.fileUrl" type="audio/mpeg" />
          </audio>
          <div class="audioCon">
            <img class="iamgeLeft" :src="iamgeLeftUrl" alt="" />
            {{ duration }}
            <img class="imageRight" @click="handlePlay(index)" :src="imageRightUrl" alt="" />
          </div>
        </div>
        <div class="cardListV" v-if="item.fileGroupDetail.fileType == 3">
          <video class="video" preload controls="controls" :src="item.fileGroupDetail.fileUrl"></video>
        </div>
        <div class="cardListM">
          <p>{{ item.title }}</p>
          <span>{{ item.description }}</span>
        </div>
        <div v-if="item.suggestions.length > 0">
          <div class="cardListF" v-for="(buttonItem, index) in item.suggestions" :key="index">
            <span class="btn" v-if="buttonItem.action">{{
              buttonItem.action.displayText
            }}</span>
            <span class="btn" v-if="buttonItem.reply">{{
              buttonItem.reply.displayText
            }}</span>

            <!-- <span>{{buttonItem.action.displayText }}</span> -->
            <!-- </template> -->
            <!-- <span>{{buttonItem.action.displayText }}</span> -->
            <!-- <el-button size="small">{{ buttonItem.action.displayText }}</el-button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="feilBottom" v-if="cardData.suggestions && cardData.suggestions.length > 0">
      <span v-for="(item, index) in cardData.suggestions" :key="index">
        <span class="btn" v-if="item.action">{{
          item.action.displayText
        }}</span>
        <span class="btn" v-if="item.reply">{{ item.reply.displayText }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cardList',
  props: {
    cardData: {
      type: Number | Object,
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
    handlePlay(index) {
      this.flag = !this.flag
      if (this.flag) {
        this.$refs[`cardAudio${index}`][0].play()
        this.iamgeLeftUrl = require('../assets/images/paly2_icon.gif')
        this.imageRightUrl = require('../assets/svg/pause_icon.svg')
      } else {
        this.$refs[`cardAudio${index}`][0].pause()
        this.iamgeLeftUrl = require('../assets/svg/pause2_icon.svg')
        this.imageRightUrl = require('../assets/svg/play_icon.svg')
      }
    },
    handleEnded(index) {
      this.flag = !this.flag
      this.iamgeLeftUrl = require('../assets/svg/pause2_icon.svg')
      this.imageRightUrl = require('../assets/svg/play_icon.svg')
    },
    handleDuration(index) {
      var h = Math.floor(this.$refs[`cardAudio${index}`][0].duration / 360)
      var m =
        Math.floor(this.$refs[`cardAudio${index}`][0].duration / 60) < 10
          ? '0' + Math.floor(this.$refs[`cardAudio${index}`][0].duration / 60)
          : Math.floor(this.$refs[`cardAudio${index}`][0].duration / 60)
      var s = Math.floor(this.$refs[`cardAudio${index}`][0].duration % 60)
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
  mounted() {},
}
</script>
<style lang="less" scoped>
.expandCardList {
  width: 330px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  // flex-direction: column;
  background: #fff;
  .cardListBox {
    display: flex;
    overflow-x: auto;
    background-color: #f8f8fb;
    .cardList {
      width: 328px;
      border: 1px solid #e5e5e5;
      border-top: none;
      float: left;
      flex-shrink: 0;
      border-radius: 4px;
      margin-right: 5px;
      box-sizing: border-box;
      background: #fff;
      .cardListT {
        width: 100%;
        height: 188px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cardListA {
        width: 100%;
        height: 102px;
        padding: 30px 30px 0px;
        box-sizing: border-box;
        .audioCon {
          width: 100%;
          box-sizing: border-box;
          height: 72px;
          border: 1px solid #e5e5e5;
          background: #ffffff;
          float: left;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .iamgeLeft {
            width: 24px;
            height: 24px;
            margin-left: 5px;
            cursor: pointer;
          }
          .imageRight {
            width: 24px;
            height: 24px;
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
      .cardListV {
        width: 100%;
        height: 182px;
        padding: 30px 30px 0;
        box-sizing: border-box;
        .video {
          width: 100%;
          height: 152px;
        }
        .video:focus {
          outline: none;
        }
      }
      .cardListM {
        width: 100%;
        // height: 80px;
        box-sizing: border-box;
        padding: 0 30px;
        p {
          font-size: 18px;
          margin: 14px 0;
          color: #333;
          display: -webkit-box;
          width: 100%;
          // font-size: 14px;
          // color: #999;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        span {
          display: -webkit-box;
          width: 100%;
          // height: 40px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #999;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      }
      .cardListF {
        width: 100%;
        // height: 54px;
        box-sizing: border-box;
        padding: 0 30px;
        margin-bottom: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        span {
          width: 100%;
          height: 34px;
          box-sizing: border-box;
          display: block;
          line-height: 34px;
          text-align: center;
          border: 1px solid #e5e5e5;
          border-radius: 34px;
          // padding:  0 10px;
          cursor: pointer;
        }
        .btn {
          // width: 79px;
          height: 34px;
          box-sizing: border-box;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          align-items: center;
          // line-height: 34px;
          text-align: center;
          border: 1px solid #e5e5e5;
          border-radius: 34px;
          cursor: pointer;
        }
        .btn:hover {
          color: #409eff;
          border-color: #409eff;
        }
        // .el-button {
        //   width: 100%;
        // }
      }
      .el-button + .el-button {
        margin-left: 0;
      }
      .el-button--mini,
      .el-button--small {
        border-radius: 16px;
      }
    }
    .cardList:nth-last-of-type(1) {
      border-right: none;
      margin-right: 0;
    }
    .cardList:nth-of-type(1) {
      border-left: none;
    }
  }
  .feilBottom {
    width: 268px;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    border-top: 1px solid #e5e5e5;
    border-top: none;
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
