var fs = require("fs")
function yg (param) {
  fs.writeFile('/Users/yanglk/usr/www/cgtz/dev-hi/yg.html', JSON.stringify(param, 4),  function(err) {
    console.log(err)
  })
}

module.exports = yg
