/**
* 配置
* Author: dong xing
* Date: 2020/3/26
* Time: 13:58
* Email: dong.xing@outlook.com
*/

import Factory from '../factory/factory'
import CommonConfig from './commonConfig'
import DataConfig from './dataConfig'

// 图表专有属性工厂
const chartProprietaryConfigFactory = Factory.createChartProprietaryConfigFactory()

// 元素专有属性工厂
const elementProprietaryConfigFactory = Factory.createElementProprietaryConfigFactory()

export default class Config {
  constructor ({
    category, type, commonConfig, proprietaryConfig, dataConfig
  }) {
    this.category = category
    this.type = type
    this.proprietaryConfigFactory = category === 'ELEMENT' ? elementProprietaryConfigFactory : chartProprietaryConfigFactory
    this.commonConfig = new CommonConfig(commonConfig || {})
    this.proprietaryConfig = this.proprietaryConfigFactory.create({
      type,
      proprietaryConfig
    })
    this.dataConfig = new DataConfig({
      widgetType: type,
      ...dataConfig
    })
  }
}
