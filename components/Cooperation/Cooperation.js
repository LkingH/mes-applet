// components/Cooperation/Cooperation.js

const { getPicByType } = require('../../http/api.js');

Component({
  options: {
    styleIsolation: 'shared'
  },
  
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    prefix: '',
    logoList: [],

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  attached() {
    // 调用接口获取合作客户logo列表
    getPicByType('COMPANY_LOGO').then(res => {
      this.setData({
        prefix: res.data.prefix,
        logoList: res.data.list
      })
    })
  }
})
