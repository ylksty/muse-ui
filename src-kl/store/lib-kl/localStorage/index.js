/**
 * Created by yanglk on 17/7/6.
 */
let LocalEvent = function (item) {
  var b = !!localStorage
  let localStorage = b ? localStorage : window.localStorage
  /**
   * 例子
   * localUser.get() 获取localUser所有保存对象
   * localUser.get('user') 获取localUser下user对象
   */
  this.get = function () {
    let args = [].slice.call(arguments)
    let name = args.length > 0 ? args[0] : null
    if (name) {
      return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item))[name] : null
    } else {
      return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : null
    }
  }
  this.set = function (name, obj) {
    let localItem = localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : {}
    localItem[name] = obj
    localStorage.setItem(item, JSON.stringify(localItem))
  }
  this.lpush = function (name, obj) {
    push(name, obj, true)
  }
  this.rpush = function (name, obj) {
    push(name, obj)
  }
  /**
   * 例子
   * localUser.clear() 清除localUser下所有保存对象
   * localUser.clear('user') 清除localUser下user对象
   */
  this.clear = function () {
    let args = [].slice.call(arguments)
    let name = args.length > 0 ? args[0] : null
    if (name) {
      let localItem = JSON.parse(localStorage.getItem(item))
      localItem[name] = null
      localStorage.setItem(item, JSON.stringify(localItem))
    } else {
      localStorage.removeItem(item)
    }
  }
  function push (name, obj, left) {
    let localItem = localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : {}
    if (!localItem[name]) {
      localItem[name] = []
    }
    if (left) {
      localItem[name].unshift(obj)
    } else {
      localItem[name].push(obj)
    }
    localStorage.setItem(item, JSON.stringify(localItem))
  }
}
export const local = LocalEvent
export const kangleUser = new LocalEvent('KANGLE_USER')
