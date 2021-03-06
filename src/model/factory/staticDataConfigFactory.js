/**
* 静态数据工厂
* Author: dong xing
* Date: 2019/11/20
* Time: 5:13 下午
* Email: dong.xing@outlook.com
*/
import LinesStaticDataConfig from '../config/dataConfig/staticDataConfig/LinesStaticDataConfig'
import BarStaticDataConfig from '../config/dataConfig/staticDataConfig/BarStaticDataConfig'
import PieStaticDataConfig from '../config/dataConfig/staticDataConfig/PieStaticDataConfig'

export default class StaticDataConfigFactory {
  static create (type, staticDataConfig = {}) {
    switch (type) {
      case 'Lines':
        return new LinesStaticDataConfig(staticDataConfig)
      case 'Bar':
        return new BarStaticDataConfig(staticDataConfig)
      case 'Pie':
        return new PieStaticDataConfig(staticDataConfig)
      default:
        return null
    }
  }
}
