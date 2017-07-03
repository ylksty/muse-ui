<template>
<div class="">
  <mu-table :showCheckbox="false" ref="table" @cellClick="cellClickHandle">
    <mu-tbody>
      <mu-tr v-for="(row, key, index) in sudoData.listRow" :key="index">
        <mu-td v-for="(block, k, i) in row" :key="i" :name="block.r+'-'+block.c" :class="blockStyle(block)" style="border:1px solid;">{{blockShow(block)}}</mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
  <mu-raised-button class="demo-raised-button" label="重置" backgroundColor="#8bc34a" @click="resetClick" />
  <mu-raised-button class="demo-raised-button" label="计算" backgroundColor="#009688" @click="calculateClick" />
  <mu-bottom-sheet :open="bottomSheet" :overlayOpacity="0.2" @close="closeBottomSheet">
    <mu-flexbox>
      <mu-flexbox-item>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="1" primary @click="itemCheckButton(1)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="2" primary @click="itemCheckButton(2)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="3" primary @click="itemCheckButton(3)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
      <mu-flexbox-item>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="4" primary @click="itemCheckButton(4)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="5" primary @click="itemCheckButton(5)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="6" primary @click="itemCheckButton(6)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
      <mu-flexbox-item>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="7" primary @click="itemCheckButton(7)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="8" primary @click="itemCheckButton(8)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="9" primary @click="itemCheckButton(9)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
      <mu-flexbox-item>
      </mu-flexbox-item>
      <mu-flexbox-item>
      </mu-flexbox-item>
      <mu-flexbox-item>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-flat-button label="擦除" primary @click="itemCheckButton(88)"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
      </mu-flexbox-item>
    </mu-flexbox>
  </mu-bottom-sheet>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    请先处理冲突(修改最近的数)
  </mu-popup>
</div>
</template>

<script>

export default {
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  },
  data () {
    return {
      topPopup: false,
      error: false,
      sudoData: {
        listRow: [],
        listCel: [],
        listBlocks: []
      },
      clickBlock: null,
      columnName: 'lala',
      bottomSheet: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () { // 初始化
      this.sudoData = {
        listRow: [],
        listCel: [],
        listBlocks: []
      }
      for (var r = 0; r < 10; r++) {
        var s = (r) => {
          for (var c = 0; c < 10; c++) {
            var b = (r, c) => {
              var b
              var bn
              if (r === 0 || c === 0) {
                b = -1
                bn = -1
              } else {
                b = Math.floor((r - 1) / 3) * 3 + Math.ceil(c / 3)
                bn = ((r - 1) % 3) * 3 + ((c % 3) ? (c % 3) : 3)
              }
              var block = {
                error: false,
                num: '',
                num_mb: '',
                r: r, // 行数
                c: c, // 列数
                b: b, // 宫格数
                bn: bn, // 宫格内个数
                oe: b % 2,
                mb: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
    },
    resetClick () { // 重置
      this.init()
    },
    calculateClick () { // 计算按钮
      console.log(234)
    },
    blockShow: function (block) { // 宫格内容
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
    blockStyle: function (block) { // 宫格背景
      if (block.b < 0) {
        return
      }
      var style = {'mu-td-lighterAccent': block.oe, 'mu-td-deepPurple': !block.oe, 'mu-td-font-error-color': block.error}
      return style
    },
    cellClickHandle: function (rowIndex, columnName, td, tr) { // 宫格点击
      var lastClick = this.clickBlock && (this.clickBlock.r + '-' + this.clickBlock.c === columnName)
      if (this.error && !lastClick) {
        this.topPopup = true
        return
      }
      var a = columnName.split('-')
      this.clickBlock = this.sudoData.listRow[a[0]][a[1]]
      this.clickb = this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].b
      this.openBottomSheet(columnName)
    },
    closeBottomSheet () { // 关闭数字选择
      this.bottomSheet = false
    },
    openBottomSheet (columnName) { // 打开数字选择
      this.columnName = columnName
      this.bottomSheet = true
    },
    itemCheckButton (value) { // 选择1~9按钮
      this.closeBottomSheet()
      this.itemCheck(value)
    },
    itemCheck (value) { // 选择1~9
      if (value === 88) {
        this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].num = ''
      } else {
        this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].num = value
      }
      this.checkAndError(value)
    },
    checkAndError (value) { // 检测错误,并提示
      this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].error = false
      this.error = false
      for (var c in this.sudoData.listRow[this.clickBlock.r]) { // 遍历所在行的每个宫格
        if (this.sudoData.listRow[this.clickBlock.r][c] === this.clickBlock) { // 如果是当前宫格, 不判断

        } else if (this.sudoData.listRow[this.clickBlock.r][c].num === value) { // 如果选的值在行内已有
          this.sudoData.listRow[this.clickBlock.r][c].error = true
          this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].error = true
          this.error = true
        } else { // 如果选择的值在行内没有
//          if (this.sudoData.listRow.mb.includes(value)) {
//
//          }
          this.sudoData.listRow[this.clickBlock.r][c].error = false
        }
      }
      for (var r in this.sudoData.listCel[this.clickBlock.c]) {
        if (this.sudoData.listCel[this.clickBlock.c][r] === this.clickBlock) {

        } else if (this.sudoData.listCel[this.clickBlock.c][r].num === value) {
          this.sudoData.listCel[this.clickBlock.c][r].error = true
          this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].error = true
          this.error = true
        } else {
          this.sudoData.listCel[this.clickBlock.c][r].error = false
        }
      }
      for (var n in this.sudoData.listBlocks[this.clickb]) {
        if (this.sudoData.listBlocks[this.clickb][n] === this.clickBlock) {

        } else if (this.sudoData.listBlocks[this.clickb][n].num === value) {
          this.sudoData.listBlocks[this.clickb][n].error = true
          this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].error = true
          this.error = true
        } else {
          this.sudoData.listBlocks[this.clickb][n].error = false
        }
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
.mu-td-lighterAccent {
  background: @lighterAccentColor;
}
.mu-td-deepPurple {
  background: @deepPurple400;
}
.mu-td-font-error-color {
  background: @red500;
}
</style>
