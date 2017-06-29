<template>
<div class="">
  <mu-table :showCheckbox="false" ref="table">
    <mu-tbody>
      <mu-tr v-for="(row, key, index) in sudoData.listRow" :key="index">
        <mu-td v-for="(block, k, i) in row" :key="i" :name="k+'-'+i" :class="{'mu-td-null': !block.num && block.r && block.c, 'mu-td-blod': !block.r || !block.c}">{{blockShow(block)}}</mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
</div>
</template>

<script>

export default {
  data () {
    return {
      abc: true,
      sudoData: {
        listRow: [],
        listCel: [],
        listBlocks: []
      }
    }
  },
  created () {
    for (var r = 0; r < 10; r++) {
      var s = (r) => {
        for (var c = 0; c < 10; c++) {
          var b = (r, c) => {
            var block = {
              num: '',
              num_mb: '',
              r: r,
              c: c
            }
            if (!this.sudoData.listRow[r]) {
              this.sudoData.listRow[r] = []
            }
            this.sudoData.listRow[r][c] = block
//            this.sudoData.listCel[j][i] = block
          }
          b(r, c)
        }
      }
      s(r)
    }
    console.log(this.sudoData.listRow)
  },
  methods: {
    bwithrc: function (r, c) {

    },
    blockShow: function (block) {
      if (block.r === 0 && block.c === 0) {
        return ''
      } else if (block.r === 0) {
        return block.c
      } else if (block.c === 0) {
        return block.r
      } else {
        return block.r + '-' + block.c
      }
    }
  }
}
</script>

<style lang="less">
@import "../../../../src/styles/import.less";
.mu-td {
  padding-left: 4%;
}
.mu-td-blod {
  font-weight:bold;
}
.mu-td-null {
  background: @lighterAccentColor;
}
</style>
