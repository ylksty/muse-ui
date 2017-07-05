<template>
<div class="">
  <mu-table :showCheckbox="false" ref="table" @cellClick="cellClickHandle">
    <mu-tbody>
      <mu-tr v-for="(row, key, index) in sudoData.listRow" :key="index">
        <mu-td v-for="(block, k, i) in row" :key="i" :name="block.r+'-'+block.c" :class="blockStyle(block)" style="border:1px solid;">{{blockShow(block)}}</mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
  <mu-flexbox>
    <mu-flexbox-item>
      <mu-raised-button class="demo-raised-button" label="重置" backgroundColor="deepOrange500" @click="resetClick" />
    </mu-flexbox-item>
    <mu-flexbox-item>
      <mu-raised-button class="demo-raised-button" label="返回题干" :backgroundColor="lockback" @click="lockbackClick" />
    </mu-flexbox-item>
    <mu-flexbox-item>
      <mu-raised-button class="demo-raised-button" :label="lockLabel" backgroundColor="teal500" @click="lockClick" />
    </mu-flexbox-item>
  </mu-flexbox>
  <mu-flexbox>
    <mu-flexbox-item>
      <mu-raised-button class="demo-raised-button" :label="mbLabel" backgroundColor="teal500" @click="mbClick" />
    </mu-flexbox-item>
    <mu-flexbox-item>
      步数:{{sudoDataWatch}}
    </mu-flexbox-item>
    <mu-flexbox-item>
      <mu-raised-button class="demo-raised-button" label="智能填充" :backgroundColor="smartFill" @click="calculateClick" />
    </mu-flexbox-item>
  </mu-flexbox>
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
    {{topPopmsg}}
  </mu-popup>
  <mu-dialog :open="dialog.status" :title="dialog.title" @close="dialog.cancel">
    {{this.dialog.msg}}
    <mu-flat-button slot="actions" @click="dialog.cancel" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="dialog.sure" label="确定"/>
  </mu-dialog>
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
    },
    sudoDataWatch (val) {
      console.log(val)
    }
  },
  data () {
    return {
      const: {
        LOCKED_LABLE: '锁定题干',
        UN_LOCKED_LABLE: '解锁题干',
        CLOSE_MB_LABLE: '关闭提示',
        OPEN_MB_LABLE: '打开提示'
      },
      topPopup: false,
      topPopmsg: 'sss',
      dialog: {
        status: false,
        title: 'Dialog',
        msg: '这是一个简单的弹出框',
        cancel: function () {},
        sure: function () {}
      },
      sudoData: {
        listRow: [],
        listCel: [],
        listBlocks: []
      },
      sets: {
        rowset: [], // 行已选 用于提示数
        colset: [], // 列已选
        blockset: [] // 宫格已选
      },
      sudoDataWatch: 0, // 监控sudoData的变化
      mb: false, // 提示开关
      locked: false, // 锁定开关
      error: false, // 错误开关
      clickBlock: null, // 点击的宫格
      columnName: 'lala', // 宫格名称
      bottomSheet: false // 数字选择框
    }
  },
  created () {
    this.init()
  },
  computed: {
    lockback: function () {
      if (this.locked) {
        return 'deepPurple500'
      } else {
        return 'grey500'
      }
    },
    smartFill: function () {
      if (this.locked) {
        return 'deepPurple500'
      } else {
        return 'grey500'
      }
    },
    lockLabel: function () {
      if (this.locked) {
        return this.const.UN_LOCKED_LABLE
      } else {
        return this.const.LOCKED_LABLE
      }
    },
    mbLabel: function () {
      if (this.mb) {
        return this.const.CLOSE_MB_LABLE
      } else {
        return this.const.OPEN_MB_LABLE
      }
    }
  },
  methods: {
    init () { // 初始化
      this.sudoData = {
        listRow: [],
        listCel: [],
        listBlocks: []
      }
      this.locked = false
      this.error = false
      this.clickBlock = null
      this.mb = false
      for (let [index, elem] of [1, 2, 3, 4, 5, 6, 7, 8, 9].entries()) {
        index
        this.sets.rowset[elem] = []
        this.sets.colset[elem] = []
        this.sets.blockset[elem] = []
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
                mb: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                locked: false
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
    lockbackClick () {
      if (this.locked) {
        for (var r in this.sudoData.listRow) {
          for (var c in this.sudoData.listRow[r]) {
            if (this.sudoData.listRow[r][c].num > 0 && !this.sudoData.listRow[r][c].locked) {
              this.sudoData.listRow[r][c].num = ''
            }
          }
        }
        this.mbcal()
      } else {
        this.topPopupFun('请先锁定题干')
      }
    },
    dialogInit (opt) {
      Object.assign(this.dialog, {
        closef: function () {
          this.dialog.status = false
        },
        sure: function () {
          this.dialog.status = false
        }
      }, opt)
    },
    topPopupFun (msg) { // 顶部弹出提示
      this.topPopmsg = msg
      this.topPopup = true
    },
    resetClick () { // 重置
      this.dialogInit({
        status: true,
        title: '确认',
        msg: '确认重置?',
        sure: () => {
          this.dialog.status = false
          this.init()
        },
        cancel: () => {
          this.dialog.status = false
        }
      })
    },
    calculateClick () { // 计算按钮
      if (this.locked) {
        this.topPopupFun('还不能用')
        return
      } else {
        this.topPopupFun('请先锁定题干')
        return
      }
    },
    lockClick () { // 题干锁定
      this.locked = !this.locked
      if (this.locked) {
        for (var r in this.sudoData.listRow) {
          for (var c in this.sudoData.listRow[r]) {
            if (this.sudoData.listRow[r][c].num > 0) {
              this.sudoData.listRow[r][c].locked = true
            }
          }
        }
      } else {
        for (var r1 in this.sudoData.listRow) {
          for (var c1 in this.sudoData.listRow[r1]) {
            if (this.sudoData.listRow[r1][c1].num > 0) {
              this.sudoData.listRow[r1][c1].locked = false
            }
          }
        }
      }
    },
    mbClick () { // 提示开关
      this.mb = !this.mb
    },
    blockShow: function (block) { // 宫格内容
      if (block.r === 0 && block.c === 0) {
        return ''
      } else if (block.r === 0) {
        return block.c
      } else if (block.c === 0) {
        return block.r
      } else if (this.mb && !block.num) {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (let [index, elem] of [1, 2, 3, 4, 5, 6, 7, 8, 9].entries()) {
          index
          if (this.sets.rowset[block.r].includes(elem) || this.sets.colset[block.c].includes(elem) || this.sets.blockset[block.b].includes(elem)) {
            a.findIndex(function (value, index, arr) {
              if (value === elem) {
                a.splice(index, 1)
              }
            })
          }
        }
        var s = a.join('')
        if (s.length > 5) {
          s = s.slice(0, 5) + ' ' + s.slice(5)
        }
        return s
      } else {
        return block.num
      }
    },
    blockStyle: function (block) { // 宫格背景
      if (block.b < 0) {
        return
      }
      var mb = this.mb && this.mb && !block.num
      var style = {'mu-td-lighterAccent': block.oe, 'mu-td-deepPurple': !block.oe, 'mu-td-error-color': block.error, 'mu-td-locked': block.locked, 'mu-td-block': mb}
      return style
    },
    cellClickHandle: function (rowIndex, columnName, td, tr) { // 宫格点击
      if (columnName.indexOf('0') >= 0) { // head点击无效
        return
      }
      var a = columnName.split('-')
      if (this.locked) { // 如果锁定激活
        if (this.sudoData.listRow[a[0]][a[1]].locked) {
          this.topPopupFun('不能修改题干')
          return
        }
      }
      var lastClick = this.clickBlock && (this.clickBlock.r + '-' + this.clickBlock.c === columnName)
      if (this.error && !lastClick) { // 如果有错误,并点击非最后点击宫格
        this.topPopupFun('请先处理冲突(修改最近的数)')
        return
      }
      this.clickBlock = this.sudoData.listRow[a[0]][a[1]] // 注册当前点击宫格
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
      if (value === 88) { // 取消选择
        this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].num = ''
      } else {
        this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].num = value
      }
      this.checkAndError(value)
      this.sudoDataWatch += 1 // 改动记录
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
        } else { // 如果选择的值在行内不同
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
      for (var n in this.sudoData.listBlocks[this.clickBlock.b]) {
        if (this.sudoData.listBlocks[this.clickBlock.b][n] === this.clickBlock) {

        } else if (this.sudoData.listBlocks[this.clickBlock.b][n].num === value) {
          this.sudoData.listBlocks[this.clickBlock.b][n].error = true
          this.sudoData.listRow[this.clickBlock.r][this.clickBlock.c].error = true
          this.error = true
        } else {
          if (n !== '0') {
            this.sudoData.listBlocks[this.clickBlock.b][n].error = false
          }
        }
      }
      if (!this.error) {
        this.mbcal()
      }
//      console.log(this.sets)
//      console.log(this.sudoData)
    },
    mbcal () {
      for (var r in this.sudoData.listRow) {
        this.sets.rowset[r] = []
        this.sets.colset[r] = []
        this.sets.blockset[r] = []
        for (var c in this.sudoData.listRow[r]) {
          if (this.sudoData.listRow[r][c].num > 0) {
            this.sets.rowset[this.sudoData.listRow[r][c].r].push(this.sudoData.listRow[r][c].num)
            this.sets.rowset[this.sudoData.listRow[r][c].c].push(this.sudoData.listRow[r][c].num)
            this.sets.rowset[this.sudoData.listRow[r][c].b].push(this.sudoData.listRow[r][c].num)
          }
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
  background: #7e57c2;
}
.mu-td-error-color {
  background: #f44336;
}
.mu-td-locked {
  text-decoration: underline;
}
.mu-td-block{
  padding: 0px;
  text-align: left;
  vertical-align: top;
  white-space: normal;
  font-weight: 300;
  font-size: 12px;
}
</style>
