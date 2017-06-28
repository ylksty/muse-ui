import description from './README_EN.md'

export default {
  description,
  simpleExample: 'Simple Example',
  simpleExampleDesc: 'always used to combined with `menu` and `listItem` components, to define different text and color',
  iconAndButton: 'integrate with icon and button',
  iconAndButtonDesc: 'combined with `icon` and `iconButton` components, always we use the circle badge in this case',
  custom: 'define different content',
  props: {
    content: 'body text',
    color: 'color',
    primary: 'whether the color is the primary color or not',
    secondary: 'whether the color is accent colour or not',
    circle: 'whether the component is circle or not',
    badgeClass: 'the style of badge, the binding way is same with `class`'
  },
  slots: {
    content: 'used to distribute content, this slot will override the content attribute',
    default: 'used to distribute the component or element which need to add badge'
  }
}
