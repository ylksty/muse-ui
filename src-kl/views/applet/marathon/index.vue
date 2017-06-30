<template>
  <div class="content-wrapper">
    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="34" desktop="20">单位</mu-col>
      <mu-col width="33" tablet="33" desktop="20">数值</mu-col>
      <mu-col width="33" tablet="33" desktop="20">步数</mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="33" desktop="20">1公里</mu-col>
      <mu-col width="33" tablet="33" desktop="20">
        {{kmCom}}
      </mu-col>
      <mu-col width="33" tablet="33" desktop="20">{{stepkmCom}}</mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="33" desktop="20">10km</mu-col>
      <mu-col width="33" tablet="33" desktop="20">
        {{tenkmCom}}
      </mu-col>
      <mu-col width="33" tablet="33" desktop="20">{{steptenkmCom}}</mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="33" desktop="20">半马</mu-col>
      <mu-col width="33" tablet="33" desktop="20">
        {{halfkmCom}}
      </mu-col>
      <mu-col width="33" tablet="33" desktop="20">{{stephalfkmCom}}</mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="33" desktop="20">全马</mu-col>
      <mu-col width="33" tablet="33" desktop="20">
        {{fullkmCom}}
      </mu-col>
      <mu-col width="33" tablet="33" desktop="20">{{stepfullkmCom}}</mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="100" tablet="100" desktop="60">
        <p>分钟 {{min}}<mu-slider v-model="min" :step="1" :max="10"/></p>
        <p>秒 {{sec}}<mu-slider v-model="sec" :step="1" :max="59"/></p>
        <p>步频 {{cadence}}<mu-slider v-model="cadence" :step="1" :min="100" :max="200"/></p>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="33" desktop="20">m/秒</mu-col>
      <mu-col width="33" tablet="33" desktop="20">
        {{msCom}}
      </mu-col>
      <mu-col width="33" tablet="33" desktop="20"></mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="33" desktop="20">km/h</mu-col>
      <mu-col width="33" tablet="33" desktop="20">
        {{nkmCom}}
      </mu-col>
      <mu-col width="33" tablet="33" desktop="20"></mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="33" tablet="33" desktop="20">歩幅</mu-col>
      <mu-col width="66" tablet="66" desktop="40">
        {{bufuCom}} cm
      </mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      const: {
        KM: 1000,
        TEN_KM: 10000,
        HALF_MARATHON: 21092,
        FULL_MARATHON: 42193
      },
      seckm: 292,
      min: 0,
      sec: 0,
      cadence: 185
    }
  },
  created () {
    this.min = this.secondsPart(this.seckm, 'min')
    this.sec = this.secondsPart(this.seckm, 'seconds')
  },
  computed: {
    secShow: function () {
      var l = this.sec + ''
      return (l.length === 1) ? '0' + this.sec : this.sec
    },
    kmCom: function () {
      return this.secondsToMin(this.seckm)
    },
    msCom: function () {
      return Math.round(this.const.KM * 100 / this.seckm) / 100
    },
    nkmCom: function () { // 公里每小时
      return Math.round(3600 * 100 / this.seckm) / 100
    },
    tenkmCom: function () {
      return this.secondsToMin(this.seckm * 10)
    },
    halfkmCom: function () {
      return this.secondsToMin(this.seckm * this.const.HALF_MARATHON / this.const.KM)
    },
    fullkmCom: function () {
      return this.secondsToMin(this.seckm * this.const.FULL_MARATHON / this.const.KM)
    },
    bufuCom: function () {
      var secadence = this.cadence / 60
      return Math.round(this.const.KM * 10000 / (secadence * this.seckm)) / 100
    },
    stepkmCom: function () {
      var secadence = this.cadence / 60
      return Math.round(secadence * this.seckm)
    },
    steptenkmCom: function () {
      var secadence = this.cadence / 60
      return Math.round(secadence * this.seckm * 10)
    },
    stephalfkmCom: function () {
      var secadence = this.cadence / 60
      return Math.round(secadence * this.seckm * this.const.HALF_MARATHON / this.const.KM)
    },
    stepfullkmCom: function () {
      var secadence = this.cadence / 60
      return Math.round(secadence * this.seckm * this.const.FULL_MARATHON / this.const.KM)
    }
  },
  watch: {
    sec () {
      this.seckm = this.sec + this.min * 60
    },
    min () {
      this.seckm = this.sec + this.min * 60
    }
  },
  methods: {
    secondsToMin: function (seconds) {
      var minS = ''
      var minObj = {h: 0, m: 0, s: 0}

      minObj.h = this.secondsPart(seconds, 'hour')
      if (minObj.h > 0) {
        seconds -= minObj.h * 3600
      }
      minObj.m = this.secondsPart(seconds, 'min')
      if (minObj.m > 0) {
        seconds -= minObj.m * 60
      }
      seconds = Math.round(seconds)
      seconds += ''
      minObj.s = (seconds.length === 2) ? seconds : '0' + seconds
      if (minObj.h > 0) {
        minS += minObj.h + ':'
        minS += minObj.m + ':'
        minS += minObj.s
        return minS
      } else if (minObj.m > 0) {
        minS += minObj.m + ':'
        minS += minObj.s
      } else {
        minS += minObj.s
      }
      return minS
    },
    secondsPart: function (seconds, type) {
      if (type === 'seconds') {
        return seconds % 60
      } else if (type === 'min') {
        return Math.floor(seconds / 60)
      } else if (type === 'hour') {
        return Math.floor(seconds / 3600)
      }
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
</style>
