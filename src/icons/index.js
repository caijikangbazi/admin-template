// 1.导入所有的svg图标
// 2.完成svgIcon的注册
import SvgIcon from '@/components/SvgIcon'

const svgRequire = require.context('./svg', false, /\.svg$/)

// 此时返回一个 require 函数,可以接受一个 request 的参数,用于 require 的导入
// 该函数提供了三个属性,可以通过 svgRequire.keys() 获得所有的 svg 图标
// 遍历图标,吧图标作为 request 参数参入到 svgRequire 导入函数中
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
