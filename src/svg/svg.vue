<script>
import {getColor} from '../utils'
export default {
  name: 'mu-svg',
  props: {
    value: {
      type: String
    },
    size: {
      type: Number
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconStyle () {
      return {
        'font-size': this.size + 'px',
        'width': this.size + 'px',
        'height': this.size + 'px',
        'color': getColor(this.color)
      }
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    const {value, iconStyle, handleClick} = this
    if (!value || value.indexOf(':') !== 0) return null
    return h('svg', {
      attrs: { 'aria-hidden': true },
      class: ['mu-svg'],
      style: iconStyle,
      on: {
        click: handleClick
      }
    }, [h('use', {
      attrs: { 'xlink:href': '#' + value.substring(1) }
    }, '')])
  }
}
</script>

<style lang="less">
@import "../styles/import.less";
.mu-svg {
    font-size: @iconSize;
    cursor: inherit;
}
</style>
