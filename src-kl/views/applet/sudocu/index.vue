<template>
<div class="">
  <mu-table :showCheckbox="false" ref="table" @cellClick="cellClickHandle">
    <mu-tbody>
      <mu-tr v-for="(row, key, index) in sudoData.listRow" :key="index">
        <mu-td v-for="(block, k, i) in row" :key="i" :name="block.r+'-'+block.c" :class="blockBack(block)" style="border:1px solid;">{{blockShow(block)}}</mu-td>
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
            if (r === 0 || c === 0) {
              b = -1
            } else {
              var b = Math.floor((r - 1) / 3) * 3 + Math.ceil(c / 3)
            }
            var block = {
              num: '',
              num_mb: '',
              r: r, // 行数
              c: c, // 列数
              b: b, // 宫格数
              oe: b % 2
            }
            if (!this.sudoData.listRow[r]) {
              this.sudoData.listRow[r] = []
            }
            this.sudoData.listRow[r][c] = block
            if (!this.sudoData.listCel[c]) {
              this.sudoData.listCel[c] = []
            }
            this.sudoData.listCel[c][r] = block
            if (this.sudoData.listBlocks.length === 0) {
              this.sudoData.listBlocks[0] = {}
            }
            if (!this.sudoData.listBlocks[b]) {
              this.sudoData.listBlocks[b] = [{}]
            }
            this.sudoData.listBlocks[b].push(block)
          }
          b(r, c)
        }
      }
      s(r)
    }
    console.log(this.sudoData.listRow)
    console.log(this.sudoData.listCel)
    console.log(this.sudoData.listBlocks)
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
        return block.num
      }
    },
    blockBack: function (block) {
      if (block.b < 0) {
        return
      }
      return {'mu-td-lighterAccent': block.oe, 'mu-td-deepPurple': !block.oe}
    },
    cellClickHandle: function (rowIndex, columnName, td, tr) {
      console.log(columnName)
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
.mu-td-lighterAccent {
  background: @lighterAccentColor;
}
.mu-td-deepPurple {
  background: @deepPurple400;
}
</style>
