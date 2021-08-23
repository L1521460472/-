<template>
<!-- 数字增长动效组件 -->
  <div class="listMain">
    <span ref="numberGrow" :time="time" :value="value" :vaildNumber="vaildNumber">{{value}}</span>
    <slot class="unit" name="unit"></slot>
  </div>
</template>
<script>
export default {
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 0
    },
    vaildNumber: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {
    numberGrow(ele) {
      const that = this
      let step = (this.value *100) / (this.time *1000)   // 每次增加的步长
      let current = 0   // 当前的值
      let start = 0    // 初始值
      let timer = setInterval(function(){
        start += step
        if (start >= that.value) {
          clearInterval(timer)
          start = that.value
          timer = null
        }
        if (current == start) {
          return
        }
        current = start
        if (that.vaildNumber) {
          ele.innerHTML = current.toFixed(4).toString()
        } else {
          ele.innerHTML = current.toFixed().toString()
        }
        // ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
      }, 10)
    }
  },
  mounted() {
    // this.numberGrow(this.$refs.numberGrow)
  },
  watch: {
    value() {
      this.numberGrow(this.$refs.numberGrow)
    }
  }
}
</script>
<style>
.listMain
  {
    font-size: 32px;
    line-height: 50px;
  }
  .listMain .unit {
    font-size: 20px;
    color: #666666;
  }
</style>
