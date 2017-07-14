<template>
  <div class="content-wrapper">
    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="80" tablet="80" desktop="40" style="text-align: center;">
        <mu-paper class="big-paper" circle :zDepth="5" >
          <h1 class="mu-paper-h1-big" @click="switchChange(!isRun)">{{drawNum}}</h1>
        </mu-paper>
      </mu-col>
      <mu-col width="20" tablet="20" desktop="20" style="margin-top: 180px;">
        <mu-switch v-model="isRun" class="demo-switch" @change="switchChange"/>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="10"></mu-col>
      <mu-col width="33" tablet="33" desktop="26" style="text-align: center;">
        <mu-paper class="small-paper" :class="{ editColor: minShow }" circle :zDepth="5"">
          <p>设置:min</p>
          <h1 class="mu-paper-h1" @click="setNum('min')">{{min}}</h1>
        </mu-paper>
      </mu-col>
      <mu-col width="33" tablet="33" desktop="26" style="text-align: center;">
        <mu-paper class="small-paper" :class="{ editColor: maxShow }" circle :zDepth="5" >
          <p>设置:max</p>
          <h1 class="mu-paper-h1" @click="setNum('max')">{{max}}</h1>
        </mu-paper>
      </mu-col>
      <mu-col width="33" tablet="33" desktop="26" style="text-align: center;">
        <mu-paper class="small-paper" :class="{ editColor: frequencyShow }" circle :zDepth="5" >
          <p>设置:频率</p>
          <h1 class="mu-paper-h1" @click="setNum('frequency')">{{frequency}}</h1>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="10"></mu-col>
    </mu-row>

    <transition name="abc">
      <mu-row gutter v-show="minShow" class="abc">
        <mu-col width="0" tablet="0" desktop="20"></mu-col>
        <mu-col width="100" tablet="100" desktop="60">
          <p>最小值</p>
          <mu-slider v-model="min" :step="1" :min="1" :max="max"/>
        </mu-col>
        <mu-col width="0" tablet="0" desktop="20"></mu-col>
      </mu-row>
    </transition>

    <transition name="abc">
      <mu-row gutter v-show="maxShow" class="abc">
        <mu-col width="0" tablet="0" desktop="20"></mu-col>
        <mu-col width="100" tablet="100" desktop="60">
          <p>最大值</p>
          <mu-slider v-model="max" :step="1" :min="min" :max="200"/>
        </mu-col>
        <mu-col width="0" tablet="0" desktop="20"></mu-col>
      </mu-row>
    </transition>

    <transition name="abc">
      <mu-row gutter v-show="frequencyShow" class="abc">
        <mu-col width="0" tablet="0" desktop="20"></mu-col>
        <mu-col width="100" tablet="100" desktop="60">
          <p>频率: {{frequency}}</p>
          <mu-slider v-model="frequency" :step="10" :min="20" :max="500"/>
        </mu-col>
        <mu-col width="0" tablet="0" desktop="20"></mu-col>
      </mu-row>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawNum: 'start',
      min: 1,
      max: 100,
      frequency: 20,
      minShow: false,
      maxShow: false,
      frequencyShow: false,
      isRun: false,
      interval: null
    }
  },
  created () {
  },
  computed: {

  },
  watch: {
    isRun (value) {
      if (value) {
        this.fstart()
      } else {
        this.fstop()
      }
    },
    frequency (value) {
      if (this.isRun) {
        this.fstart()
      }
    }
  },
  methods: {
    cal () {
      this.drawNum = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
    },
    fstart () {
      this.fstop()
      this.interval = setInterval(this.cal, this.frequency)
    },
    fstop () {
      clearInterval(this.interval)
      this.interval = null
    },
    setNum (type) {
      if (type === 'min') {
        this.maxShow = false
        this.frequencyShow = false
        this.minShow = !this.minShow
      } else if (type === 'max') {
        this.minShow = false
        this.frequencyShow = false
        this.maxShow = !this.maxShow
      } else if (type === 'frequency') {
        this.minShow = false
        this.maxShow = false
        this.frequencyShow = !this.frequencyShow
      }
    },
    switchChange (val) {
      if (val) {
        this.isRun = true
      } else {
        this.isRun = false
      }
    },
    changeImg () {
      var n = Math.floor(Math.random() * 10)
      if (n > 5) {
        n -= 5
      }
      var a = ['🐳', '🍤', '🐷️', '🐽', '🏀', '🌹']
      this.drawNum = a[n]
    }
  },
  components: {

  },
  locales: {

  }
}
</script>

<style lang="css">
  .mu-slider {}
  .small-paper {
    display: inline-block;
    height: 80px;
    width: 80px;
    margin: 20px;
    text-align: center;
  }
  .big-paper {
    display: inline-block;
    height: 200px;
    width: 200px;
    text-align: center;
  }
  .mu-paper-h1 {
    font-size: 2em;
    margin: -0.48em 0;
  }
  .mu-paper-h1-big {
    font-size: 6em;
    margin: 0.52em 0;
  }
  .demo-switch {
    margin-bottom: 16px;
  }
  .editColor {
    background: #f0f4c3;
  }

  .abc-enter-active,
  .abc-leave-active{
    transition: transform .5s cubic-bezier(0.23, 1, 0.32, 1);
    backface-visibility: hidden;
  }

  .abc-enter,
  .abc-leave-active{
    transform: translate3d(0, 100%, 0);
  }
</style>
