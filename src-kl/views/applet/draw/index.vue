<template>
  <div class="content-wrapper">
    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="100" tablet="100" desktop="60" style="text-align: center;">
        <mu-paper class="big-paper" circle :zDepth="5" >
          <h1 class="mu-paper-h1-big">{{min}}</h1>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="10"></mu-col>
      <mu-col width="50" tablet="50" desktop="40" style="text-align: center;">
        <mu-paper class="small-paper" circle :zDepth="5" >
          <h1 class="mu-paper-h1">{{min}}</h1>
        </mu-paper>
      </mu-col>
      <mu-col width="50" tablet="50" desktop="40" style="text-align: center;">
        <mu-paper class="small-paper" circle :zDepth="5" >
          <h1 class="mu-paper-h1">{{max}}</h1>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="10"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="100" tablet="100" desktop="60">
        <p>最小值<mu-slider v-model="min" :step="1" :min="1" :max="max"/></p>
        <p>最大值<mu-slider v-model="max" :step="1" :min="min" :max="200"/></p>
        <p>频率<mu-slider v-model="frequency" :step="10" :min="20" :max="500"/></p>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
      <mu-col width="60" tablet="60" desktop="30"></mu-col>
      <mu-col width="20" tablet="20" desktop="15">开关</mu-col>
      <mu-col width="20" tablet="20" desktop="15">
        <mu-switch class="demo-switch" />
      </mu-col>
      <mu-col width="0" tablet="0" desktop="20"></mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      min: 1,
      max: 100,
      frequency: 20,
      const: {
        KM: 1000,
        TEN_KM: 10000,
        HALF_MARATHON: 21092,
        FULL_MARATHON: 42193
      }
    }
  },
  created () {

  },
  computed: {

  },
  watch: {

  },
  methods: {

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
    height: 100px;
    width: 100px;
    margin: 20px;
    text-align: center;
  }
  .big-paper {
    display: inline-block;
    height: 200px;
    width: 200px;
    margin: 20px;
    text-align: center;
  }
  .mu-paper-h1 {
    font-size: 3em;
    margin: 0.52em 0;
  }
  .mu-paper-h1-big {
    font-size: 6em;
    margin: 0.52em 0;
  }
  .demo-switch {
    margin-bottom: 16px;
  }
</style>
